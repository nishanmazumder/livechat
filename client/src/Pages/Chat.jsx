// src/pages/ChatPage.jsx
import React, { useEffect, useRef } from 'react';

const users = [
  {
    id: 1,
    name: 'Alice',
    active: true,
    avatar: 'https://i.pravatar.cc/40?img=1',
    unread: 2,
  },
  {
    id: 2,
    name: 'Bob',
    active: false,
    avatar: 'https://i.pravatar.cc/40?img=2',
    unread: 0,
  },
  {
    id: 3,
    name: 'Charlie',
    active: true,
    avatar: 'https://i.pravatar.cc/40?img=3',
    unread: 5,
  },
  {
    id: 4,
    name: 'Daisy',
    active: false,
    avatar: 'https://i.pravatar.cc/40?img=4',
    unread: 1,
  },
];

const messages = [
  { id: 1, sender: 'Alice', text: 'Hey there!' },
  { id: 2, sender: 'Me', text: 'Hello Alice!' },
  { id: 3, sender: 'Alice', text: 'What’s brewing today?' },
];

const ChatPage = () => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className='flex flex-col md:flex-row h-screen bg-gradient-to-br from-[#2e026d] to-[#15162c] text-white font-sans overflow-hidden'>
      {/* Left Sidebar */}
      <aside className='md:w-64 bg-[#1f1235] p-4 flex flex-col overflow-y-auto'>
        {/* Users */}
        <div className='mb-4'>
          <h2 className='text-xl font-bold mb-2'>Users</h2>
          <ul className='space-y-2'>
            {users.map((user) => (
              <li
                key={user.id}
                className='flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-purple-800 transition cursor-pointer relative'
                onClick={() => alert(`Clicked on ${user.name}`)}
              >
                <div className='relative'>
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className='w-10 h-10 rounded-full object-cover'
                  />
                  {user.active && (
                    <span className='absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-400 border-2 border-[#1f1235] animate-pulse'></span>
                  )}
                </div>
                <div className='flex-1'>
                  <span>{user.name}</span>
                  {user.unread > 0 && (
                    <span className='ml-2 bg-red-600 text-white text-xs px-2 py-0.5 rounded-full'>
                      {user.unread}
                    </span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Divider */}
        <hr className='border-white/10 my-2' />

        {/* Rooms */}
        <div className='mt-2'>
          <h2 className='text-xl font-bold mb-2'>Rooms</h2>
          <ul className='space-y-2'>
            <li className='px-3 py-2 rounded-lg hover:bg-purple-800 transition cursor-pointer'>
              General
            </li>
            <li className='px-3 py-2 rounded-lg hover:bg-purple-800 transition cursor-pointer'>
              Tech
            </li>
            <li className='px-3 py-2 rounded-lg hover:bg-purple-800 transition cursor-pointer'>
              Design
            </li>
          </ul>
        </div>
      </aside>

      {/* Chat Panel */}
      <main className='flex-1 flex flex-col overflow-hidden'>
        <div className='flex-1 overflow-y-auto p-6 space-y-4'>
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`max-w-xl px-4 py-3 rounded-2xl shadow-md bg-white/10 backdrop-blur-sm w-fit ${
                msg.sender === 'Me'
                  ? 'ml-auto text-right bg-purple-500/30'
                  : 'text-left'
              }`}
            >
              <p className='text-sm text-gray-300 font-medium'>{msg.sender}</p>
              <p className='text-lg text-white'>{msg.text}</p>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className='p-4 border-t border-white/10 bg-white/5 backdrop-blur-md flex items-center gap-2 sticky bottom-0'>
          <input
            type='text'
            placeholder='Type a message...'
            className='input input-bordered w-full bg-white/10 text-white backdrop-blur-sm placeholder:text-gray-400'
          />
          <button className='btn btn-primary'>Send</button>
        </div>
      </main>

      {/* User Details Panel */}
      <aside className='w-80 bg-[#1f1235] p-6 hidden lg:flex flex-col gap-4 overflow-y-auto'>
        <div className='flex flex-col items-center text-center'>
          <img
            src='https://i.pravatar.cc/100?img=1'
            alt='User'
            className='w-24 h-24 rounded-full mb-4'
          />
          <h2 className='text-xl font-bold'>Alice</h2>
          <p className='text-sm text-gray-400'>Full Stack Developer</p>
          <p className='text-sm text-gray-500'>📍 New York, USA</p>
          <button className='btn btn-outline mt-4'>Edit Profile</button>
        </div>
      </aside>
    </div>
  );
};

export default ChatPage;
