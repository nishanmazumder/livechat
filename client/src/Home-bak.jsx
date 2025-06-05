// src/pages/HomePage.jsx
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import bannerImage from './assets/chat-app-image (1).png';
import serviceImage1 from './assets/chat-app-image (2).png';
import serviceImage2 from './assets/chat-app-image (3).png';

const HomePage = () => {
  const headerRef = useRef(null);
  const heroRef = useRef(null);
  const bgImageRef = useRef(null);
  const heroTextRef = useRef(null);
  const image1Ref = useRef(null);
  const image2Ref = useRef(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    gsap.from(headerRef.current, {
      y: -100,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
    });

    gsap.fromTo(
      bgImageRef.current,
      { scale: 1.2, opacity: 0 },
      { scale: 1, opacity: 0.3, duration: 2, ease: 'power2.out' }
    );

    gsap.from(heroTextRef.current, {
      y: 40,
      opacity: 0,
      duration: 1.2,
      delay: 0.4,
      ease: 'power3.out',
    });

    gsap.to(image1Ref.current, {
      y: -10,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });

    gsap.to(image2Ref.current, {
      y: -10,
      duration: 2.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className='min-h-screen bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white font-sans'>
      {/* Header */}
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 w-full z-50 px-6 py-4 flex items-center justify-between transition-all duration-300 ${
          scrolled ? 'backdrop-blur-md bg-white/10 shadow-md' : 'bg-transparent'
        }`}
      >
        <div className='text-white font-bold text-2xl'>Chitchat.gg</div>
        <button className='btn btn-outline btn-sm text-white border-white shadow-lg hover:bg-white hover:text-black transition'>
          Login
        </button>
      </header>

      {/* Hero Section */}
      <section
        ref={heroRef}
        className='relative w-full min-h-[80vh] flex items-center justify-center text-center px-4 overflow-hidden'
      >
        <img
          ref={bgImageRef}
          src={bannerImage}
          alt='Chat Background'
          className='absolute inset-0 w-full h-full object-cover'
        />
        <div ref={heroTextRef} className='relative z-10 max-w-3xl text-white'>
          <h1 className='text-4xl md:text-6xl font-extrabold leading-tight mb-4 drop-shadow-lg'>
            Talk to Strangers, <br className='hidden md:block' /> Make Real
            Friends
          </h1>
          <p className='text-lg md:text-xl mb-8 drop-shadow-md'>
            Join a modern platform to meet new people anonymously through video
            or text. No login required. Just chat and vibe.
          </p>
          <div className='flex flex-wrap justify-center gap-4'>
            <button className='btn btn-primary btn-wide'>Text Chat</button>
            <button className='btn btn-accent btn-wide'>Video Chat</button>
          </div>
        </div>
      </section>

      {/* Animated Service Section 1 */}
      <section className='py-20 px-4 container mx-auto flex flex-col md:flex-row items-center gap-8 rounded-xl'>
        <img
          ref={image1Ref}
          src={serviceImage1}
          alt='Service 1'
          className='w-full md:w-1/2 rounded-lg shadow-lg'
        />
        <div className='md:w-1/2'>
          <h2 className='text-3xl md:text-4xl font-bold mb-4'>
            Connect Instantly
          </h2>
          <p className='text-lg'>
            One click, and you're face-to-face with someone new from anywhere in
            the world. It's that easy — real-time human connection without
            boundaries.
          </p>
        </div>
      </section>

      {/* Animated Service Section 2 */}
      <section className='py-20 px-4 container mx-auto flex flex-col md:flex-row-reverse items-center gap-8 rounded-xl mt-8'>
        <img
          ref={image2Ref}
          src={serviceImage2}
          alt='Service 2'
          className='w-full md:w-1/2 rounded-lg shadow-lg'
        />
        <div className='md:w-1/2'>
          <h2 className='text-3xl md:text-4xl font-bold mb-4'>
            Safe & Anonymous
          </h2>
          <p className='text-lg'>
            No signups. No strings. Your identity is protected while you explore
            genuine conversations with strangers.
          </p>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className='py-20 bg-base-100 text-base-content'>
        <div className='container mx-auto px-4'>
          <h2 className='text-4xl font-bold text-center mb-12'>
            Loved by Users
          </h2>
          <div className='grid md:grid-cols-3 gap-8'>
            <div className='card bg-base-200 shadow-md p-6'>
              <p className='mb-4'>
                “I’ve met some of my closest online friends here. Love the
                vibe!”
              </p>
              <div className='font-semibold'>— Alex</div>
            </div>
            <div className='card bg-base-200 shadow-md p-6'>
              <p className='mb-4'>
                “The instant match feature is 🔥. Simple and fast.”
              </p>
              <div className='font-semibold'>— Maria</div>
            </div>
            <div className='card bg-base-200 shadow-md p-6'>
              <p className='mb-4'>
                “Helps me meet people and improve my English daily.”
              </p>
              <div className='font-semibold'>— Samir</div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className='py-20 text-center bg-gradient-to-r from-purple-700 to-indigo-800'>
        <div className='container mx-auto px-4'>
          <h2 className='text-4xl font-bold mb-4'>Ready to Chat?</h2>
          <p className='mb-6 text-lg max-w-xl mx-auto'>
            Connect with someone new today. No hassle, just real conversations.
          </p>
          <button className='btn btn-warning btn-lg shadow-md'>
            Start Now
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className='footer footer-center p-10 bg-base-300 text-base-content'>
        <nav className='grid grid-flow-col gap-4'>
          <a className='link link-hover'>Terms</a>
          <a className='link link-hover'>Privacy</a>
          <a className='link link-hover'>Support</a>
        </nav>
        <p>
          &copy; {new Date().getFullYear()} Chitchat.gg. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default HomePage;
