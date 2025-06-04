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
      <h1 className='text-3xl font-bold underline'>Hello world!</h1>
      <div className='card bg-primary w-96 shadow-sm'>
        <figure>
          <img
            src='https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp'
            alt='Shoes'
          />
        </figure>
        <div className='card-body'>
          <h2 className='card-title'>Card Title</h2>
          <p>
            A card component has a figure, a body part, and inside body there
            are title and actions parts
          </p>
          <div className='card-actions justify-end'>
            <button className='btn btn-primary'>Buy Now</button>
          </div>
        </div>
      </div>
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
