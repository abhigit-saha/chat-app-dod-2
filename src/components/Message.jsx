import { collectionGroup } from "firebase/firestore";
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  //we return chats based on condition: whether the sender of the user is the currentUser
  //or the other user
  return (
    <div
      className={`message ${
        message.senderId === currentUser.uid ? "owner" : "other-user"
      }`}
    >
      <div className="messageImg">
        <img
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt="img"
        />

        {console.log(message.senderId)}
        {console.log(currentUser.uid)}

        {console.log(data.user.uid)}
      </div>
      <div className="messageText">{message.text}</div>
    </div>
  );
};

export default Message;
