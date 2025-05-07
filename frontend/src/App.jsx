import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import Chat from './Chat';
import './App.css';
import { parseJwt } from './utils/jwtParser';

function Menu() {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      const decode = parseJwt(token);
      if (decode && decode.username) setUsername(decode.username);
    }
  }, []);

  function handleLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/login');
  }

  return (
    <nav className='menu'>
      <ul>
        <li>
          <Link to='/'>Chat</Link>
        </li>
        <li>
          <Link to='/login'>Login</Link>
        </li>
        {username && <li className='username'>👤 {username}</li>}
        {username && (
          <li className='username'>
            <button onClick={handleLogout}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
}

function App() {
  return (
    <div className='App'>
      <h1>bti Healthy Harvest WhatsApp Message</h1>
      <Router>
        <Menu />

        <Routes>
          <Route path='/' element={<Chat />} />
          <Route path='/login' element={<LoginForm />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
