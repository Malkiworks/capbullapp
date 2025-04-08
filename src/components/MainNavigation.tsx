import React, { useState } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

const MainNavigation: React.FC = () => {
  const { data: session } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="bg-gray-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-xl font-bold">
                CapitalBulls
              </Link>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:ml-6 md:flex md:space-x-4">
              <Link href="/dashboard" className="px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-gray-700 hover:text-white">
                Dashboard
              </Link>
              <Link href="/livestreams" className="px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-gray-700 hover:text-white">
                Live Streams
              </Link>
              <Link href="/content" className="px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-gray-700 hover:text-white">
                Exclusive Content
              </Link>
              
              {/* External Links */}
              <a href={process.env.NEXT_PUBLIC_DISCORD_URL} target="_blank" rel="noopener noreferrer" className="px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-gray-700 hover:text-white">
                Discord
              </a>
              <a href={process.env.NEXT_PUBLIC_WEBSITE_URL} target="_blank" rel="noopener noreferrer" className="px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-gray-700 hover:text-white">
                Official Website
              </a>
            </div>
          </div>
          
          {/* User Profile Section */}
          <div className="hidden md:flex items-center">
            {session ? (
              <div className="flex items-center space-x-4">
                <Link href="/profile" className="flex items-center">
                  <span className="text-sm mr-2">{session.user.name}</span>
                  <div className="rounded-full bg-gray-700 p-0.5 border border-blue-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                </Link>
                
                <button
                  onClick={() => signOut()}
                  className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-sm rounded-md transition"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/login" className="px-3 py-1.5 border border-gray-600 hover:border-white text-white text-sm rounded-md transition">
                  Log in
                </Link>
                <Link href="/register" className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-md transition">
                  Register
                </Link>
              </div>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={toggleMobileMenu}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, toggle based on menu state */}
      <div className={`${mobileMenuOpen ? 'block' : 'hidden'} md:hidden`} id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1 border-t border-gray-700">
          <Link href="/dashboard" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700 hover:text-white">
            Dashboard
          </Link>
          <Link href="/livestreams" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700 hover:text-white">
            Live Streams
          </Link>
          <Link href="/content" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700 hover:text-white">
            Exclusive Content
          </Link>
          
          {/* External Links */}
          <a href={process.env.NEXT_PUBLIC_DISCORD_URL} target="_blank" rel="noopener noreferrer" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700 hover:text-white">
            Discord
          </a>
          <a href={process.env.NEXT_PUBLIC_WEBSITE_URL} target="_blank" rel="noopener noreferrer" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700 hover:text-white">
            Official Website
          </a>
          
          {/* User section */}
          {session ? (
            <>
              <Link href="/profile" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700 hover:text-white">
                Profile
              </Link>
              <button
                onClick={() => signOut()}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-white hover:bg-red-700 hover:text-white"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700 hover:text-white">
                Log in
              </Link>
              <Link href="/register" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700 hover:text-white">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default MainNavigation; 