import React, { useState } from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';

function Chat() {
  const [messages, setMessages] = useState([
    { id: 1, text: 'Welcome to the chat!', sender: 'system' },
  ]);

  const handleSend = (messageText) => {
    const newMessage = {
      id: messages.length + 1,
      text: messageText,
      sender: 'user',
    };
    setMessages([...messages, newMessage]);
  };

  return (
    <div className='chat-container'>
      <MessageList messages={messages} />
      <MessageInput onSend={handleSend} />
    </div>
  );
}

export default Chat;
