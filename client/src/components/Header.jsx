import React, { useEffect, useRef, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/authContext';
import gsap from 'gsap';

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const headerRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    gsap.from(headerRef.current, {
      y: -100,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
    });

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });

  const loginButton = () => {
    let button = (
      <button
        onClick={() => navigate('/login')}
        className='btn btn-outline btn-sm text-white border-white shadow-lg hover:bg-white hover:text-black transition'
      >
        Login
      </button>
    );

    if (user.id) {
      button = (
        <button
          onClick={handleLogout}
          className='btn btn-outline btn-sm text-white border-white shadow-lg hover:bg-white hover:text-black transition'
        >
          Logout
        </button>
      );
    }

    return button;
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      {/* Header */}
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 w-full z-50 px-6 py-4 flex items-center justify-between transition-all duration-300 ${
          scrolled ? 'backdrop-blur-md bg-white/10 shadow-md' : 'bg-transparent'
        }`}
      >
        <div
          onClick={() => navigate('/')}
          className='text-white font-bold text-2xl cursor-pointer'
        >
          ChayerCup
        </div>

        {loginButton()}
      </header>
    </>
  );
};

export default Header;
