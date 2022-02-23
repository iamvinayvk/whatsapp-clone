import { Avatar } from "@material-ui/core";
import React from "react";
import "./SidebarChat.css";
const SidebarChat = () => {
  return (
    <div className="sidebarChat">
      <Avatar />
      <div className="sidebarChat__info">
        <h2>Room name</h2>
        <p>This is The Last Message</p>
      </div>
    </div>
  );
};

export default SidebarChat;
