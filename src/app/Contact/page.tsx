'use client';

import React, { useState, useEffect } from 'react';
import { FaPhone, FaEnvelope, FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const handleChange = (e: { target: { name: string; value: string; }; }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/sendEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to send email');
      }

      setSubmitStatus('success');
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsLoading(false);
    }

    // Reset form fields after submission (optional)
    setFormData({
      name: '',
      email: '',
      message: ''
    });

    // Clear submit status after a few seconds
    setTimeout(() => {
      setSubmitStatus('');
    }, 10000);
  };

  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const handleThemeChange = (event: MediaQueryListEvent) => {
      setIsDarkMode(event.matches);
    };

    setIsDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', handleThemeChange);

    return () => {
      window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', handleThemeChange);
    };
  }, []);

  return (
    <div className={`bg-${isDarkMode ? 'gray-900' : 'white'} text-${isDarkMode ? 'white' : 'black'} min-h-screen py-16 px-4`} style={{ width: '100vw' }}>
      <div className="max-w-7xl mx-auto pt-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg sm:text-xl mb-8">
            Have questions? Drop us a message or contact us through other means!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className={`mt-1 block w-full px-3 py-2 border border-${isDarkMode ? 'gray-300' : 'gray-800'} bg-${isDarkMode ? 'gray-800' : 'white'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-${isDarkMode ? 'white' : 'black'}`}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className={`mt-1 block w-full px-3 py-2 border border-${isDarkMode ? 'gray-300' : 'gray-800'} bg-${isDarkMode ? 'gray-800' : 'white'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-${isDarkMode ? 'white' : 'black'}`}
              />
            </div>

            <div className="mb-6">
              <label htmlFor="message" className="block text-sm font-medium">Message</label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                required
                className={`mt-1 block w-full px-3 py-2 border border-${isDarkMode ? 'gray-300' : 'gray-800'} bg-${isDarkMode ? 'gray-800' : 'white'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-${isDarkMode ? 'white' : 'black'}`}
              />
            </div>

            <button
              type="submit"
              className={`bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? 'Loading...' : 'Submit'}
            </button>
          </form>

          <div className="flex flex-col items-center md:items-start">
            <div className="mb-4">
              <p className="text-lg font-semibold">Other Ways to Contact Us:</p>
            </div>
            <div className="flex items-center mb-2">
              <FaPhone className="text-gray-400 mr-2" />
              <p className="text-sm lg:text-base">+1 (123) 456-7890</p>
            </div>
            <div className="flex items-center mb-2">
              <FaEnvelope className="text-gray-400 mr-2" />
              <p className="text-sm lg:text-base">contact@eaglesring.com</p>
            </div>
            <div className="flex items-center mb-2">
              <a href="https://www.facebook.com/eaglesring" target="_blank" rel="noopener noreferrer" className={`flex items-center text-${isDarkMode ? 'white' : 'black'} hover:text-gray-400 transition duration-300`}>
                <FaFacebook className="text-2xl mr-2" />
                <span>Facebook</span>
              </a>
            </div>
            <div className="flex items-center mb-2">
              <a href="https://twitter.com/eaglesring" target="_blank" rel="noopener noreferrer" className={`flex items-center text-${isDarkMode ? 'white' : 'black'} hover:text-gray-400 transition duration-300`}>
                <FaTwitter className="text-2xl mr-2" />
                <span>Twitter</span>
              </a>
            </div>
            <div className="flex items-center mb-2">
              <a href="https://www.linkedin.com/company/eaglesring" target="_blank" rel="noopener noreferrer" className={`flex items-center text-${isDarkMode ? 'white' : 'black'} hover:text-gray-400 transition duration-300`}>
                <FaLinkedin className="text-2xl mr-2" />
                <span>LinkedIn</span>
              </a>
            </div>
            {/* Add more contact methods as needed */}
          </div>
        </div>

        {submitStatus && (
          <div className="mt-8 text-center">
            <p className={`text-lg ${submitStatus === 'success' ? 'text-green-500' : 'text-red-500'}`}>
              {submitStatus === 'success' ? 'Email sent successfully!' : 'Failed to send email. Please try again.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactPage;
