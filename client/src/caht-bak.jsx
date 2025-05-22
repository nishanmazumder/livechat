import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import API from '../utils/api'; // Your API wrapper

const socket = io('http://localhost:5000'); // Connect to WebSocket server

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [username, setUsername] = useState('User'); // Replace with actual username

  useEffect(() => {
    // Fetch previous messages
    API.get('/chat/messages').then((response) => setMessages(response.data));

    // Listen for real-time messages
    socket.on('newMessage', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => socket.off('newMessage'); // Cleanup listener on unmount
  }, []);

  const sendMessage = () => {
    socket.emit('sendMessage', { sender: username, text });
    setText(''); // Clear input after sending
  };

  return (
    <div>
      <h2>Chat Room</h2>
      <ul>
        {messages.map((msg, i) => (
          <li key={i}>
            <strong>{msg.sender}:</strong> {msg.text}
          </li>
        ))}
      </ul>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder='Type a message...'
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chat;

import React, { useEffect, useState, useContext } from 'react';
import io from 'socket.io-client';
import AuthContext from './context/authContext';

const socket = io('http://localhost:3000'); // Adjust to your backend address

function Chat() {
  const { username } = useContext(AuthContext);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on('receive_message', (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => socket.off('receive_message');
  }, []);

  const sendMessage = () => {
    const msgData = {
      username,
      text: message,
      timestamp: new Date().toISOString()
    };
    socket.emit('send_message', msgData);
    setMessage('');
  };

  return (
    <div>
      <h2>Chat Room</h2>
      <div className='chat-box'>
        {messages.map((msg, idx) => (
          <p key={idx}><strong>{msg.username}:</strong> {msg.text}</p>
        ))}
      </div>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder='Type a message...'
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default Chat;

{
  "username": "Alice",
  "text": "Hello, world!",
  "timestamp": "2025-05-14T14:00:00Z"
}


const socket = io('http://localhost:3000', {
  auth: {
    token: localStorage.getItem('token')
  }
});


back
io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  if (!token) return next(new Error('Auth failed'));

  try {
    const user = jwt.verify(token, SECRET_KEY);
    socket.user = user;
    next();
  } catch {
    next(new Error('Invalid token'));
  }
});
