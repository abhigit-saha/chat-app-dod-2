import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { Timestamp } from "firebase/firestore";

import { db } from "../App";
import { v4 as uuid } from "uuid";

const Input = () => {
  const [text, setText] = useState("");
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  //on sending the message, the chatMessage is updated
  //a new element is added using arrayUnion function to the chatMessage array
  //inside the document data.chatId of the "chats" document
  const handleSend = async () => {
    await updateDoc(doc(db, "chats", data.chatId), {
      chatMessage: arrayUnion({
        id: uuid(),
        text,
        senderId: currentUser.uid,
        date: Timestamp.now(),
      }),
    });
    setText("");
    setImg(null);
    console.log("fine");
  };

  return (
    <div className="input">
      <input
        type="text"
        placeholder="Type something"
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
};

export default Input;
