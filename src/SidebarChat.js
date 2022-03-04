import { Avatar } from "@material-ui/core";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import db from "./firebase";
import "./SidebarChat.css";
const SidebarChat = ({ id, name, addNewChat }) => {
  const [seed, setSeed] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, [setSeed]);
  const createChat = () => {
    const roomName = prompt("Please enter name for chat");
    if (roomName) {
      //do some database stuff
      const cl = collection(db, "rooms");
      addDoc(cl, {
        name: roomName,
      });
    }
  };
  // useEffect(() => {
  //   if (id) {
  //     const queryMessages = query(
  //       collection(db, "rooms", id, "messages"),
  //       orderBy("timestamp", "dsc")
  //     );
  //     onSnapshot(queryMessages, (snapshot) =>
  //       setMessages(snapshot.docs.map((doc) => doc.data()))
  //     );
  //   }
  // }, [id]);
  return !addNewChat ? (
    <Link to={`rooms/${id}`}>
      <div className="sidebarChat">
        <Avatar
          src={`https://avatars.dicebear.com/api/avataaars/${seed}.svg`}
        />
        <div className="sidebarChat__info">
          <h2>{name}</h2>
          {console.log(messages)}
          <p>{messages[0]?.message}</p>
        </div>
      </div>
    </Link>
  ) : (
    <div onClick={createChat} className="sidebarChat">
      <h2>Add New Chat</h2>
    </div>
  );
};

export default SidebarChat;
