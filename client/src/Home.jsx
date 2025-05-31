import { useEffect, useMemo, useState } from 'react';
import { io } from 'socket.io-client';

const Home = () => {
  //  const socket = useMemo(() => io('http://localhost:3000'), []); // 5173
  const socket = io('http://localhost:3000'); // 5173
  const [userId, setUserID] = useState('');
  const [sender, setSender] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on('connect', () => {
      setUserID(socket.id);
      console.log('connected', socket.id);
    });

    socket.on('send', (msg) => {
      setMessages((prvMessage) => [...prvMessage, msg]);
    });

    return () => socket.disconnect();
  }, []);

  const handleSend = () => {
    console.log('Console Send Data!');
    socket.emit('message', { id: sender, msg: message });
  };

  return (
    <>
      <h3>{userId}</h3>
      <div>
        <div htmlFor='roomId'>
          Room:
          <input
            id='roomId'
            type='text'
            value={sender}
            onChange={(e) => setSender(e.target.value)}
          />
        </div>
        <div htmlFor='roomId'>
          Message:
          <input
            id='msgId'
            type='text'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <button onClick={handleSend}>Send</button>
      </div>

      <div>{messages.map((msg) => msg)}</div>
    </>
  );
};

export default Home;
