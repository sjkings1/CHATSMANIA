import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import DonutSmallTwoToneIcon from "@mui/icons-material/DonutSmallTwoTone";
import ChatRoundedIcon from "@mui/icons-material/ChatRounded";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

import "./Sidebar.css";
import db from "./firebase";
import SidebarChat from "./SidebarChat";
import { useStateValue } from "./StateProvider";
import { Popover, Button } from "antd";
import LogoutIcon from "@mui/icons-material/Logout";

function Sidebar(props) {
  const [rooms, setRooms] = useState([]);
  const [{ user }, dispatch] = useStateValue();
  const logout = () => {
    localStorage.removeItem("userDetails");
    window.location.href = window.location.href.slice(
      0,
      window.location.href.indexOf("rooms")
    );
  };

  useEffect(() => {
    const unsubscribe = db.collection("rooms").onSnapshot((snapshot) =>
      setRooms(
        snapshot.docs.map((doc) =>
          doc.data().email.includes(user.email)
            ? {
                id: doc.id,
                data: doc.data(),
              }
            : null
        )
      )
    );

    return () => {
      unsubscribe();
    };
  }, []);

  const content = (
    <div
      className="antPopLogout"
      onClick={() => {
        logout();
      }}
    >
      <LogoutIcon />
      <h3>Logout</h3>
    </div>
  );

  return (
    <div className="sidebar">
      <div className="sidebar_header">
        <Avatar src={user?.photoURL} />
        <div className="sidebar_userName">
          <h1>{user.displayName}</h1>
        </div>
        <div className="sidebar_headerRight">
          <IconButton>
            <DonutSmallTwoToneIcon />
          </IconButton>
          <IconButton>
            <ChatRoundedIcon />
          </IconButton>
          <IconButton>
            <Popover content={content} title="OPTIONS" trigger="click">
              <MoreVertIcon />
            </Popover>
          </IconButton>
        </div>
      </div>
      <div className="sidebar_search">
        <div className="sidebar_searchContainer">
          <SearchOutlinedIcon />
          <input type="text" placeholder="Search or start new chat" />
        </div>
      </div>
      <div className="sidebar_chats">
        <SidebarChat addNewChat />
        {rooms.map((room) => (
          room ?<SidebarChat key={room.id} id={room.id} name={room.data.name} email={room.data.email} /> : null
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
