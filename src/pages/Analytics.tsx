import React, { useState } from 'react';
import { useThemeStore } from '../stores/themeStore';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { PieChart as PieChartIcon, BarChart as BarChartIcon, TrendingUp, Users, Eye, Clock, Calendar } from 'lucide-react';

const Analytics: React.FC = () => {
  const { isDarkMode } = useThemeStore();
  const [dateRange, setDateRange] = useState('month');
  
  const viewsData = [
    { date: '04/01', views: 320 },
    { date: '04/07', views: 480 },
    { date: '04/14', views: 580 },
    { date: '04/21', views: 790 },
    { date: '04/28', views: 1100 },
    { date: '05/05', views: 1400 },
    { date: '05/12', views: 1500 },
  ];
  
  const followersData = [
    { date: '04/01', followers: 12 },
    { date: '04/07', followers: 35 },
    { date: '04/14', followers: 58 },
    { date: '04/21', followers: 89 },
    { date: '04/28', followers: 116 },
    { date: '05/05', followers: 132 },
    { date: '05/12', followers: 143 },
  ];
  
  const contentData = [
    { name: 'Dance Tutorial', value: 45 },
    { name: 'Morning Routine', value: 30 },
    { name: 'Food Recipe', value: 15 },
    { name: 'Other', value: 10 },
  ];
  
  const COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b'];
  
  const topVideos = [
    { 
      id: 1, 
      title: "5 Easy Dance Moves Anyone Can Master", 
      views: 720, 
      engagement: "8.7%", 
      completion: "76%", 
      trend: "+42%"
    },
    { 
      id: 2, 
      title: "Morning Coffee Routine", 
      views: 430, 
      engagement: "6.5%", 
      completion: "82%", 
      trend: "+18%"
    },
    { 
      id: 3, 
      title: "Weekend Travel Hacks", 
      views: 350, 
      engagement: "5.2%", 
      completion: "68%", 
      trend: "+5%"
    },
  ];
  
  const getUserMetricCard = (title: string, value: string, change: string, icon: React.ReactNode) => (
    <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-sm`}>
      <div className="flex items-center">
        <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-500 dark:text-blue-400">
          {icon}
        </div>
        <div className="ml-4">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</h3>
          <div className="flex items-baseline">
            <p className="text-2xl font-semibold">{value}</p>
            <p className="ml-2 text-sm text-green-500">{change}</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => setDateRange('week')}
            className={`px-4 py-2 rounded-md ${
              dateRange === 'week' 
                ? 'bg-blue-600 text-white' 
                : isDarkMode 
                  ? 'bg-gray-700 text-white hover:bg-gray-600' 
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            Week
          </button>
          <button 
            onClick={() => setDateRange('month')}
            className={`px-4 py-2 rounded-md ${
              dateRange === 'month' 
                ? 'bg-blue-600 text-white' 
                : isDarkMode 
                  ? 'bg-gray-700 text-white hover:bg-gray-600' 
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            Month
          </button>
          <button 
            onClick={() => setDateRange('quarter')}
            className={`px-4 py-2 rounded-md ${
              dateRange === 'quarter' 
                ? 'bg-blue-600 text-white' 
                : isDarkMode 
                  ? 'bg-gray-700 text-white hover:bg-gray-600' 
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            Quarter
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {getUserMetricCard(
          "Total Views", 
          "1,500", 
          "+28%", 
          <Eye className="h-5 w-5" />
        )}
        {getUserMetricCard(
          "Followers", 
          "143", 
          "+22%", 
          <Users className="h-5 w-5" />
        )}
        {getUserMetricCard(
          "Avg. View Duration", 
          "42s", 
          "+8%", 
          <Clock className="h-5 w-5" />
        )}
        {getUserMetricCard(
          "Publishing Frequency", 
          "3/week", 
          "+1", 
          <Calendar className="h-5 w-5" />
        )}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className={`col-span-2 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-sm`}>
          <h2 className="text-lg font-semibold mb-6 flex items-center">
            <TrendingUp className="h-5 w-5 mr-2 text-blue-500" />
            Growth Trends
          </h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={viewsData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#374151' : '#e5e7eb'} />
                <XAxis 
                  dataKey="date" 
                  tick={{ fill: isDarkMode ? '#d1d5db' : '#374151' }} 
                  stroke={isDarkMode ? '#374151' : '#e5e7eb'} 
                />
                <YAxis 
                  tick={{ fill: isDarkMode ? '#d1d5db' : '#374151' }} 
                  stroke={isDarkMode ? '#374151' : '#e5e7eb'} 
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: isDarkMode ? '#1f2937' : '#fff',
                    color: isDarkMode ? '#f9fafb' : '#111827',
                    border: `1px solid ${isDarkMode ? '#374151' : '#e5e7eb'}`
                  }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="views" 
                  name="Video Views"
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  activeDot={{ r: 8 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-sm`}>
          <h2 className="text-lg font-semibold mb-6 flex items-center">
            <PieChartIcon className="h-5 w-5 mr-2 text-purple-500" />
            Content Distribution
          </h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={contentData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {contentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: isDarkMode ? '#1f2937' : '#fff',
                    color: isDarkMode ? '#f9fafb' : '#111827',
                    border: `1px solid ${isDarkMode ? '#374151' : '#e5e7eb'}`
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className={`col-span-2 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-sm`}>
          <h2 className="text-lg font-semibold mb-6 flex items-center">
            <BarChartIcon className="h-5 w-5 mr-2 text-green-500" />
            Followers Growth
          </h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={followersData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#374151' : '#e5e7eb'} />
                <XAxis 
                  dataKey="date" 
                  tick={{ fill: isDarkMode ? '#d1d5db' : '#374151' }} 
                  stroke={isDarkMode ? '#374151' : '#e5e7eb'} 
                />
                <YAxis 
                  tick={{ fill: isDarkMode ? '#d1d5db' : '#374151' }} 
                  stroke={isDarkMode ? '#374151' : '#e5e7eb'} 
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: isDarkMode ? '#1f2937' : '#fff',
                    color: isDarkMode ? '#f9fafb' : '#111827',
                    border: `1px solid ${isDarkMode ? '#374151' : '#e5e7eb'}`
                  }}
                />
                <Legend />
                <Bar 
                  dataKey="followers" 
                  name="Followers"
                  fill="#10b981" 
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-sm`}>
          <h2 className="text-lg font-semibold mb-4">Top Performing Videos</h2>
          <div className="space-y-4">
            {topVideos.map(video => (
              <div 
                key={video.id}
                className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
              >
                <h3 className="font-medium text-sm mb-2 line-clamp-1">{video.title}</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">Views</p>
                    <p className="font-medium">{video.views}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">Engagement</p>
                    <p className="font-medium">{video.engagement}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">Completion</p>
                    <p className="font-medium">{video.completion}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">Trend</p>
                    <p className="font-medium text-green-500">{video.trend}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-4 w-full py-2 text-center text-sm text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300">
            View All Videos
          </button>
        </div>
      </div>
    </div>
  );
};

export default Analytics;