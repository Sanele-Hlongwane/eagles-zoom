'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const TermsAndConditions = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const handleThemeChange = (event) => {
      setIsDarkMode(event.matches);
    };

    setIsDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', handleThemeChange);

    return () => {
      window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', handleThemeChange);
    };
  }, []);

  const handleResize = () => {
    // Adjustments for mobile view if needed
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={`bg-${isDarkMode ? 'gray-900' : 'gray-100'} text-${isDarkMode ? 'white' : 'black'} py-24 ${isDarkMode ? 'dark' : ''}`} style={{ width: '100vw' }}>
      {/* Navigation Section */}
      <nav className={`bg-${isDarkMode ? 'gray-800' : 'white'} backdrop-blur-lg shadow-lg fixed top-0 left-0 right-0 z-50`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="flex items-center space-x-2 cursor-pointer">
                  <Image src="/EaglesRingLogo.png" alt="Eagles Ring Logo" width={40} height={40} />
                </div>
              </div>
              <div className="hidden sm:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <a href="/" className={`text-${isDarkMode ? 'gray-300' : 'gray-800'} transition-colors duration-300 hover:text-yellow-500`}>Home</a>
                  <a href="/about" className={`text-${isDarkMode ? 'gray-300' : 'gray-800'} transition-colors duration-300 hover:text-yellow-500`}>About</a>
                  <a href="/services" className={`text-${isDarkMode ? 'gray-300' : 'gray-800'} transition-colors duration-300 hover:text-yellow-500`}>Services</a>
                  <a href="/contact" className={`text-${isDarkMode ? 'gray-300' : 'gray-800'} transition-colors duration-300 hover:text-yellow-500`}>Contact Us</a>
                  <a href="/terms" className={`text-${isDarkMode ? 'gray-300' : 'gray-800'} transition-colors duration-300 hover:text-yellow-500`}>Terms and Conditions</a>
                </div>
              </div>
            </div>
            <div className="hidden sm:block">
              <div className="ml-4 flex items-center md:ml-6">
                {/* Implement SignIn and User buttons here */}
              </div>
            </div>
            <div className="-mr-2 flex sm:hidden">
              <button
                // Implement menu button here
              >
                {/* Menu button SVG */}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Terms and Conditions Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="bg-white/30 backdrop-blur-lg shadow-lg rounded-lg p-8">
          <h1 className={`text-4xl lg:text-6xl font-bold mb-8 ${isDarkMode ? 'text-white' : 'text-black'}`}>Terms and Conditions</h1>

          {/* Section 1: Introduction */}
          <section className={`mb-8 ${isDarkMode ? 'text-gray-300' : 'text-gray-800'}`}>
            <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
            <p className="mb-4">Welcome to Eagles Ring. By accessing or using our application, you agree to comply with and be bound by these Terms and Conditions. Please read them carefully before using our services. If you do not agree with any part of these terms, you must not use our application.</p>
          </section>

          {/* Section 2: Definitions */}
          <section className={`mb-8 ${isDarkMode ? 'text-gray-300' : 'text-gray-800'}`}>
            <h2 className="text-2xl font-semibold mb-4">2. Definitions</h2>
            <ul className="list-disc list-inside mb-4">
              <li><span className="font-semibold">"Eagles Ring"</span> refers to the application and services provided by [Your Company Name].</li>
              <li><span className="font-semibold">"User"</span> refers to anyone who uses the Eagles Ring application.</li>
              <li><span className="font-semibold">"Entrepreneur"</span> refers to users who pitch their business models on Eagles Ring.</li>
              <li><span className="font-semibold">"Eagle"</span> refers to investors who review and potentially invest in business models on Eagles Ring.</li>
              <li><span className="font-semibold">"Content"</span> refers to all information, data, text, software, graphics, or other materials uploaded, downloaded, or appearing on the application.</li>
            </ul>
          </section>

          {/* Section 3: Eligibility */}
          <section className={`mb-8 ${isDarkMode ? 'text-gray-300' : 'text-gray-800'}`}>
            <h2 className="text-2xl font-semibold mb-4">3. Eligibility</h2>
            <p className="mb-4">To use Eagles Ring, you must:
              <ul className="list-disc list-inside mb-4">
                <li>Be at least 18 years old.</li>
                <li>Have the legal capacity to enter into binding contracts.</li>
                <li>Provide accurate, current, and complete information during the registration process.</li>
              </ul>
            </p>
          </section>

          {/* Section 4: User Account */}
          <section className={`mb-8 ${isDarkMode ? 'text-gray-300' : 'text-gray-800'}`}>
            <h2 className="text-2xl font-semibold mb-4">4. User Account</h2>
            <p className="mb-4">When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our service.</p>
          </section>

          {/* Section 5: User Responsibilities */}
          <section className={`mb-8 ${isDarkMode ? 'text-gray-300' : 'text-gray-800'}`}>
            <h2 className="text-2xl font-semibold mb-4">5. User Responsibilities</h2>
            <p className="mb-4">You are responsible for maintaining the confidentiality of your account and password, including but not limited to the restriction of access to your computer and/or account. You agree to accept responsibility for all activities or actions that occur under your account and/or password, whether your password is with our service or a third-party service. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.</p>
          </section>

          {/* Section 6: Content */}
          <section className={`mb-8 ${isDarkMode ? 'text-gray-300' : 'text-gray-800'}`}>
            <h2 className="text-2xl font-semibold mb-4">6. Content</h2>
            <p className="mb-4">Our application allows you to post, link, store, share, and otherwise make available certain information, text, graphics, videos, or other material. You are responsible for the content that you post on or through the service, including its legality, reliability, and appropriateness.</p>
          </section>

          {/* Section 7: Modifications */}
          <section className={`mb-8 ${isDarkMode ? 'text-gray-300' : 'text-gray-800'}`}>
            <h2 className="text-2xl font-semibold mb-4">7. Modifications</h2>
            <p className="mb-4">We reserve the right, at our sole discretion, to modify or replace these Terms and Conditions at any time. If a revision is material, we will try to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.</p>
          </section>

          {/* Section 8: Termination */}
          <section className={`mb-8 ${isDarkMode ? 'text-gray-300' : 'text-gray-800'}`}>
            <h2 className="text-2xl font-semibold mb-4">8. Termination</h2>
            <p className="mb-4">We may terminate or suspend your account and bar access to the service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.</p>
          </section>

          {/* Section 9: Governing Law */}
          <section className={`mb-8 ${isDarkMode ? 'text-gray-300' : 'text-gray-800'}`}>
            <h2 className="text-2xl font-semibold mb-4">9. Governing Law</h2>
            <p className="mb-4">These Terms shall be governed and construed in accordance with the laws of [Your Country], without regard to its conflict of law provisions.</p>
          </section>

          {/* Section 10: Contact Us */}
          <section className={`mb-8 ${isDarkMode ? 'text-gray-300' : 'text-gray-800'}`}>
            <h2 className="text-2xl font-semibold mb-4">10. Contact Us</h2>
            <p className="mb-4">If you have any questions about these Terms and Conditions, please contact us:</p>
            <ul className="list-disc list-inside mb-4">
              <li>Email: contact@eaglesring.com</li>
              <li>Phone: +1-123-456-7890</li>
              <li>Address: 123 Eagle Street, Eagleville, EAG 1234</li>
            </ul>
          </section>

          {/* Additional Sections can be added as needed */}
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
