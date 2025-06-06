import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import bannerImage from '../assets/chat-app-image (1).png';

const Banner = () => {
  const heroRef = useRef(null);
  const bgImageRef = useRef(null);
  const heroTextRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      bgImageRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.8, ease: 'power3.out' }
    );

    gsap.from(heroTextRef.current, {
      y: 40,
      opacity: 0,
      duration: 1.2,
      delay: 0.4,
      ease: 'power3.out',
    });
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section
        ref={heroRef}
        className='relative w-full min-h-screen flex flex-col md:flex-row items-center justify-between px-6 py-24 text-white bg-gradient-to-b from-[#2e026d] to-[#15162c]'
      >
        <div className='md:w-1/2 space-y-6 z-10' ref={heroTextRef}>
          <h1 className='text-5xl md:text-6xl font-extrabold leading-tight drop-shadow-lg'>
            Sip, Chat, Connect <br /> Over ChayerCup
          </h1>
          <p className='text-lg md:text-xl drop-shadow-md'>
            Step into a cozy virtual tea house where strangers meet, chat, and
            make meaningful connections — no login, just conversation.
          </p>
          <div className='flex flex-wrap gap-4'>
            <button className='btn btn-primary btn-wide'>Join a Table</button>
            <button className='btn btn-accent btn-wide'>Start Brewing</button>
          </div>
        </div>
        <div className='md:w-1/2 mt-12 md:mt-0 relative z-10'>
          <img
            ref={bgImageRef}
            src={'bannerImage'}
            alt='Chat App UI'
            className='w-full max-w-md mx-auto drop-shadow-xl'
          />
        </div>
      </section>
    </>
  );
};

export default Banner;
