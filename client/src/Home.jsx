
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Home = () => {
  const headerRef = useRef(null);
  const heroRef = useRef(null);
  const bgImageRef = useRef(null);
  const heroTextRef = useRef(null);

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
  }, []);

  return (
    <div className='min-h-screen bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white font-sans'>
      {/* Header with Animation */}
      <header
        ref={headerRef}
        className="navbar container mx-auto px-4 bg-base-100 shadow-md sticky top-0 z-50 rounded-b-xl mt-2 bg-[url('https://cdn.pixabay.com/photo/2022/03/08/20/24/metaverse-7055860_1280.jpg')] bg-cover bg-center"
      >
        <div className='flex-1 backdrop-blur-sm bg-white/20 rounded-xl p-2'>
          <a className='btn btn-ghost normal-case text-xl text-primary'>
            Chitchat.gg
          </a>
        </div>
        <div className='flex-none gap-2 backdrop-blur-sm bg-white/20 rounded-xl p-2 hidden md:flex'>
          <a className='btn btn-ghost btn-sm'>Home</a>
          <a className='btn btn-ghost btn-sm'>Features</a>
          <a className='btn btn-ghost btn-sm'>How It Works</a>
          <a className='btn btn-ghost btn-sm'>Testimonials</a>
          <a className='btn btn-outline btn-sm'>Login</a>
        </div>
      </header>

      {/* Hero Section with Animated Background */}
      <section
        ref={heroRef}
        className='relative w-full min-h-[80vh] flex items-center justify-center text-center px-4 overflow-hidden'
      >
        <img
          ref={bgImageRef}
          src='https://cdn.pixabay.com/photo/2017/08/10/07/32/group-2614601_1280.jpg'
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

      {/* Services Section */}
      <section className='py-20 bg-base-200 text-base-content'>
        <div className='container mx-auto px-4'>
          <h2 className='text-4xl font-bold text-center mb-14'>Features</h2>
          <div className='grid gap-8 md:grid-cols-3'>
            <div className='card bg-base-100 shadow-xl p-6'>
              <h3 className='card-title mb-2'>🔐 Anonymous Chat</h3>
              <p>
                Stay private while making connections worldwide. No registration
                required.
              </p>
            </div>
            <div className='card bg-base-100 shadow-xl p-6'>
              <h3 className='card-title mb-2'>🎥 Video & Text Options</h3>
              <p>
                Choose your comfort zone — go full camera or keep it chill with
                just text.
              </p>
            </div>
            <div className='card bg-base-100 shadow-xl p-6'>
              <h3 className='card-title mb-2'>💡 Smart Matching</h3>
              <p>
                Connect with like-minded strangers based on interests and
                preferences.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className='py-20 container mx-auto px-4'>
        <h2 className='text-4xl font-bold text-center mb-12'>How It Works</h2>
        <div className='grid md:grid-cols-4 gap-8 text-center'>
          <div className='p-4'>
            <div className='text-4xl mb-2'>📱</div>
            <h4 className='font-bold mb-1'>1. Open Chitchat</h4>
            <p>Launch our web app — no download needed.</p>
          </div>
          <div className='p-4'>
            <div className='text-4xl mb-2'>🎯</div>
            <h4 className='font-bold mb-1'>2. Pick Mode</h4>
            <p>Select between video or text chat modes.</p>
          </div>
          <div className='p-4'>
            <div className='text-4xl mb-2'>🤝</div>
            <h4 className='font-bold mb-1'>3. Get Matched</h4>
            <p>We’ll find someone for you instantly.</p>
          </div>
          <div className='p-4'>
            <div className='text-4xl mb-2'>💬</div>
            <h4 className='font-bold mb-1'>4. Start Chatting</h4>
            <p>Enjoy a real conversation with a stranger.</p>
          </div>
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

export default Home;
