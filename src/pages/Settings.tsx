import React, { useState } from 'react';
import { useThemeStore } from '../stores/themeStore';
import { 
  Settings as SettingsIcon, Key, User, Bell, Clock, Database, 
  Globe, Shield, Zap, Download, RefreshCw
} from 'lucide-react';

const Settings: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useThemeStore();
  const [activeTab, setActiveTab] = useState('account');
  const [isScrapingDocs, setIsScrapingDocs] = useState(false);
  
  const scrapeTikTokDocs = async () => {
    setIsScrapingDocs(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/tiktok-scraper`, {
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
      });
      
      const data = await response.json();
      console.log('Scraping completed:', data);
      
      // Add success notification here
    } catch (error) {
      console.error('Failed to scrape documentation:', error);
      // Add error notification here
    } finally {
      setIsScrapingDocs(false);
    }
  };

  const renderTabContent = () => {
    switch(activeTab) {
      case 'account':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold mb-6">Account Settings</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Full Name
                </label>
                <input 
                  type="text" 
                  className={`w-full px-4 py-2 rounded-md border ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-800'
                  }`}
                  defaultValue="Admin User"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Address
                </label>
                <input 
                  type="email" 
                  className={`w-full px-4 py-2 rounded-md border ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-800'
                  }`}
                  defaultValue="admin@example.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Profile Picture
                </label>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                    A
                  </div>
                  <button className={`px-3 py-1.5 text-sm rounded-md border ${
                    isDarkMode 
                      ? 'border-gray-600 hover:bg-gray-700' 
                      : 'border-gray-300 hover:bg-gray-100'
                  }`}>
                    Change
                  </button>
                </div>
              </div>
              
              <div className="pt-4">
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        );
      case 'appearance':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold mb-6">Appearance Settings</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Theme
                </label>
                <div className="flex items-center space-x-4">
                  <button 
                    onClick={() => toggleDarkMode()}
                    className={`flex-1 py-3 px-4 rounded-md border text-center ${
                      !isDarkMode 
                        ? 'bg-blue-100 border-blue-500 text-blue-700 dark:bg-blue-900 dark:border-blue-400 dark:text-blue-200' 
                        : isDarkMode 
                          ? 'bg-gray-700 border-gray-600' 
                          : 'bg-white border-gray-300'
                    }`}
                  >
                    Light
                  </button>
                  <button 
                    onClick={() => toggleDarkMode()}
                    className={`flex-1 py-3 px-4 rounded-md border text-center ${
                      isDarkMode 
                        ? 'bg-blue-900 border-blue-700 text-blue-200' 
                        : 'bg-gray-100 border-gray-300'
                    }`}
                  >
                    Dark
                  </button>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Font Size
                </label>
                <select
                  className={`w-full px-4 py-2 rounded-md border ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-800'
                  }`}
                >
                  <option>Small</option>
                  <option selected>Medium</option>
                  <option>Large</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Dashboard Layout
                </label>
                <select
                  className={`w-full px-4 py-2 rounded-md border ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-800'
                  }`}
                >
                  <option>Compact</option>
                  <option selected>Standard</option>
                  <option>Expanded</option>
                </select>
              </div>
              
              <div className="pt-4">
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        );
      case 'api':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold mb-6">API Configuration</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  OpenAI API Key
                </label>
                <div className="flex">
                  <input 
                    type="password" 
                    className={`flex-1 px-4 py-2 rounded-l-md border ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-800'
                    }`}
                    value="sk-•••••••••••••••••••••••••••••"
                    readOnly
                  />
                  <button className={`px-4 py-2 rounded-r-md ${
                    isDarkMode 
                      ? 'bg-gray-600 hover:bg-gray-500 text-white' 
                      : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                  }`}>
                    Change
                  </button>
                </div>
                <p className="mt-1 text-sm text-green-500">Connected successfully</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  CREATIFY API Key
                </label>
                <div className="flex">
                  <input 
                    type="password" 
                    className={`flex-1 px-4 py-2 rounded-l-md border ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-800'
                    }`}
                    placeholder="Enter CREATIFY API key"
                  />
                  <button className={`px-4 py-2 rounded-r-md ${
                    isDarkMode 
                      ? 'bg-gray-600 hover:bg-gray-500 text-white' 
                      : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                  }`}>
                    Add
                  </button>
                </div>
                <p className="mt-1 text-sm text-red-500">Not connected</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Hailuo API Key
                </label>
                <div className="flex">
                  <input 
                    type="password" 
                    className={`flex-1 px-4 py-2 rounded-l-md border ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-800'
                    }`}
                    value="hailuo-•••••••••••••••••••••••••••••"
                    readOnly
                  />
                  <button className={`px-4 py-2 rounded-r-md ${
                    isDarkMode 
                      ? 'bg-gray-600 hover:bg-gray-500 text-white' 
                      : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                  }`}>
                    Change
                  </button>
                </div>
                <p className="mt-1 text-sm text-green-500">Connected successfully</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  TikTok API Authorization
                </label>
                <button className={`px-4 py-2 rounded-md ${
                  isDarkMode 
                    ? 'bg-blue-900 hover:bg-blue-800 text-white' 
                    : 'bg-blue-100 hover:bg-blue-200 text-blue-700'
                }`}>
                  Authorize TikTok Account
                </button>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Required for automated posting and analytics
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  TikTok Documentation
                </label>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={scrapeTikTokDocs}
                    disabled={isScrapingDocs}
                    className={`flex items-center px-4 py-2 rounded-md ${
                      isScrapingDocs
                        ? 'bg-gray-400 cursor-not-allowed'
                        : isDarkMode
                          ? 'bg-blue-600 hover:bg-blue-700'
                          : 'bg-blue-500 hover:bg-blue-600'
                    } text-white`}
                  >
                    {isScrapingDocs ? (
                      <>
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                        Scraping...
                      </>
                    ) : (
                      <>
                        <Download className="h-4 w-4 mr-2" />
                        Update Documentation
                      </>
                    )}
                  </button>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Last updated: Never
                  </p>
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  Downloads and indexes all TikTok Business Center documentation for AI agents
                </p>
              </div>
              
              <div className="pt-4">
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md">
                  Save API Keys
                </button>
              </div>
            </div>
          </div>
        );
      case 'agents':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold mb-6">Agent Configuration</h2>
            
            <div className={`p-4 border rounded-md ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                  <h3 className="font-medium">TrendAgent</h3>
                </div>
                <div className="flex items-center">
                  <div className={`relative inline-block w-10 mr-2 align-middle ${
                    isDarkMode ? 'select-none' : 'select-none'
                  }`}>
                    <input type="checkbox" id="trend-agent" className="sr-only" defaultChecked />
                    <label
                      htmlFor="trend-agent"
                      className={`block overflow-hidden h-6 rounded-full cursor-pointer ${
                        isDarkMode ? 'bg-gray-700' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`block h-6 w-6 rounded-full transform transition-transform 
                          bg-white border-2 ${isDarkMode ? 'border-gray-700' : 'border-gray-300'} 
                          translate-x-4`
                        }
                      ></span>
                    </label>
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">Active</span>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                    Scan Frequency
                  </label>
                  <select
                    className={`w-full px-3 py-2 text-sm rounded-md border ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-800'
                    }`}
                  >
                    <option>Every hour</option>
                    <option selected>Every 6 hours</option>
                    <option>Every 12 hours</option>
                    <option>Daily</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                    Sources
                  </label>
                  <div className="flex flex-wrap gap-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-700'
                    }`}>
                      TikTok
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-700'
                    }`}>
                      Reddit
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-700'
                    }`}>
                      Google Trends
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      isDarkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-700'
                    }`}>
                      + Add Source
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className={`p-4 border rounded-md ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                  <h3 className="font-medium">ContentAgent</h3>
                </div>
                <div className="flex items-center">
                  <div className={`relative inline-block w-10 mr-2 align-middle ${
                    isDarkMode ? 'select-none' : 'select-none'
                  }`}>
                    <input type="checkbox" id="content-agent" className="sr-only" defaultChecked />
                    <label
                      htmlFor="content-agent"
                      className={`block overflow-hidden h-6 rounded-full cursor-pointer ${
                        isDarkMode ? 'bg-gray-700' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`block h-6 w-6 rounded-full transform transition-transform 
                          bg-white border-2 ${isDarkMode ? 'border-gray-700' : 'border-gray-300'} 
                          translate-x-4`
                        }
                      ></span>
                    </label>
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">Active</span>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                    Generation Model
                  </label>
                  <select
                    className={`w-full px-3 py-2 text-sm rounded-md border ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-800'
                    }`}
                  >
                    <option>GPT-3.5 Turbo</option>
                    <option selected>GPT-4</option>
                    <option>Claude 3 Opus</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                    Content Style
                  </label>
                  <select
                    className={`w-full px-3 py-2 text-sm rounded-md border ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-800'
                    }`}
                  >
                    <option>Informative</option>
                    <option selected>Entertaining</option>
                    <option>Educational</option>
                    <option>Inspirational</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div className={`p-4 border rounded-md ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></div>
                  <h3 className="font-medium">VideoAgent</h3>
                </div>
                <div className="flex items-center">
                  <div className={`relative inline-block w-10 mr-2 align-middle ${
                    isDarkMode ? 'select-none' : 'select-none'
                  }`}>
                    <input type="checkbox" id="video-agent" className="sr-only" defaultChecked />
                    <label
                      htmlFor="video-agent"
                      className={`block overflow-hidden h-6 rounded-full cursor-pointer ${
                        isDarkMode ? 'bg-gray-700' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`block h-6 w-6 rounded-full transform transition-transform 
                          bg-white border-2 ${isDarkMode ? 'border-gray-700' : 'border-gray-300'} 
                          translate-x-4`
                        }
                      ></span>
                    </label>
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">Active</span>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                    Video Platform
                  </label>
                  <select
                    className={`w-full px-3 py-2 text-sm rounded-md border ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-800'
                    }`}
                  >
                    <option>CREATIFY</option>
                    <option selected>D-ID</option>
                    <option>Hailuo</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                    Quality
                  </label>
                  <select
                    className={`w-full px-3 py-2 text-sm rounded-md border ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-800'
                    }`}
                  >
                    <option>Standard (720p)</option>
                    <option selected>High (1080p)</option>
                    <option>Ultra (4K)</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div className="pt-4">
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md">
                Save Agent Configuration
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold">Settings</h1>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-sm`}>
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <SettingsIcon className="h-5 w-5 mr-2 text-blue-500" />
            Settings
          </h2>
          <nav className="space-y-1">
            <button
              onClick={() => setActiveTab('account')}
              className={`w-full flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
                activeTab === 'account'
                  ? isDarkMode 
                    ? 'bg-blue-900 text-blue-200' 
                    : 'bg-blue-100 text-blue-800'
                  : isDarkMode 
                    ? 'hover:bg-gray-700' 
                    : 'hover:bg-gray-100'
              }`}
            >
              <User className="h-4 w-4 mr-3" />
              Account
            </button>
            <button
              onClick={() => setActiveTab('appearance')}
              className={`w-full flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
                activeTab === 'appearance'
                  ? isDarkMode 
                    ? 'bg-blue-900 text-blue-200' 
                    : 'bg-blue-100 text-blue-800'
                  : isDarkMode 
                    ? 'hover:bg-gray-700' 
                    : 'hover:bg-gray-100'
              }`}
            >
              <Bell className="h-4 w-4 mr-3" />
              Appearance
            </button>
            <button
              onClick={() => setActiveTab('api')}
              className={`w-full flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
                activeTab === 'api'
                  ? isDarkMode 
                    ? 'bg-blue-900 text-blue-200' 
                    : 'bg-blue-100 text-blue-800'
                  : isDarkMode 
                    ? 'hover:bg-gray-700' 
                    : 'hover:bg-gray-100'
              }`}
            >
              <Key className="h-4 w-4 mr-3" />
              API Keys
            </button>
            <button
              onClick={() => setActiveTab('agents')}
              className={`w-full flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
                activeTab === 'agents'
                  ? isDarkMode 
                    ? 'bg-blue-900 text-blue-200' 
                    : 'bg-blue-100 text-blue-800'
                  : isDarkMode 
                    ? 'hover:bg-gray-700' 
                    : 'hover:bg-gray-100'
              }`}
            >
              <Zap className="h-4 w-4 mr-3" />
              Agents
            </button>
            <button
              onClick={() => setActiveTab('notifications')}
              className={`w-full flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
                activeTab === 'notifications'
                  ? isDarkMode 
                    ? 'bg-blue-900 text-blue-200' 
                    : 'bg-blue-100 text-blue-800'
                  : isDarkMode 
                    ? 'hover:bg-gray-700' 
                    : 'hover:bg-gray-100'
              }`}
            >
              <Bell className="h-4 w-4 mr-3" />
              Notifications
            </button>
            <button
              onClick={() => setActiveTab('schedule')}
              className={`w-full flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
                activeTab === 'schedule'
                  ? isDarkMode 
                    ? 'bg-blue-900 text-blue-200' 
                    : 'bg-blue-100 text-blue-800'
                  : isDarkMode 
                    ? 'hover:bg-gray-700' 
                    : 'hover:bg-gray-100'
              }`}
            >
              <Clock className="h-4 w-4 mr-3" />
              Schedule
            </button>
            <button
              onClick={() => setActiveTab('storage')}
              className={`w-full flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
                activeTab === 'storage'
                  ? isDarkMode 
                    ? 'bg-blue-900 text-blue-200' 
                    : 'bg-blue-100 text-blue-800'
                  : isDarkMode 
                    ? 'hover:bg-gray-700' 
                    : 'hover:bg-gray-100'
              }`}
            >
              <Database className="h-4 w-4 mr-3" />
              Storage
            </button>
            <button
              onClick={() => setActiveTab('privacy')}
              className={`w-full flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
                activeTab === 'privacy'
                  ? isDarkMode 
                    ? 'bg-blue-900 text-blue-200' 
                    : 'bg-blue-100 text-blue-800'
                  : isDarkMode 
                    ? 'hover:bg-gray-700' 
                    : 'hover:bg-gray-100'
              }`}
            >
              <Shield className="h-4 w-4 mr-3" />
              Privacy & Security
            </button>
            <button
              onClick={() => setActiveTab('language')}
              className={`w-full flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
                activeTab === 'language'
                  ? isDarkMode 
                    ? 'bg-blue-900 text-blue-200' 
                    : 'bg-blue-100 text-blue-800'
                  : isDarkMode 
                    ? 'hover:bg-gray-700' 
                    : 'hover:bg-gray-100'
              }`}
            >
              <Globe className="h-4 w-4 mr-3" />
              Language
            </button>
          </nav>
        </div>
        
        <div className={`lg:col-span-3 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-sm`}>
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default Settings;