import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Menu, Bell, Sun, Moon, X } from 'lucide-react';
import { useThemeStore } from '../stores/themeStore';

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { isDarkMode, toggleDarkMode } = useThemeStore();

  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/') return 'Dashboard';
    return path.slice(1).charAt(0).toUpperCase() + path.slice(2);
  };

  return (
    <header className={`sticky top-0 z-10 ${
      isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
    } border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} shadow-sm`}>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center md:hidden">
              <button
                type="button"
                className="p-2 rounded-md"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
            <div className="hidden md:ml-6 md:flex md:items-center">
              <h1 className="text-xl font-semibold">{getPageTitle()}</h1>
            </div>
          </div>
          <div className="flex items-center">
            <button
              type="button"
              className="p-2 rounded-md text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none"
              onClick={toggleDarkMode}
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <button
              type="button"
              className="ml-3 p-2 rounded-md text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none relative"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className={`pt-2 pb-3 space-y-1 ${
            isDarkMode ? 'bg-gray-800' : 'bg-white'
          }`}>
            <a 
              href="/" 
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                location.pathname === '/' 
                  ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-200' 
                  : ''
              }`}
            >
              Dashboard
            </a>
            <a 
              href="/trends" 
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                location.pathname === '/trends' 
                  ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-200' 
                  : ''
              }`}
            >
              Trends
            </a>
            <a 
              href="/content" 
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                location.pathname === '/content' 
                  ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-200' 
                  : ''
              }`}
            >
              Content
            </a>
            <a 
              href="/video" 
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                location.pathname === '/video' 
                  ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-200' 
                  : ''
              }`}
            >
              Video
            </a>
            <a 
              href="/analytics" 
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                location.pathname === '/analytics' 
                  ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-200' 
                  : ''
              }`}
            >
              Analytics
            </a>
            <a 
              href="/settings" 
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                location.pathname === '/settings' 
                  ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-200' 
                  : ''
              }`}
            >
              Settings
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;