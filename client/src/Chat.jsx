import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import MessageList from './components/MessageList';
import MessageInput from './components/MessageInput';
import ChatUsers from './components/ChatUsers';
import { useContext } from 'react';
import AuthContext from './context/authContext';

function Chat() {
  // const socket = io('http://localhost:3000'); // 5173
  const { socket, user } = useContext(AuthContext);
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

  console.log(user);

  useEffect(() => {
    console.log('chat console!');

    socket.on('active_users', (activeUsersList) => {
      setActiveUsers(activeUsersList);
    });

    // socket.on('connect', () => {
    //   console.log('chat- on connect', socket.id);
    // });

    // console.log(messages);

    // socket.on('private message', (msg) => {
    //   console.log(msg);

    //   setMessages((prvMsg) => [...prvMsg, msg]);
    // });

    // socket.on('user_messages', (msg) => {
    //   // console.log('use effect user_message');
    //   setMessages(msg);
    // });

    // return () => {
    //   socket.off('private message');
    //   // socket.off('user_messages');
    // };

    // return () => socket.disconnect();

    // }, [socket, messages]);
  }, []);

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
    // socket.emit('register', id);
    // socket.on('load_messages', id);
  };

  return (
    <div className='chat-container'>
      <ChatUsers
        setReceiver={handleSelectedUser}
        selectedReceiver={receiver}
        activeUsers={activeUsers}
      />
      {receiver && <MessageList messages={messages} />}
      {receiver && <MessageInput onSend={handleSend} />}
    </div>
  );
}

export default Chat;
