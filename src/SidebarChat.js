import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import { Modal, Button, Space } from "antd";

import "./SidebarChat.css";
import db from "./firebase";
import { Link } from "react-router-dom";
import { useStateValue } from "./StateProvider";

function info() {
  Modal.info({
    title: "Notification from CHAT$MANIA",
    content: <div>Oh-ho! This group is full!</div>,
    onOk() {},
  });
}

function SidebarChat({ id, name, addNewChat, email }) {
  const [{ user }, dispatch] = useStateValue();
  const [seed, setSeed] = useState("");
  const [messages, setMessages] = useState("");
  const [newPersonEnterOrNot, setNewPersonEnterOrNot] = useState(true);
  const [lengthOfTheGroup, setLengthOfTheGroup] = useState(0);
  const [modal, contextHolder] = Modal.useModal();

  useEffect(() => {
    if (id) {
      // let dd = [];
      // db.collection("rooms").doc(id).onSnapshot(snapshot => {
      //   dd.push(snapshot.docs.map((doc) => doc.data()))
      // })
      db.collection("rooms")
        .doc(id)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setMessages(snapshot.docs.map((doc) => doc.data()));
          let data = snapshot.docs.map((doc) => doc.data());
          let findTheNamsLength = data.reduce((acc, curr) => {
            if (!acc.includes(curr.name)) {
              acc.push(curr.name);
            }
            return acc;
          }, []);
          setLengthOfTheGroup(findTheNamsLength.length);
          debugger;
          // if (findTheNamsLength.length >= 2 && !findTheNamsLength.includes(user.displayName))
          if (email && !email.includes(user.email)) {
            setNewPersonEnterOrNot(false);
          } else {
            setNewPersonEnterOrNot(true);
          }
        });
    }
  }, [id]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  const createChat = () => {
    const roomName = prompt("Create Name For your Chat");
    const email = prompt("Enter the participant Email-ID");

    if (roomName && email) {
      db.collection("rooms").add({
        name: roomName,
        email: [email, user.email],
      });
    }
  };

  return !addNewChat ? (
    // newPersonEnterOrNot ? (
    //   <Link to={`/rooms/${id}`} key={id}>
    //     <div className="sidebarChat">
    //       <Avatar src={`https://avatars.dicebear.com/api/bottts/${seed}.svg`} />
    //       <div className="sidebarChat_info">
    //         <h2>{name}</h2>
    //         <p>Last message : {messages[0]?.message}</p>
    //         <p>{lengthOfTheGroup + " People are here"}</p>
    //       </div>
    //     </div>
    //   </Link>
    // ) : (
    //   <div key={id}>
    //     <div
    //       onClick={() => {
    //         info();
    //       }}
    //       className="sidebarChat"
    //     >
    //       <Avatar src={`https://avatars.dicebear.com/api/bottts/${seed}.svg`} />
    //       <div className="sidebarChat_info">
    //         <h2>{name}</h2>
    //         <p>Last message : {messages[0]?.message}</p>
    //         <p>{lengthOfTheGroup + " People are here"}</p>
    //       </div>
    //     </div>
    //   </div>
    // )
    newPersonEnterOrNot && newPersonEnterOrNot === true ? (
      <Link to={`/rooms/${id}`} key={id}>
        <div className="sidebarChat">
          <Avatar src={`https://avatars.dicebear.com/api/bottts/${seed}.svg`} />
          <div className="sidebarChat_info">
            <h2>{name}</h2>
            <p>Last message : {messages[0]?.message}</p>
            <p>{lengthOfTheGroup + " People are here"}</p>
          </div>
        </div>
      </Link>
    ) : null
  ) : (
    <div onClick={createChat} className="sidebarChat">
      <h3 className="add-new-chat-title"> CREATE NEW CHAT </h3>
    </div>
  );
}

export default SidebarChat;
