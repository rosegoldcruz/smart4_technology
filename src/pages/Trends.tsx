import React, { useState } from 'react';
import { Search, Filter, TrendingUp } from 'lucide-react';
import { useThemeStore } from '../stores/themeStore';

const Trends: React.FC = () => {
  const { isDarkMode } = useThemeStore();
  const [activeTab, setActiveTab] = useState('tiktok');
  
  // Mock data for trends
  const trendingData = [
    { 
      id: 1, 
      platform: 'tiktok',
      title: '#MorningRoutine', 
      category: 'Lifestyle',
      velocity: 85,
      views: '12.4M',
      engagement: '8.2%',
      notes: 'Morning productivity routines are gaining traction with professionals and students.'
    },
    { 
      id: 2, 
      platform: 'tiktok',
      title: 'Dance Challenge', 
      category: 'Entertainment',
      velocity: 92,
      views: '28.7M',
      engagement: '10.5%',
      notes: 'New viral dance to "Summer Feelings" song, originated from creator @dancepro.'
    },
    { 
      id: 3, 
      platform: 'tiktok',
      title: 'Quick Recipes', 
      category: 'Food',
      velocity: 78,
      views: '8.9M',
      engagement: '7.8%',
      notes: '60-second recipe videos showing easy meal prep for busy people.'
    },
    { 
      id: 4, 
      platform: 'reddit',
      title: 'Tech Gadget Reviews', 
      category: 'Technology',
      velocity: 72,
      views: '5.2M',
      engagement: '6.9%',
      notes: 'Honest reviews of latest consumer tech products with focus on usability.'
    },
    { 
      id: 5, 
      platform: 'reddit',
      title: 'Personal Finance Tips', 
      category: 'Finance',
      velocity: 68,
      views: '3.8M',
      engagement: '8.7%',
      notes: 'Investment strategies for beginners gaining significant traction.'
    },
    { 
      id: 6, 
      platform: 'web',
      title: 'Sustainable Living', 
      category: 'Lifestyle',
      velocity: 63,
      views: '2.7M',
      engagement: '5.2%',
      notes: 'Zero-waste lifestyle content showing practical everyday sustainability tips.'
    },
  ];
  
  const filteredTrends = trendingData.filter(trend => trend.platform === activeTab);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold">Trend Monitor</h1>
        <div className="flex items-center space-x-2">
          <div className={`relative flex items-center ${isDarkMode ? 'text-gray-200' : 'text-gray-600'}`}>
            <Search className="absolute left-3 h-5 w-5" />
            <input
              type="text"
              placeholder="Search trends..."
              className={`pl-10 pr-4 py-2 rounded-lg border ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600 focus:border-blue-500' 
                  : 'bg-white border-gray-300 focus:border-blue-500'
              } focus:outline-none focus:ring-1 focus:ring-blue-500`}
            />
          </div>
          <button className={`flex items-center px-4 py-2 rounded-lg border ${
            isDarkMode 
              ? 'bg-gray-700 border-gray-600 hover:bg-gray-600' 
              : 'bg-white border-gray-300 hover:bg-gray-100'
          }`}>
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </button>
        </div>
      </div>
      
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex space-x-6">
          <button
            onClick={() => setActiveTab('tiktok')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'tiktok'
                ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-500 hover:border-gray-300 dark:text-gray-400 dark:hover:border-gray-500'
            }`}
          >
            TikTok
          </button>
          <button
            onClick={() => setActiveTab('reddit')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'reddit'
                ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-500 hover:border-gray-300 dark:text-gray-400 dark:hover:border-gray-500'
            }`}
          >
            Reddit
          </button>
          <button
            onClick={() => setActiveTab('web')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'web'
                ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-500 hover:border-gray-300 dark:text-gray-400 dark:hover:border-gray-500'
            }`}
          >
            Web
          </button>
        </nav>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredTrends.map((trend) => (
          <div 
            key={trend.id} 
            className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow`}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-lg">{trend.title}</h3>
                <div className="flex items-center mt-2">
                  <span className={`px-2 py-0.5 text-xs rounded-full ${
                    trend.category === 'Lifestyle' 
                      ? isDarkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800'
                      : trend.category === 'Entertainment'
                      ? isDarkMode ? 'bg-purple-900 text-purple-200' : 'bg-purple-100 text-purple-800'
                      : trend.category === 'Food'
                      ? isDarkMode ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-800'
                      : trend.category === 'Technology'
                      ? isDarkMode ? 'bg-indigo-900 text-indigo-200' : 'bg-indigo-100 text-indigo-800'
                      : isDarkMode ? 'bg-orange-900 text-orange-200' : 'bg-orange-100 text-orange-800'
                  }`}>
                    {trend.category}
                  </span>
                </div>
              </div>
              <div className={`flex items-center px-3 py-1 rounded-full ${
                trend.velocity > 80 
                  ? isDarkMode ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-800'
                  : trend.velocity > 70
                  ? isDarkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800'
                  : isDarkMode ? 'bg-orange-900 text-orange-200' : 'bg-orange-100 text-orange-800'
              }`}>
                <TrendingUp className="h-4 w-4 mr-1" />
                <span className="text-sm font-medium">{trend.velocity} Score</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <p className="text-sm text-gray-500 dark:text-gray-400">Views</p>
                <p className="font-bold text-lg">{trend.views}</p>
              </div>
              <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <p className="text-sm text-gray-500 dark:text-gray-400">Engagement</p>
                <p className="font-bold text-lg">{trend.engagement}</p>
              </div>
            </div>
            
            <div className="mt-4">
              <h4 className="font-medium mb-2">Notes</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">{trend.notes}</p>
            </div>
            
            <div className="mt-4 flex justify-end">
              <button className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium">
                Generate Content Idea →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trends;