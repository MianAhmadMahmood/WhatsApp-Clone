import React, { useEffect, useState } from 'react';
import './App.css'
import Chat from './comp/chat/Chat';
import Sidebar from './comp/sidebar/Sidebar';
import Pusher from 'pusher-js';
import axios from './axios.js';
function App() {
const[messages ,setMessages] =useState([])

  useEffect(()=>{
    axios.get('/messages/sync')
    .then(response =>{
      setMessages(response.data)
    })

  },[])

  useEffect(()=>{
    const pusher = new Pusher('548433ea7f4fb9381b01', {
      cluster: 'ap2'
    });

    const channel = pusher.subscribe('messages');
    channel.bind('inserted',(newMessages) =>{
      
setMessages([...messages,newMessages]) 

    });
 return()=>{
  channel.unbind_all();
  channel.unsubscribe()
}

  },[messages])

  console.log(messages)
  return (
    <div className="app">
   <div className='app_body'>
<Sidebar/>
 <Chat  messages={messages}/>
 </div>
    </div>
  );
}

export default App;
