'use client';
import React from "react";
import Link from "next/link";
import { SignInButton, UserButton, SignedIn, SignedOut } from '@clerk/nextjs';
import Image from 'next/image';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = [
    { name: "Home", link: "/" },
    { name: "About", link: "/About" },
    { name: "Services", link: "/Services" },
    { name: "Contact Us", link: "/Contact" },
    { name: "Meetings", link: "/video-call" },
  ];

  const handleMenuItemClick = () => {
    setIsMenuOpen(false);
  };

  React.useEffect(() => {
    // Lock body scroll when menu is open
    if (isMenuOpen) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
  }, [isMenuOpen]);

  return (
    <>
      <nav className="bg-white/30 backdrop-blur-lg shadow-lg fixed top-0 left-0 right-0 z-50">
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
                  {menuItems.map((item, index) => (
                    <Link key={index} href={item.link} passHref>
                      <p className="text-gray-800 transition-colors duration-300 hover:text-yellow-500">{item.name}</p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <div className="hidden sm:block">
              <div className="ml-4 flex items-center md:ml-6 space-x-4">
                <SignedOut>
                  <div className="text-black hover:text-yellow-500 cursor-pointer">
                    <SignInButton />
                  </div>
                </SignedOut>
                <SignedIn>
                  <UserButton />
                </SignedIn>
              </div>
            </div>
            <div className="-mr-2 flex sm:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                type="button"
                className="bg-gray-900 text-gray-300 hover:text-white hover:bg-gray-800 inline-flex items-center justify-center p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white transition duration-300"
                aria-controls="mobile-menu"
                aria-expanded={isMenuOpen}
              >
                <span className="sr-only">Open main menu</span>
                {!isMenuOpen ? (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16m-7 6h7"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        <div className={`${isMenuOpen ? "block" : "hidden"} sm:hidden`} id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {menuItems.map((item, index) => (
              <Link key={index} href={item.link} passHref>
                <p onClick={handleMenuItemClick} className="text-gray-800 block px-3 py-2 rounded-md text-base font-medium hover:text-yellow-500">{item.name}</p>
              </Link>
            ))}
            <SignedOut>
              <div onClick={handleMenuItemClick} className="text-black hover:text-yellow-500 block px-3 py-2 rounded-md text-base font-medium cursor-pointer">
                <SignInButton />
              </div>
            </SignedOut>
            <SignedIn>
              <div onClick={handleMenuItemClick} className="block px-3 py-2 rounded-md text-base font-medium cursor-pointer">
                <UserButton />
              </div>
            </SignedIn>
          </div>
        </div>
      </nav>

      {/* Main content wrapper */}
      <div className={`${isMenuOpen ? "overflow-y-hidden" : ""}`}>
        {/* Your main content goes here */}
      </div>
    </>
  );
}
