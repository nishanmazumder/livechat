import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import MessageList from './components/MessageList';
import MessageInput from './components/MessageInput';

function Chat() {
  const [messages, setMessages] = useState([
    { id: 1, text: 'Welcome to the chat!', sender: 'system' },
  ]);

  const socket = io('http://localhost:3000');

  useEffect(() => {
    socket.on('receive_message', (msg) => {
      setMessages((prvMsg) => [...prvMsg, msg]);
    });

    return () => socket.off('receive_message');
  }, []);

  const handleSend = (messageText) => {
    const newMessage = {
      userId: 1,
      text: messageText,
    };

    socket.emit('send_message', newMessage);
  };

  return (
    <div className='chat-container'>
      <MessageList messages={messages} />
      <MessageInput onSend={handleSend} />
    </div>
  );
}

export default Chat;
