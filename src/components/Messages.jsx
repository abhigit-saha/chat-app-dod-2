import React, { useState, useContext, useEffect } from "react";
import { ChatContext } from "../context/ChatContext";
import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../App";
import Message from "./Message";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);

  //this is used for realtime access of the data.
  //Whenever the dependency data.chatId changes, the unSub function is called,
  //and its messages inside the changed user is set as messages.
  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().chatMessage);
    });

    return () => {
      unSub();
    };
  }, [data.chatId]);

  return (
    <div className="messages">
      {messages.map((m) => (
        <Message key={m.id} message={m} className="message" />
      ))}
    </div>
  );
};

export default Messages;
