import React, { useEffect, useRef } from 'react';
import Typed from 'typed.js';

const Home = () => {
  const el = useRef(null);

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: ['Welcome to Agora.', 'Your Voice, Amplified.' , 'Where Words Weave Worlds.'],
      typeSpeed: 60,
      backSpeed: 40,
      loop: true, 
      showCursor: true, 
      cursorChar: '|',
    });
    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <div className="p-6 justify-center items-center">
      <div className="text-center p-4 my-4">
        <h1 className="text-4xl md:text-6xl sm:text-3xl  font-bold text-[#3bf8eb]">
          <span ref={el} />
        </h1>
        <button className='p-2 border border-white rounded-xl bg-gray-900 my-11 hover:bg-gray-800 hover:border-2 transition-transform ease-in-out duration-200'>
        Create Your Own Blog
      </button>
      </div>
      <div className='text-center p-4 my-4'>
      Welcome to Agora, your space for inspiration and thoughtful conversations. Here, we dive into a world of ideas, stories, and insights that aim to spark curiosity and foster connection. Whether you're seeking in-depth analyses or casual musings, Agora is the place where words come to life. Join us in exploring diverse perspectives and sharing your own voice, as we build a community centered around creativity, knowledge, and expression.
      </div>
      <div className='p-4 my-2'>
        <h2 className='md:text-3xl sm:text-xl font-bold text-[#3bf8eb]'> RECENT BLOGS </h2>
      </div>
    </div>
  );
};

export default Home;
