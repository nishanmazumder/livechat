import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import MessageList from './components/MessageList';
import MessageInput from './components/MessageInput';
import ChatUsers from './components/ChatUsers';
import { useContext } from 'react';
import AuthContext from './context/authContext';

function Chat() {
  const [receiver, setReceiver] = useState(null);
  const [messages, setMessages] = useState([
    {
      senderId: 1,
      receiverId: 1,
      message: 'Welcome to the chat!',
      time: new Date(),
    },
  ]);
  const { user } = useContext(AuthContext);

  const socket = io('http://localhost:3000'); // 5173

  useEffect(() => {
    socket.on('receive_message', (msg) => {
      console.log(msg);

      setMessages((prvMsg) => [...prvMsg, msg]);
    });

    // socket.on('user_messages', (msg) => {
    //   // console.log('use effect user_message');
    //   setMessages(msg);
    // });

    return () => {
      socket.off('receive_message');
      // socket.off('user_messages');
    };
  }, []);

  const handleSend = (messageText) => {
    const newMessage = {
      senderId: user?.id,
      receiverId: receiver,
      message: messageText,
      time: new Date(),
    };

    socket.emit('send_message', newMessage);
  };

  const handleSelectedUser = (id) => {
    // console.log(id);

    setReceiver(id);
    // socket.on('load_messages', id);
  };

  return (
    <div className='chat-container'>
      <ChatUsers setReceiver={handleSelectedUser} selectedReceiver={receiver} />
      {receiver && <MessageList messages={messages} />}
      {receiver && <MessageInput onSend={handleSend} />}
    </div>
  );
}

export default Chat;
