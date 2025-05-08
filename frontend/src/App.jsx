import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import Chat from './Chat';
import './App.css';
import AuthContext, { AuthProvider } from './context/authContext';

function Menu() {
  const { username, logout } = useContext(AuthContext);
  const navigate = useNavigate();

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
          </Routes>
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;
