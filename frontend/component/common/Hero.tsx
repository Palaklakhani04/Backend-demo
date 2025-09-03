// components/Hero.tsx
import Link from 'next/link';
import React from 'react';


const Hero = () => {
  return (
    <section className="grid place-items-center justify-center min-h-dvh bg-gradient-to-br from-blue-50 to-blue-100">
      
        <div className="max-w-4/5">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-700 mb-6">
            Streamline Your Leave Management
          </h1>
          <p className="text-lg text-gray-700 mb-8">
            Apply, track, and manage employee leaves effortlessly with our intuitive Leave Management System.
          </p>
          <div className="flex justify-start">
            <Link href="/login">
              <p className="bg-blue-800 text-white px-6 py-3 rounded-md shadow hover:bg-blue-600 transition duration-300">
                Apply for Leave
              </p>
            </Link>
          </div>
   
      </div>
    </section>
  );
};

export default Hero;
