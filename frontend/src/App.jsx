import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import Chat from './Chat';
import './App.css';
import AuthContext, { AuthProvider } from './context/authContext';
import RegisterForm from './components/RegisterForm';
import { refreshToken } from './utils/auth';

function Menu() {
  const { username, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    refreshToken();
    const interval = setInterval(refreshToken, 15 * 60 * 1000); // every 15min
    return () => clearInterval(interval);
  }, []);

  function handleLogout() {
    logout();
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
        <li>
          <Link to='/register'>Register</Link>
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
    <AuthProvider>
      <div className='App'>
        <h1>bti Healthy Harvest WhatsApp Message</h1>
        <Router>
          <Menu />

          <Routes>
            <Route path='/' element={<Chat />} />
            <Route path='/login' element={<LoginForm />} />
            <Route path='/register' element={<RegisterForm />} />
          </Routes>
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;
