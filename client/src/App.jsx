import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/authContext';
import LoginPage from './Pages/Login';
import RegisterPage from './Pages/Register';
import ChatPage from './Pages/Chat';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './Pages/Home';
import Header from './components/Header';
import Footer from './components/Footer';

const App = () => {
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
                  <ChatPage />
                </ProtectedRoute>
              }
            />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
          </Routes>
        </Router>

        <Footer />
      </div>
    </AuthProvider>
  );
};

export default App;
