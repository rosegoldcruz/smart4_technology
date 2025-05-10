import React, { ReactNode } from 'react';
import { useThemeStore } from '../../stores/themeStore';

interface DashboardStatProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: ReactNode;
  color: 'blue' | 'green' | 'purple' | 'orange';
}

const DashboardStat: React.FC<DashboardStatProps> = ({
  title,
  value,
  change,
  isPositive,
  icon,
  color
}) => {
  const { isDarkMode } = useThemeStore();
  
  const getBgColor = () => {
    if (isDarkMode) return 'bg-gray-800';
    return 'bg-white';
  };

  const getChangeColor = () => {
    if (isPositive) {
      return isDarkMode ? 'text-green-400' : 'text-green-600';
    } else {
      return isDarkMode ? 'text-gray-400' : 'text-gray-500';
    }
  };

  const getIconBgColor = () => {
    if (isDarkMode) {
      switch (color) {
        case 'blue': return 'bg-blue-900 text-blue-400';
        case 'green': return 'bg-green-900 text-green-400';
        case 'purple': return 'bg-purple-900 text-purple-400';
        case 'orange': return 'bg-orange-900 text-orange-400';
        default: return 'bg-blue-900 text-blue-400';
      }
    } else {
      switch (color) {
        case 'blue': return 'bg-blue-100 text-blue-600';
        case 'green': return 'bg-green-100 text-green-600';
        case 'purple': return 'bg-purple-100 text-purple-600';
        case 'orange': return 'bg-orange-100 text-orange-600';
        default: return 'bg-blue-100 text-blue-600';
      }
    }
  };

  return (
    <div className={`${getBgColor()} p-6 rounded-lg shadow-sm`}>
      <div className="flex items-center">
        <div className={`p-3 rounded-full ${getIconBgColor()}`}>
          {icon}
        </div>
        <div className="ml-4">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</h3>
          <div className="flex items-baseline">
            <p className="text-2xl font-semibold">{value}</p>
            <p className={`ml-2 text-sm ${getChangeColor()}`}>
              {isPositive ? `+${change}` : change}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardStat;