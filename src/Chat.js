import { Avatar, IconButton } from "@material-ui/core";
import {
  AttachFile,
  InsertEmoticon,
  Mic,
  MoreVert,
  SearchOutlined,
} from "@material-ui/icons";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import "./Chat.css";
import db from "./firebase";
import { useStateValue } from "./StateProvider";
// import axios from "./axios";

const Chat = () => {
  const [input, setInput] = useState("");
  const [seed, setSeed] = useState("");
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");
  const [messages, setMesssages] = useState([]);
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    if (roomId) {
      const roomRef = doc(db, "rooms", roomId);
      getDoc(roomRef)
        .then((roomSnap) => setRoomName(roomSnap.data().name))
        .catch((err) => {
          console.log(err.message);
        });
    }
  }, [roomId]);
  useEffect(() => {
    if (roomId) {
      const queryMessages = query(
        collection(db, "rooms", roomId, "messages"),
        orderBy("timestamp", "asc")
      );
      onSnapshot(queryMessages, (snapshot) =>
        setMesssages(snapshot.docs.map((doc) => doc.data()))
      );
    }
  }, [roomId]);
  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);
  const sendMessage = (e) => {
    e.preventDefault();
    const cl = collection(db, "rooms", roomId, "messages");
    addDoc(cl, {
      name: user.displayName,
      message: input,
      email: user.email,
      timestamp: serverTimestamp(),
    });
    setInput("");
  };

  return roomId ? (
    <div className="chat">
      <div className="chat__header">
        <Avatar
          src={`https://avatars.dicebear.com/api/avataaars/${seed}.svg`}
        />
        <div className="chat__headerInfo">
          <h3>{roomName}</h3>
          <p>
            Last Seen{" "}
            {new Date(
              messages[messages.length - 1]?.timestamp?.toDate()
            ).toUTCString()}
          </p>
        </div>
        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>

      <div className="chat__body">
        {messages.map((message) => (
          <p
            className={`chat__message ${
              message.email === user.email && "chat__reciever"
            }`}
          >
            <span className="chat__name">{message.name}</span>
            {message.message}
            <span className="chat__timestamp">
              {" "}
              {new Date(message.timestamp?.toDate()).toUTCString()}
            </span>
          </p>
        ))}
      </div>
      <div className="chat__footer">
        <InsertEmoticon />
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a Message"
            type="text"
          />
          <button onClick={sendMessage} type="submit">
            Send a Message
          </button>
        </form>
        <Mic />
      </div>
    </div>
  ) : (
    <></>
  );
};

export default Chat;
