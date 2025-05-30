import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import Chat from './Chat';
import './App.css';
import AuthContext, { AuthProvider } from './context/authContext';
import RegisterForm from './components/RegisterForm';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './Home';

const Menu = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

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
        {user.username && <li className='username'>👤 {user.username}</li>}
        {user.id && (
          <li className='username'>
            <button onClick={handleLogout}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

function App() {
  const [notice, setNotice] = useState(false);

  return (
    <AuthProvider>
      <div className='App'>
        <h1>bti Healthy Harvest</h1>
        {notice && (
          <span color='red'>
            You are not eligible to see this page. Please login.
          </span>
        )}
        <Router>
          <Menu />

          <Routes>
            <Route path='/' element={<Home />} />
            {/* <Route
              path='/chat'
              element={
                <ProtectedRoute>
                  <Chat />
                </ProtectedRoute>
              }
            />
            <Route path='/login' element={<LoginForm />} />
            <Route path='/register' element={<RegisterForm />} /> */}
          </Routes>
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;
