import React from 'react';

function MessageList({ messages }) {
  return (
    <div className='message-list'>
      {messages.map((msg) => (
        <div key={msg.id} className={`message ${msg.sender}`}>
          {msg.text}
        </div>
      ))}
    </div>
  );
}

export default MessageList;
