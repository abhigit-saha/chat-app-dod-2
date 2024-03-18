import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../App";
const Chats = () => {
  const [chats, setChats] = useState({});

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  //this is used to display all the chats that the currentUser has been involved in.

  useEffect(() => {
    const getChats = () => {
      const chatRef = doc(db, "userChats", currentUser.uid);
      const unsub = onSnapshot(chatRef, (snapshot) => {
        if (snapshot.exists()) {
          setChats(snapshot.data());
        } else {
          setChats({}); // Set chats to an empty object if document doesn't exist
        }
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };
  return (
    <div className="chats">
      {console.log(Object.entries(chats))}
      {Object.entries(chats)?.map(([userDate, userInfo]) => (
        <div
          className="userChat"
          key={userInfo.userId}
          onClick={() => handleSelect(userInfo)}
        >
          <img src={userInfo.photoURL} alt="" />
          <div className="userChatInfo">
            <span>{userInfo.displayName}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Chats;
