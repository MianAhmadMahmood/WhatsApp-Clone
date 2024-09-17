import React from 'react';
import './Sidebar.css';
import DonutLargeIcon from '@mui/icons-material/DonutLarge'; 
import { Avatar, IconButton } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat'; 
import MoreVertIcon from '@mui/icons-material/MoreVert'; 
import SearchOutLined from '@mui/icons-material/SearchOutlined';
import SidebarChat from '../Sidebarchat/SidebarChat';

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className='sidebar_header'>
        <Avatar src="https://avatar.iran.liara.run/public/boy?username=Ash"/>
        <div className='sidebar_headerRight'>
          <IconButton>
            <DonutLargeIcon /> 
          </IconButton>
          <IconButton>
            <ChatIcon /> 
          </IconButton>
          <IconButton>
            <MoreVertIcon /> 
          </IconButton>
        </div>
      </div>
    <div className='sidebar_search'>
<div className='sidebar_searchcontainer'>
  <SearchOutLined />
  <input type="text" placeholder="Search or start a new chat"/>
</div>
    </div>
    <div className='sidebar_chat'>
      <SidebarChat/>
      <SidebarChat/>
      <SidebarChat/>
    </div>
    </div>
  );
};

export default Sidebar;
