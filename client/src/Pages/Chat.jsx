// src/pages/ChatPage.jsx
import React, { useState, useEffect, useRef, useContext } from 'react';
import AuthContext from '../context/authContext';
import UserDetails from '../components/UserDetails';
import ChatPanel from '../components/ChatPanel';
import UserList from '../components/UserList';
import RoomList from '../components/RoomList';

const ChatPage = () => {
      const { socket, user } = useContext(AuthContext);
      // const { user } = useContext(AuthContext);
      const [activeUsers, setActiveUsers] = useState([]);
      const [receiver, setReceiver] = useState(null);
      const [messages, setMessages] = useState([
        {
          senderId: 1,
          receiverId: 1,
          message: 'Welcome to the chat!',
          time: new Date(),
        },
      ]);

        useEffect(() => {
          console.log('chat console!');

          // if (socket) {
          //   socket.on('connect', () => {
          //     // setSocketId(socket.id);
          //     console.log('useEffect Authcontext', socket.id);
          //   });

          // socket.on('connect', () => {
          //   console.log('chat- on connect', socket.id);
          // });

          // console.log(messages);

          // socket.on('private message', (msg) => {
          //   console.log(msg);

          //   setMessages((prvMsg) => [...prvMsg, msg]);
          // });

          socket.on('receive_message', (msg) => {
            console.log('use effect receive_message', msg);
            setMessages((prvMsg) => [...prvMsg, msg]);
          });

          return () => {
            socket.off('receive_message');
            // socket.off('user_messages');
          };

          // return () => socket.disconnect();

          // }, [socket, messages]);
          // }
        }, [user]);

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
            // console.log(id);

            setReceiver(id);

            // socket.on('load_messages', id);
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
