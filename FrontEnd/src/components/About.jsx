import React from 'react';

const About = () => {
  return (
    <div>
      <div className='flex items-center justify-center p-10 flex-col'>

        <div className="text-center px-4">
          <h2 className="font-mono font-extrabold text-4xl md:text-5xl my-5">
            ABOUT US
          </h2>
          <p className="mt-3 text-lg md:text-xl text-[#C5C6C7] leading-relaxed">
            Welcome to Agora Blog, your go-to platform for sharing ideas, experiences, and stories. We are committed to empowering writers, readers, and creators with a seamless and engaging platform to express themselves and connect with others worldwide.
          </p>
          <hr className="w-2/3 mx-auto border-t-2 border-[#3bf8eb] my-4" />
        </div>

        <div className="text-center px-6 md:px-12 lg:px-24">
          <h3 className="font-mono font-bold text-2xl md:text-3xl my-4 text-[#3bf8eb]">
            Our Mission
          </h3>
          <p className="text-lg leading-relaxed text-[#C5C6C7]">
            At Agora Blog, our mission is to build a thriving community where creativity, learning, and inspiration come together. We aim to provide a platform that is intuitive, feature-rich, and supportive of diverse voices.
          </p>
        </div>

        <div className="text-center px-6 md:px-12 lg:px-24 mt-12">
          <h3 className="font-mono font-bold text-2xl md:text-3xl my-4 text-[#3bf8eb]">
            Our Values
          </h3>
          <ul className="text-lg leading-relaxed text-[#C5C6C7] list-disc pl-8">
            <li><strong>Creativity:</strong> Encouraging original thought and innovation in every post and feature we develop.</li>
            <li><strong>Integrity:</strong> Fostering trust and respect by maintaining transparent and ethical practices.</li>
            <li><strong>Community:</strong> Building a supportive space where everyone feels valued and heard.</li>
            <li><strong>Quality:</strong> Delivering exceptional tools and resources to enhance the blogging experience.</li>
          </ul>
        </div>

        <div className="text-center px-6 md:px-12 lg:px-24 mt-12">
          <h3 className="font-mono font-bold text-2xl md:text-3xl my-4 text-[#3bf8eb]">
            Privacy and Security
          </h3>
          <p className="text-lg leading-relaxed text-[#C5C6C7]">
            We value your trust and prioritize your privacy. All user data is handled with utmost care and protected by robust security measures. Our policies are designed to ensure transparency and provide you with full control over your information.
          </p>
        </div>

        <div className="text-center px-6 md:px-12 lg:px-24 mt-12">
          <h3 className="font-mono font-bold text-2xl md:text-3xl my-4 text-[#3bf8eb]">
            Why Choose Agora Blog?
          </h3>
          <ul className="text-lg leading-relaxed text-[#C5C6C7] list-disc pl-8">
            <li><strong>User-Friendly:</strong> Easy-to-use tools for both beginners and seasoned bloggers.</li>
            <li><strong>Customizable:</strong> Tailor your blog to reflect your personal style with our design options.</li>
            <li><strong>Community Engagement:</strong> Built-in features to connect with readers and fellow bloggers.</li>
            <li><strong>Responsive Support:</strong> Dedicated assistance whenever you need it.</li>
          </ul>
        </div>

        <div className="text-center px-6 md:px-12 lg:px-24 mt-12">
          <h3 className="font-mono font-bold text-2xl md:text-3xl my-4 text-[#3bf8eb]">
            Join Us
          </h3>
          <p className="text-lg leading-relaxed text-[#C5C6C7]">
            Whether you're a writer looking for an outlet, a reader seeking inspiration, or a business aiming to connect, Agora Blog is here to help you thrive. Join our community today and start making an impact.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
