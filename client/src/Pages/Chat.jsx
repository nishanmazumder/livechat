// src/pages/ChatPage.jsx
import React, { useState, useEffect, useRef, useContext } from 'react';
import AuthContext from '../context/authContext';
import UserDetails from '../components/UserDetails';
import ChatPanel from '../components/ChatPanel';
import UserList from '../components/UserList';
import RoomList from '../components/RoomList';

const dummyMessages = [
  {
    senderId: 1,
    receiverId: 2,
    message: 'Welcome to the chat!',
    time: new Date(),
  },
  {
    senderId: 2,
    receiverId: 1,
    message: 'Thanks! Excited to be here.',
    time: new Date(),
  },
  {
    senderId: 1,
    receiverId: 3,
    message: 'Hey there! How’s your day going?',
    time: new Date(),
  },
  {
    senderId: 3,
    receiverId: 1,
    message: 'All good! Just checking out the app.',
    time: new Date(),
  },
  {
    senderId: 2,
    receiverId: 3,
    message: 'Welcome! This chat system looks great!',
    time: new Date(),
  },
];

const ChatPage = () => {
  const { socket, user } = useContext(AuthContext);
  const [activeUsers, setActiveUsers] = useState([]);
  const [receiver, setReceiver] = useState(null);
  const [messages, setMessages] = useState(dummyMessages);

  useEffect(() => {
    
    // load message
    socket.on('user_messages', (msgArray) => {
      msgArray.map((data) => setMessages((prvMsg) => [...prvMsg, data]));
    });

    // send message
    socket.on('receive_message', (msg) => {
      setMessages((prvMsg) => [...prvMsg, msg]);
    });

    return () => {
      socket.off('receive_message');
      socket.off('user_messages');
    };

  }, [user, receiver, messages]);

  console.log(messages);

  const handleSend = (messageText) => {
    const newMessage = {
      senderId: user?.id,
      senderSocketId: user.socketId,
      receiverId: receiver,
      message: messageText,
      time: new Date().toISOString(),
    };

    socket.emit('send_message', newMessage);
    setMessages((prev) => [...prev, newMessage]);
  };

  const handleSelectedUser = (id) => {
    setReceiver(id);
    socket.emit('load_messages', id);
  };

  return (
    <div className='flex flex-col justify-between md:flex-row h-screen bg-gradient-to-br from-[#2e026d] to-[#15162c] text-white font-sans overflow-hidden'>
      {/* Left Sidebar */}
      <aside className='md:w-64 bg-[#1f1235] p-4 flex flex-col overflow-y-auto'>
        {/* Users */}
        <UserList
          setReceiver={handleSelectedUser}
          selectedReceiver={receiver}
          activeUsers={activeUsers}
        />

        {/* Divider */}
        <hr className='border-white/10 my-2' />

        {/* Rooms */}
        <RoomList />
      </aside>

      {/* Chat Panel */}
      {receiver ? (
        <ChatPanel messages={messages} onSend={handleSend} />
      ) : (
        'Please select a user!'
      )}

      {/* User Details Panel */}
      <UserDetails />
    </div>
  );
};

export default ChatPage;
