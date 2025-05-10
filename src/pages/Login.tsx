import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LineChart, Eye, EyeOff } from 'lucide-react';
import { useThemeStore } from '../stores/themeStore';

const Login: React.FC = () => {
  const { isDarkMode } = useThemeStore();
  const navigate = useNavigate();
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <div className={`min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <div className={`max-w-md w-full mx-4 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg overflow-hidden`}>
        <div className={`p-4 ${isDarkMode ? 'bg-gray-700' : 'bg-blue-500'}`}>
          <div className="flex items-center justify-center">
            <LineChart className={`h-10 w-10 ${isDarkMode ? 'text-blue-400' : 'text-white'}`} />
            <h1 className={`ml-2 text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-white'}`}>TrendMonitor</h1>
          </div>
        </div>
        
        <div className="p-6">
          <h2 className="text-xl font-semibold text-center mb-6">Login to your account</h2>
          
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label 
                htmlFor="email" 
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Email Address
              </label>
              <input 
                type="email" 
                id="email"
                className={`w-full px-3 py-2 rounded-md border ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-800'
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="Enter your email"
                defaultValue="admin@example.com"
                required
              />
            </div>
            
            <div className="mb-6">
              <label 
                htmlFor="password" 
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Password
              </label>
              <div className="relative">
                <input 
                  type="password" 
                  id="password"
                  className={`w-full px-3 py-2 rounded-md border ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-800'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="Enter your password"
                  defaultValue="password"
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <Eye className="h-5 w-5 text-gray-400" />
                </button>
              </div>
              <div className="flex justify-between mt-1">
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="remember" 
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" 
                  />
                  <label htmlFor="remember" className="ml-2 block text-sm text-gray-500 dark:text-gray-400">
                    Remember me
                  </label>
                </div>
                <a href="#" className="text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400">
                  Forgot password?
                </a>
              </div>
            </div>
            
            <button
              type="submit"
              className="w-full py-2 px-4 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors"
            >
              Sign In
            </button>
          </form>
          
          <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
            Don't have an account?{' '}
            <a href="#" className="text-blue-600 hover:text-blue-500 dark:text-blue-400 font-medium">
              Sign up
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;