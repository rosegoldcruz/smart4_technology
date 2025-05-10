import React from 'react';
import { TrendingUp } from 'lucide-react';
import { useThemeStore } from '../../stores/themeStore';

interface TrendingTopicCardProps {
  topic: string;
  growth: number;
  category: string;
}

const TrendingTopicCard: React.FC<TrendingTopicCardProps> = ({ topic, growth, category }) => {
  const { isDarkMode } = useThemeStore();
  
  const getCategoryColor = () => {
    switch (category) {
      case 'Entertainment':
        return isDarkMode ? 'bg-purple-900 text-purple-200' : 'bg-purple-100 text-purple-800';
      case 'Lifestyle':
        return isDarkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800';
      case 'Food':
        return isDarkMode ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-800';
      case 'Pets':
        return isDarkMode ? 'bg-orange-900 text-orange-200' : 'bg-orange-100 text-orange-800';
      default:
        return isDarkMode ? 'bg-gray-800 text-gray-200' : 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className={`flex items-center p-3 rounded-lg ${
      isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
    } transition-colors cursor-pointer`}>
      <div className={`p-2 rounded-full ${
        isDarkMode ? 'bg-blue-900 text-blue-400' : 'bg-blue-100 text-blue-600'
      }`}>
        <TrendingUp className="h-4 w-4" />
      </div>
      <div className="ml-3 flex-1">
        <h3 className="font-medium">{topic}</h3>
        <span className={`text-xs px-2 py-0.5 rounded ${getCategoryColor()}`}>{category}</span>
      </div>
      <div className="text-right">
        <span className="text-sm font-medium text-green-500">+{growth}%</span>
        <p className="text-xs text-gray-500 dark:text-gray-400">Growth</p>
      </div>
    </div>
  );
};

export default TrendingTopicCard;