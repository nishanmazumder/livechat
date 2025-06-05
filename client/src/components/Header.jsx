import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const Header = () => {
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

  return (
    <>
      {/* Header */}
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 w-full z-50 px-6 py-4 flex items-center justify-between transition-all duration-300 ${
          scrolled ? 'backdrop-blur-md bg-white/10 shadow-md' : 'bg-transparent'
        }`}
      >
        <div className='text-white font-bold text-2xl'>ChayerCup</div>
        <button className='btn btn-outline btn-sm text-white border-white shadow-lg hover:bg-white hover:text-black transition'>
          Login
        </button>
      </header>
    </>
  );
};

export default Header;
