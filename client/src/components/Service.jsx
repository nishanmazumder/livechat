import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import serviceImage1 from '../assets/chat-app-image (2).png';
import serviceImage2 from '../assets/chat-app-image (3).png';

const Service = () => {
  const image1Ref = useRef(null);
  const image2Ref = useRef(null);

  useEffect(() => {
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
  }, []);

  return (
    <>
      {/* Services Section */}
      <section className='py-20 px-4 bg-[#1f1235] text-white'>
        <div className='container mx-auto flex flex-col md:flex-row items-center gap-10'>
          <div className='md:w-1/2'>
            <img
              ref={image1Ref}
              src={serviceImage1}
              alt='Instant Conversations'
              className='rounded-lg shadow-lg w-full'
            />
          </div>
          <div className='md:w-1/2 space-y-4'>
            <h2 className='text-3xl font-bold'>Instant Conversations</h2>
            <p className='text-lg text-gray-300'>
              Find a partner, pour some chai, and dive into authentic
              discussions in seconds.
            </p>
          </div>
        </div>
        <div className='container mx-auto flex flex-col md:flex-row-reverse items-center gap-10 mt-16'>
          <div className='md:w-1/2'>
            <img
              ref={image2Ref}
              src={serviceImage2}
              alt='Warm & Private'
              className='rounded-lg shadow-lg w-full'
            />
          </div>
          <div className='md:w-1/2 space-y-4'>
            <h2 className='text-3xl font-bold'>Warm & Private</h2>
            <p className='text-lg text-gray-300'>
              Brew up trust in a safe space — your identity stays private while
              your conversations remain real.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Service;
