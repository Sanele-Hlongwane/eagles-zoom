'use client';
import { useState } from 'react';
import Link from 'next/link';
import { HiMenu } from 'react-icons/hi';
import { MdClose } from 'react-icons/md';
import { SignInButton, SignUpButton, UserButton, SignedIn, SignedOut, SignOutButton } from '@clerk/nextjs';
import Image from 'next/image';

interface MenuItem {
  title: string;
  path: string;
}

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const menuItems: MenuItem[] = [
    { title: 'Home', path: '/' },
    { title: 'About', path: '/About' },
    { title: 'Services', path: '/Services' },
    { title: 'Contact', path: '/Contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full bg-black bg-opacity-75 text-white p-4 z-50 backdrop-filter backdrop-blur-lg">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-xl font-bold">
          <Link href="/">
            <div className="flex items-center space-x-2 cursor-pointer">
              <Image src="/Eagle.png" alt="Eagles Ring Logo" width={40} height={40} />
              <h1 className="text-yellow-500 hover:text-yellow-400 text-2xl font-bold transition-colors duration-300">
                Eagles Ring
              </h1>
            </div>
          </Link>
        </div>
        <div className="lg:hidden">
          <button onClick={toggleMenu}>
            {isOpen ? <MdClose size={24} /> : <HiMenu size={24} />}
          </button>
        </div>
        <ul
          className={`lg:flex lg:items-center lg:space-x-6 absolute lg:relative top-16 left-0 w-full lg:w-auto lg:top-0 lg:flex-row flex-col bg-black text-white p-4 z-50 backdrop-filter backdrop-blur-lg transition-all duration-300 ease-in-out ${
            isOpen ? 'block' : 'hidden'
          }`}
        >
          {menuItems.map((item, index) => (
            <li key={index} className="relative p-4 lg:p-0">
              <Link href={item.path}>
                <p className="block lg:inline-block text-lg lg:text-base relative group" onClick={() => setIsOpen(false)}>
                  {item.title}
                  <span className="absolute left-0 right-0 h-1 bg-white bottom-0 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
                </p>
              </Link>
            </li>
          ))}
          <SignedOut>
            <li className="relative p-4 lg:p-0">
              <div className="text-lg lg:text-base text-white group hover:text-blue-500 cursor-pointer">
                <SignInButton />
              </div>
            </li>
            <li className="relative p-4 lg:p-0">
              <div className="text-lg lg:text-base text-white group hover:text-blue-500 cursor-pointer">
                <SignUpButton />
              </div>
            </li>
          </SignedOut>
          <SignedIn>
            <li className="relative p-4 lg:p-0">
              <Link href="/notifications">
                <p className="block lg:inline-block text-lg lg:text-base relative group">
                  Notifications
                  <span className="absolute left-0 right-0 h-1 bg-white bottom-0 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
                </p>
              </Link>
            </li>
            <li className="relative p-4 lg:p-0">
              <Link href="/messages">
                <p className="block lg:inline-block text-lg lg:text-base relative group">
                  Messages
                  <span className="absolute left-0 right-0 h-1 bg-white bottom-0 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
                </p>
              </Link>
            </li>
            <li className="relative p-4 lg:p-0">
              <Link href="/Profile">
                <p className="block lg:inline-block text-lg lg:text-base relative group">
                  Profile
                  <span className="absolute left-0 right-0 h-1 bg-white bottom-0 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
                </p>
              </Link>
            </li>
            <li className="relative p-4 lg:p-0">
              <div className="text-lg lg:text-base text-white group hover:text-blue-500 cursor-pointer">
                <SignOutButton />
              </div>
            </li>
            <li className="relative p-4 lg:p-0">
              <div className="text-lg lg:text-base text-white group hover:text-blue-500 cursor-pointer">
                <UserButton />
              </div>
            </li>
          </SignedIn>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
