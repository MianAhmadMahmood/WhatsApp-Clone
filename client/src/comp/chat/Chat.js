import React, { useState } from 'react';
import './Chat.css';
import { Avatar, IconButton } from '@mui/material';
import SearchOutlined from '@mui/icons-material/SearchOutlined';
import MoreVert from '@mui/icons-material/MoreVert';
import AttachFile from '@mui/icons-material/AttachFile';
import InsertEmotionIcon from '@mui/icons-material/InsertEmoticon';
import MicIcon from '@mui/icons-material/Mic';
import axios from '../axios.js'

const Chat = ({ messages }) => {
  const [input, setInput] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();

    try {
      await axios.post('/messages/new', {
        message: input,
        name: "Demo App",
        timestamp: "Just now",
        received: false
      });
      setInput("");
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className='chat'>
      <div className='chat_header'>
        <Avatar />
        <div className='chat_headerInfo'>
          <h3>Room Name</h3>
          <p>Last seen at ...</p>
        </div>
        <div className='chat_headerRight'>
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

      <div className='chat_body'>
        {messages.map((message, index) => (
          <p key={index} className={`chat_message ${message.received ? "chat_receiver" : ""}`}>
            <span className='chat_name'>{message.name}</span>
            {message.message}
            <span className='chat_timestamp'>{message.timestamp}</span>
          </p>
        ))}
      </div>

      <div className='chat_footer'>
        <InsertEmotionIcon />
        <form>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            type="text"
            placeholder="Type a message"
          />
          <button onClick={sendMessage} type="submit">Send a message</button>
        </form>
        <MicIcon />
      </div>
    </div>
  );
};

export default Chat;
