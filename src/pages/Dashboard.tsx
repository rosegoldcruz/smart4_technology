import React from 'react';
import { BarChart, LineChart, PieChart, Activity, TrendingUp, Users, DollarSign } from 'lucide-react';
import { useThemeStore } from '../stores/themeStore';
import TrendingTopicCard from '../components/dashboard/TrendingTopicCard';
import DashboardStat from '../components/dashboard/DashboardStat';
import PerformanceChart from '../components/dashboard/PerformanceChart';

const Dashboard: React.FC = () => {
  const { isDarkMode } = useThemeStore();

  const trendingTopics = [
    { id: 1, topic: 'Dance Challenge', growth: 128, category: 'Entertainment' },
    { id: 2, topic: 'Morning Routine', growth: 85, category: 'Lifestyle' },
    { id: 3, topic: 'Cooking Hack', growth: 67, category: 'Food' },
    { id: 4, topic: 'Pet Humor', growth: 54, category: 'Pets' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardStat 
          title="Total Videos"
          value="12"
          change="+2"
          isPositive={true}
          icon={<BarChart className="w-5 h-5 text-purple-500" />}
          color="purple"
        />
        <DashboardStat 
          title="Trend Score"
          value="86"
          change="+12"
          isPositive={true}
          icon={<TrendingUp className="w-5 h-5 text-blue-500" />}
          color="blue"
        />
        <DashboardStat 
          title="Followers"
          value="143"
          change="+28"
          isPositive={true}
          icon={<Users className="w-5 h-5 text-green-500" />}
          color="green"
        />
        <DashboardStat 
          title="Revenue"
          value="$0"
          change="$0"
          isPositive={false}
          icon={<DollarSign className="w-5 h-5 text-orange-500" />}
          color="orange"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className={`col-span-2 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-sm`}>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">Performance Overview</h2>
            <div className="flex space-x-2">
              <button className={`px-3 py-1 text-sm rounded-md ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-700'}`}>Week</button>
              <button className={`px-3 py-1 text-sm rounded-md ${isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-700'}`}>Month</button>
              <button className={`px-3 py-1 text-sm rounded-md ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-700'}`}>Year</button>
            </div>
          </div>
          <PerformanceChart isDarkMode={isDarkMode} />
        </div>
        
        <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-sm`}>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">Trending Topics</h2>
            <button className="text-sm text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300">
              View all
            </button>
          </div>
          <div className="space-y-4">
            {trendingTopics.map(topic => (
              <TrendingTopicCard 
                key={topic.id}
                topic={topic.topic}
                growth={topic.growth}
                category={topic.category}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-sm`}>
          <h2 className="text-lg font-semibold mb-6">Content Pipeline</h2>
          <div className="space-y-4">
            <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Morning Coffee Routine</span>
                <span className={`px-2 py-1 text-xs rounded ${
                  isDarkMode ? 'bg-purple-800 text-purple-200' : 'bg-purple-100 text-purple-700'
                }`}>In Progress</span>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Script written, awaiting video generation</p>
              <div className="mt-3 w-full bg-gray-300 dark:bg-gray-600 h-2 rounded-full overflow-hidden">
                <div className="bg-purple-500 h-full" style={{ width: '65%' }}></div>
              </div>
            </div>
            
            <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">5-Minute Workout Tips</span>
                <span className={`px-2 py-1 text-xs rounded ${
                  isDarkMode ? 'bg-blue-800 text-blue-200' : 'bg-blue-100 text-blue-700'
                }`}>Planning</span>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Researching trending workout formats</p>
              <div className="mt-3 w-full bg-gray-300 dark:bg-gray-600 h-2 rounded-full overflow-hidden">
                <div className="bg-blue-500 h-full" style={{ width: '25%' }}></div>
              </div>
            </div>
            
            <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Weekend Travel Hacks</span>
                <span className={`px-2 py-1 text-xs rounded ${
                  isDarkMode ? 'bg-green-800 text-green-200' : 'bg-green-100 text-green-700'
                }`}>Completed</span>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Ready for posting on Friday at 10 AM</p>
              <div className="mt-3 w-full bg-gray-300 dark:bg-gray-600 h-2 rounded-full overflow-hidden">
                <div className="bg-green-500 h-full" style={{ width: '100%' }}></div>
              </div>
            </div>
          </div>
        </div>
        
        <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-sm`}>
          <h2 className="text-lg font-semibold mb-6">System Status</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                <span>TrendAgent</span>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">Active</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                <span>ContentAgent</span>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">Active</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></div>
                <span>VideoAgent</span>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">Idle</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
                <span>DistributionAgent</span>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">Error</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                <span>AnalyticsAgent</span>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">Active</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-gray-500 rounded-full mr-3"></div>
                <span>MonetizationAgent</span>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">Disabled</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;