// At the top of your component file
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const TestimonialsSection = () => {
  const imageRefs = useRef([]);

  useEffect(() => {
    imageRefs.current.forEach((ref, i) => {
      gsap.fromTo(
        ref,
        {
          y: i % 2 === 0 ? -10 : 10,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: i * 0.15,
          ease: 'power2.out',
        }
      );

      gsap.to(ref, {
        y: i % 2 === 0 ? -10 : 10,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 1 + i * 0.1,
      });
    });
  }, []);

  const images = [
    '1.jpg',
    '2.jpg',
    '3.jpg',
    '4.jpg',
    '5.jpg',
    '6.jpg',
    '7.jpg',
    '8.jpg',
    '9.jpg',
    '10.jpg',
  ];

  return (
    <>
      {/* Testimonials Section */}
      <section className='py-24 bg-gradient-to-b from-purple-900 via-[#2e026d] to-[#15162c] text-white relative overflow-hidden'>
        {/* Image Wall */}
        <div className='flex flex-wrap justify-center gap-6 mb-16 px-4'>
          {images.map((src, i) => (
            <div
              key={i}
              ref={(el) => (imageRefs.current[i] = el)}
              className='w-24 h-24 md:w-28 md:h-28 rounded-xl overflow-hidden shadow-lg border border-white/20 bg-white/10 backdrop-blur-sm'
              style={{
                transform: `translateY(${i % 2 === 0 ? '-12px' : '12px'})`,
              }}
            >
              <img
                src={`/assets/testimonials/${src}`}
                alt={`User ${i + 1}`}
                className='w-full h-full object-cover'
              />
            </div>
          ))}
        </div>

        {/* Content Below */}
        <div className='text-center px-4'>
          <p className='uppercase text-sm text-gray-300 tracking-widest mb-2'>
            Testimonials
          </p>
          <h2 className='text-3xl md:text-5xl font-bold mb-4'>
            Trusted by leaders <br className='hidden md:block' />
            <span className='text-purple-300'>from various industries</span>
          </h2>
          <p className='text-lg max-w-2xl mx-auto text-gray-300 mb-8'>
            Learn why professionals trust our solutions to complete their
            customer journeys.
          </p>
          <button className='btn btn-outline btn-accent px-6 text-white border-white hover:bg-white hover:text-black transition'>
            Read Success Stories
          </button>
        </div>
      </section>
    </>
  );
};

export default TestimonialsSection;
