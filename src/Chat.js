import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import InsertEmoticonTwoToneIcon from "@mui/icons-material/InsertEmoticonTwoTone";
import MicIcon from "@mui/icons-material/Mic";

import "./Chat.css";
import { useParams } from "react-router-dom";
import db from "./firebase";
import firebase from "firebase";
import { useStateValue } from "./StateProvider";
import moment from 'moment';

function Chat() {
  const [input, setInput] = useState("");
  const [seed, setSeed] = useState("");
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  const [{ user }, dispatch] = useStateValue();
debugger
useEffect(()=>{
  if(roomId){
      db.collection('rooms').doc(roomId).onSnapshot(snapshot => {
          setRoomName(snapshot.data().name);
      });
      let dateOnceFinder = {};
      db.collection('rooms').doc(roomId).collection("messages").orderBy("timestamp","asc").onSnapshot(snapshot => {
          setMessages(snapshot.docs.map((doc, index) => {
              debugger
              if(index == snapshot.docs.length-1){
                  setTimeout(() => {
                      dateOnceFinder = {};
                  }, 400);
              }
              if(!dateOnceFinder[moment(new Date(doc.data().timestamp).toLocaleDateString()).format("LL")]){
                dateOnceFinder[moment(new Date(doc.data().timestamp).toLocaleDateString()).format("LL")] = moment(new Date(doc.data().timestamp)).format("DD/MM/YYYY") == moment().subtract(1, "days").format("DD/MM/YYYY") ? "Yesterday"  : new Date(doc.data().timestamp).toLocaleDateString() == new Date().toLocaleDateString() ? "Today": moment(new Date(doc.data().timestamp).toLocaleDateString()).format("LL");
                  return {...doc.data(), dateOnce : dateOnceFinder[moment(new Date(doc.data().timestamp).toLocaleDateString()).format("LL")]}
              }else{
                  return doc.data()
              }
              
          }))
      });

  }
},[roomId])

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, [roomId]);

  const sendMessage = (e) => {
    e.preventDefault();
    db.collection("rooms").doc(roomId).collection("messages").add({
      message: input,
      name: user.displayName,
      // timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      timestamp : new Date().toUTCString()
    });
    setInput("");
  };

  return (
    <div className="chat">
      <div className="chat_header">
        <Avatar src={`https://avatars.dicebear.com/api/bottts/${seed}.svg`} />
        <div className="chat_headerInfo">
          <h3 className="chat-room-name">{roomName}</h3>
          <p className="chat-room-last-seen">
            LAST SEEN {" "}
            {/* ({" "}{new Date(messages[messages.length - 1]?.timestamp?.toDate()).toLocaleString()}{" "}) */}
            ( {moment(new Date(messages[messages.length - 1]?.timestamp)).fromNow()} )
          </p>
        </div>
        <div className="chat_headerRight">
          <IconButton>
            <SearchOutlinedIcon />
          </IconButton>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="chat_body">
        {messages.map((message) => (

          <>
          <div className='tagHolder'>
            {message.dateOnce && <p className='tagsForChat'>{message.dateOnce}</p>}
          </div>
          <p key={message.id} className={`chat_message ${message.name === user.displayName && "chat_receiver"}`}>
            <span className="chat_name">{message.name}</span>
            {message.message} {""} {""}
            <span className="chat_timestamp">
              {/* {new Date(message.timestamp?.toDate()).toLocaleString()} */}
              {/* {moment(new Date(message.timestamp)).format('hh:mm A') }  */}
              {/* {new Date(message.timestamp).toDateString()} */}

                        {moment(new Date(
                            message.
                            timestamp
                        )).fromNow().includes("seconds") || moment(new Date(
                            message.
                            timestamp
                        )).fromNow().includes("minute") || moment(new Date(
                            message.
                            timestamp
                        )).fromNow().includes("an hour ago") ? moment(new Date(
                            message.
                            timestamp
                        )).fromNow() :  (`${moment(new Date(message.timestamp)).format('hh:mm A')} ${moment(new Date(message.timestamp).toLocaleString()).format("Do MMM")}`)}
                        
                        {/* { !moment(new Date(
                            message.
                            timestamp
                        )).fromNow().includes("seconds") || !moment(new Date(
                            message.
                            timestamp
                        )).fromNow().includes("minutes") || !moment(new Date(
                            message.
                            timestamp
                        )).fromNow().includes("hours") ? "": new Date(message.timestamp).toDateString()} */}
            </span>
          </p>
          </>
          
        ))}
      </div>
      <div className="chat_footer">
        <IconButton>
          <InsertEmoticonTwoToneIcon />
        </IconButton>
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Type a message"
          />
          <button type="submit" onClick={sendMessage}>
            Send a Message
          </button>
        </form>
        <IconButton>
          <MicIcon />
        </IconButton>
      </div>
    </div>
  );
}

export default Chat;
