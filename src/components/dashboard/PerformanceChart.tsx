import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface PerformanceChartProps {
  isDarkMode: boolean;
}

const PerformanceChart: React.FC<PerformanceChartProps> = ({ isDarkMode }) => {
  const data = [
    { day: 'Mon', followers: 58, views: 320, engagement: 21 },
    { day: 'Tue', followers: 63, views: 280, engagement: 18 },
    { day: 'Wed', followers: 80, views: 450, engagement: 24 },
    { day: 'Thu', followers: 92, views: 520, engagement: 29 },
    { day: 'Fri', followers: 110, views: 580, engagement: 32 },
    { day: 'Sat', followers: 125, views: 620, engagement: 35 },
    { day: 'Sun', followers: 143, views: 700, engagement: 39 },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#374151' : '#e5e7eb'} />
        <XAxis 
          dataKey="day" 
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
          dataKey="followers" 
          stroke="#3b82f6" 
          activeDot={{ r: 8 }} 
          name="Followers"
        />
        <Line 
          type="monotone" 
          dataKey="views" 
          stroke="#10b981" 
          name="Views" 
        />
        <Line 
          type="monotone" 
          dataKey="engagement" 
          stroke="#8b5cf6" 
          name="Engagement" 
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default PerformanceChart;