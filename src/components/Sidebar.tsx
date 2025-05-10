import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LineChart, 
  TrendingUp, 
  FileText, 
  Film, 
  BarChart2, 
  Settings,
  LayoutDashboard
} from 'lucide-react';
import { useThemeStore } from '../stores/themeStore';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const { isDarkMode } = useThemeStore();
  
  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Trends', path: '/trends', icon: TrendingUp },
    { name: 'Content', path: '/content', icon: FileText },
    { name: 'Video', path: '/video', icon: Film },
    { name: 'Analytics', path: '/analytics', icon: BarChart2 },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <div className={`hidden md:flex md:flex-col md:w-64 md:fixed md:inset-y-0 ${
      isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
    } border-r ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
      <div className="flex items-center justify-center h-16 px-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-2">
          <LineChart className="h-8 w-8 text-blue-500" />
          <span className="text-xl font-bold">TrendMonitor</span>
        </div>
      </div>
      <div className="flex-1 flex flex-col overflow-y-auto pt-5 pb-4">
        <nav className="mt-5 flex-1 px-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`group flex items-center px-4 py-3 text-sm font-medium rounded-md transition-all duration-200 ${
                  isActive 
                    ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-200' 
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <Icon className={`mr-3 h-5 w-5 transition-colors ${
                  isActive 
                    ? 'text-blue-500 dark:text-blue-400' 
                    : 'text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300'
                }`} />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className={`p-4 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
            A
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium">Admin User</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">admin@example.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;