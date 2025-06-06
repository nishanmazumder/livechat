import React, { useEffect, useRef, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import AuthContext from '../context/authContext';
import loginImage from '../assets/chat-app-image (3).png';

const LoginPage = () => {
  const imageRef = useRef(null);
  const formRef = useRef(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const redirectTo = useNavigate();

  useEffect(() => {
    gsap.to(imageRef.current, {
      y: -10,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });

    gsap.from(formRef.current, {
      opacity: 0,
      y: 40,
      duration: 1,
      ease: 'power3.out',
      delay: 0.4,
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await login({ email, password });
    if (response) redirectTo('/chat');
  };

  return (
    <div className='min-h-screen bg-gradient-to-b from-[#2e026d] to-[#15162c] flex items-center justify-center px-4 py-12'>
      <div className='relative w-full max-w-5xl flex flex-col md:flex-row items-center justify-center'>
        {/* Floating Image */}
        <div
          ref={imageRef}
          className='w-full md:w-1/2 flex justify-center relative z-10'
        >
          <div className='relative w-full max-w-md'>
            <img
              src={'loginImage'}
              alt='Floating Graphic'
              className='w-full rounded-lg drop-shadow-2xl'
              style={{ objectFit: 'cover' }}
            />
          </div>
        </div>

        {/* Overlapping Form */}
        <div
          ref={formRef}
          className='absolute md:static top-1/2 md:top-auto transform md:transform-none -translate-y-1/4 md:translate-y-0 md:-ml-20 w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 md:p-10 shadow-2xl z-20'
        >
          <h2 className='text-3xl font-bold text-white mb-6 text-center'>
            Login to ChayerCup
          </h2>
          <form onSubmit={handleSubmit} className='space-y-4'>
            <input
              type='email'
              className='input input-bordered w-full text-white placeholder:text-gray-300'
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type='password'
              className='input input-bordered w-full text-white placeholder:text-gray-300'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button className='btn btn-primary w-full' type='submit'>
              Login
            </button>
          </form>
          <div className='flex justify-between mt-4 text-sm text-white/80'>
            <a href='#' className='link link-hover'>
              Forgot password?
            </a>
            <a href='/signup' className='link link-hover'>
              Don’t have an account? Sign up
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
