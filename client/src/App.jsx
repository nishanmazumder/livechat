import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import Chat from './Chat';
import './App.css';
import AuthContext, { AuthProvider } from './context/authContext';
import RegisterForm from './components/RegisterForm';
import { getAuthToken, refreshToken } from './utils/auth';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './Home';

function Menu() {
  const { username, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!getAuthToken()) {
  //     handleLogout();
  //   }
  // }, []);

  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <nav className='menu'>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/chat'>Chat</Link>
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
  const [notice, setNotice] = useState(false);

  useEffect(() => {
    refreshToken();

    // const testInt = setInterval(() => {
    //   console.log('GetTokenAPP:', getAuthToken());
    // }, 1000);

    // return () => clearInterval(testInt);

    // const interval = setInterval(refreshToken, 15 * 60 * 1000); // every 15min
    const interval = setInterval(refreshToken, 2 * 60 * 1000); // every 2min
    return () => clearInterval(interval);

    // return () => {
    //   clearInterval(testInt);
    //   clearInterval(interval);
    // };
  }, []);

  return (
    <AuthProvider>
      <div className='App'>
        <h1>bti Healthy Harvest WhatsApp Message</h1>
        {notice && (
          <span color='red'>
            You are not eligible to see this page. Please login.
          </span>
        )}
        <Router>
          <Menu />

          <Routes>
            <Route path='/' element={<Home />} />
            <Route
              path='/chat'
              element={
                <ProtectedRoute>
                  <Chat />
                </ProtectedRoute>
              }
            />
            <Route path='/login' element={<LoginForm />} />
            <Route path='/register' element={<RegisterForm />} />
          </Routes>
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;
