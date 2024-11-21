import React, { useEffect, useRef } from 'react';
import Typed from 'typed.js';
import Blog from './Blog';

const Home = () => {
  const el = useRef(null);

  const blogs = [
    {
        writer: "John Doe",
        title: "Understanding JavaScript Closures",
        content: "JavaScript closures are one of the most powerful features of the language, allowing functions to retain access to their lexical environment even after the function that created them has finished execution. In this blog post, we'll dive deep into closures and their practical applications.",
        createdAt: new Date('2024-11-15T10:00:00Z')
    },
    {
        writer: "Alice Smith",
        title: "The Future of Web Development",
        content: "Web development has evolved rapidly in recent years, with the introduction of modern frameworks and tools. In this article, we discuss the future trends in web development, including the rise of AI, serverless architectures, and new JavaScript frameworks.",
        createdAt: new Date('2024-11-18T08:30:00Z')
    },
    {
        writer: "Michael Johnson",
        title: "A Beginner's Guide to React",
        content: "React has become one of the most popular JavaScript libraries for building user interfaces. This beginner's guide covers the fundamentals of React, including components, JSX, and state management, with simple examples to get started.",
        createdAt: new Date('2024-11-10T14:45:00Z')
    },
    {
        writer: "Sophia Lee",
        title: "CSS Grid vs Flexbox: Which One Should You Use?",
        content: "When building layouts for web pages, CSS Grid and Flexbox are two of the most commonly used tools. In this blog post, we compare CSS Grid and Flexbox to help you decide when to use each of these powerful layout techniques.",
        createdAt: new Date('2024-11-12T16:20:00Z')
    },
    {
        writer: "David Brown",
        title: "Introduction to Node.js for Backend Development",
        content: "Node.js has become one of the most popular backend technologies. In this blog, we will explore Node.js, its core modules, and how it helps developers build scalable server-side applications. We'll also cover some best practices and essential tools.",
        createdAt: new Date('2024-11-14T09:10:00Z')
    }
];

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
        <h1 className="text-4xl md:text-6xl sm:text-3xl font-bold text-[#3bf8eb]">
          <span ref={el} />
        </h1>
        <button className='p-2 border border-white rounded-xl bg-gray-900 my-11 hover:bg-gray-800 hover:border-2 transition-transform ease-in-out duration-200'>
          Create Your Own Blog
        </button>
      </div>
      <div className='text-center p-4 my-4'>
        Welcome to Agora, your space for inspiration and thoughtful conversations. Here, we dive into a world of ideas, stories, and insights that aim to spark curiosity and foster connection. Whether you're seeking in-depth analyses or casual musings, Agora is the place where words come to life. Join us in exploring diverse perspectives and sharing your own voice, as we build a community centered around creativity, knowledge, and expression.
      </div>
      <div className='p-4 my-2 '>
        <h2 className='md:text-3xl sm:text-xl font-bold text-[#3bf8eb]'> RECENT BLOGS </h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {blogs.length > 0 ? (
            blogs.map((blog, index) => (
              <div key={index} className='m-2 p-2'>
                <Blog name={blog.writer} title={blog.title} content={blog.content} date={blog.createdAt} />
              </div>
            ))
          ) : (
            <p>No blogs available at the moment.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
