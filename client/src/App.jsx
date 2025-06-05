import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Chat from './Chat';
// import './App.css';
import AuthContext, { AuthProvider } from './context/authContext';
import LoginPage from './Pages/Login';
import RegisterPage from './Pages/Register';
import ChatPage from './Pages/Chat';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './Pages/Home';
import Header from './components/Header';
import Footer from './components/Footer';

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
      <div className='min-h-screen bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white font-sans'>
        {notice && (
          <span color='red'>
            You are not eligible to see this page. Please login.
          </span>
        )}
        <Router>
          <Header />
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route
              path='/chat'
              element={
                <ProtectedRoute>
                  <Chat />
                </ProtectedRoute>
              }
            />
            <Route path='/chatt' element={<ChatPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
          </Routes>
        </Router>

        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
