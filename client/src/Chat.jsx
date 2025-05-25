import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import MessageList from './components/MessageList';
import MessageInput from './components/MessageInput';
import ChatUsers from './components/ChatUsers';

function Chat() {
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([
    { _id: 1, userId: 1, message: 'Welcome to the chat!', time: new Date() },
  ]);

  const socket = io('http://localhost:3000'); // 5173

  useEffect(() => {
    socket.on('receive_message', (msg) => {
      setMessages((prvMsg) => [...prvMsg, msg]);
    });

    socket.on('user_messages', (msg) => {
      console.log('use effect user_message');
      setMessages(msg);
    });

    return () => {
      socket.off('receive_message');
      socket.off('user_messages');
    };
  }, []);

  const handleSend = (messageText) => {
    const newMessage = {
      userId: user,
      message: messageText,
      time: new Date(),
    };

    socket.emit('send_message', newMessage);
  };

  const handleSelectedUser = (id) => {
    console.log(id);

    setUser(id);
    socket.on('load_messages', id);
  };

  return (
    <div className='chat-container'>
      <ChatUsers setUser={handleSelectedUser} selectedUser={user} />
      {user && <MessageList messages={messages} />}
      {user && <MessageInput onSend={handleSend} />}
    </div>
  );
}

export default Chat;
