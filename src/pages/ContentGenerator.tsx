import React, { useState } from 'react';
import { useThemeStore } from '../stores/themeStore';
import { FileText, Edit, Copy, CheckCircle2, XCircle, ArrowUp, ArrowDown } from 'lucide-react';

const ContentGenerator: React.FC = () => {
  const { isDarkMode } = useThemeStore();
  const [selectedTrend, setSelectedTrend] = useState('Dance Challenge');
  const [contentIdeas, setContentIdeas] = useState([
    {
      id: 1,
      title: "5 Easy Dance Moves Anyone Can Master",
      hook: "Think you can't dance? You're about to prove yourself wrong in 60 seconds...",
      script: "Hey! [excited wave] Think you can't dance? Today I'm going to prove you wrong with 5 super simple moves anyone can master! [Show move 1] First, the shoulder pop - just roll those shoulders back and forth. [Show move 2] Next, the step-touch - literally just step side to side with a little rhythm! [Show move 3] The hip sway is all about loosening up - shift your weight like this. [Show move 4] Try the arm wave - it looks impressive but it's actually super easy! [Show move 5] And finally, the spin - just pivot on one foot! That's it! Practice these 5 moves and you've officially got dance skills. Comment which move was your favorite! #DanceTutorial #BeginnerDance",
      quality: 87,
      viralPotential: 'High',
      visible: true
    },
    {
      id: 2,
      title: "Recreating Viral Dance Challenge (Gone Wrong!)",
      hook: "I attempted the viral dance trend... and this is what happened...",
      script: "Hey friends! [casual greeting] I've been seeing this dance EVERYWHERE on my FYP and decided I had to try it! [Show clips of original trend] Looks pretty simple right? Well... [Trip or stumble humorously] Let me show you my journey from total fail to... well, you'll see! First attempt: [Show funny fail] Second attempt: [Show slight improvement] By the fifth try: [Show decent version] The key is to [demonstrate specific tip]! Tag someone who needs to try this challenge! #DanceFail #LearningProcess",
      quality: 75,
      viralPotential: 'Medium',
      visible: true
    },
    {
      id: 3,
      title: "What Dance Trend Says About Your Personality",
      hook: "The way you do this dance move reveals your secret personality...",
      script: "Did you know the way you dance can reveal your personality? [Look intrigued] Let's try this experiment! [Demonstrate a simple move] If you naturally did it THIS way [show variation 1], you're spontaneous and love adventure! If you did it THIS way [show variation 2], you're analytical and detail-oriented! And if you did it like THIS [show variation 3], you're super creative and think outside the box! Comment which one you got! I'm definitely a [your choice]! #PersonalityTest #DanceChallenge",
      quality: 92,
      viralPotential: 'Very High',
      visible: true
    }
  ]);
  
  const trends = [
    { id: 1, name: 'Dance Challenge', category: 'Entertainment' },
    { id: 2, name: 'Morning Routine', category: 'Lifestyle' },
    { id: 3, name: 'Quick Recipes', category: 'Food' },
    { id: 4, name: 'Tech Gadget Reviews', category: 'Technology' }
  ];
  
  const moveContentUp = (id: number) => {
    const index = contentIdeas.findIndex(idea => idea.id === id);
    if (index > 0) {
      const newIdeas = [...contentIdeas];
      [newIdeas[index], newIdeas[index - 1]] = [newIdeas[index - 1], newIdeas[index]];
      setContentIdeas(newIdeas);
    }
  };
  
  const moveContentDown = (id: number) => {
    const index = contentIdeas.findIndex(idea => idea.id === id);
    if (index < contentIdeas.length - 1) {
      const newIdeas = [...contentIdeas];
      [newIdeas[index], newIdeas[index + 1]] = [newIdeas[index + 1], newIdeas[index]];
      setContentIdeas(newIdeas);
    }
  };
  
  const getQualityColor = (quality: number) => {
    if (quality >= 90) return 'text-green-500 dark:text-green-400';
    if (quality >= 75) return 'text-blue-500 dark:text-blue-400';
    return 'text-orange-500 dark:text-orange-400';
  };
  
  const getViralPotentialStyle = (potential: string) => {
    switch (potential) {
      case 'Very High':
        return isDarkMode 
          ? 'bg-green-900 text-green-200' 
          : 'bg-green-100 text-green-800';
      case 'High':
        return isDarkMode 
          ? 'bg-blue-900 text-blue-200' 
          : 'bg-blue-100 text-blue-800';
      case 'Medium':
        return isDarkMode 
          ? 'bg-orange-900 text-orange-200' 
          : 'bg-orange-100 text-orange-800';
      default:
        return isDarkMode 
          ? 'bg-red-900 text-red-200' 
          : 'bg-red-100 text-red-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-2xl font-bold">Content Generator</h1>
        <button className={`px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white`}>
          Generate New Content Ideas
        </button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className={`lg:col-span-1 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-sm`}>
          <h2 className="text-lg font-semibold mb-4">Trend Selection</h2>
          <div className="space-y-3">
            {trends.map(trend => (
              <button
                key={trend.id}
                onClick={() => setSelectedTrend(trend.name)}
                className={`w-full text-left px-4 py-3 rounded-md transition-colors flex justify-between items-center ${
                  selectedTrend === trend.name
                    ? isDarkMode 
                      ? 'bg-blue-900 text-blue-200' 
                      : 'bg-blue-100 text-blue-800'
                    : isDarkMode 
                      ? 'bg-gray-700 hover:bg-gray-600' 
                      : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                <span>{trend.name}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  trend.category === 'Entertainment'
                    ? isDarkMode ? 'bg-purple-900 text-purple-200' : 'bg-purple-100 text-purple-800'
                    : trend.category === 'Lifestyle'
                    ? isDarkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800'
                    : trend.category === 'Food'
                    ? isDarkMode ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-800'
                    : isDarkMode ? 'bg-indigo-900 text-indigo-200' : 'bg-indigo-100 text-indigo-800'
                }`}>
                  {trend.category}
                </span>
              </button>
            ))}
          </div>
          
          <div className="mt-6">
            <h3 className="font-medium mb-3">Configuration</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-gray-500 dark:text-gray-400 mb-1">
                  Number of Ideas
                </label>
                <select className={`w-full px-3 py-2 rounded-md border ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-300 text-gray-800'
                }`}>
                  <option>3</option>
                  <option>5</option>
                  <option>10</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm text-gray-500 dark:text-gray-400 mb-1">
                  Target Audience
                </label>
                <select className={`w-full px-3 py-2 rounded-md border ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-300 text-gray-800'
                }`}>
                  <option>General</option>
                  <option>Teens</option>
                  <option>Young Adults</option>
                  <option>Parents</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm text-gray-500 dark:text-gray-400 mb-1">
                  Content Length
                </label>
                <select className={`w-full px-3 py-2 rounded-md border ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-300 text-gray-800'
                }`}>
                  <option>15-30 seconds</option>
                  <option>30-60 seconds</option>
                  <option>60+ seconds</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        
        <div className={`lg:col-span-3 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-sm`}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Generated Content Ideas</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Trend: <span className="font-medium text-blue-500 dark:text-blue-400">{selectedTrend}</span>
            </p>
          </div>
          
          <div className="space-y-6">
            {contentIdeas.map(idea => (
              <div 
                key={idea.id}
                className={`border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} rounded-lg p-4`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-lg">{idea.title}</h3>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-1">
                      Hook: <span className="italic">{idea.hook}</span>
                    </p>
                  </div>
                  <div className="flex space-x-1">
                    <button 
                      onClick={() => moveContentUp(idea.id)}
                      className={`p-1 rounded-md ${
                        isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                      }`}
                    >
                      <ArrowUp className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => moveContentDown(idea.id)}
                      className={`p-1 rounded-md ${
                        isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                      }`}
                    >
                      <ArrowDown className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                
                <div className={`mt-4 p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" />
                      <h4 className="font-medium">Script</h4>
                    </div>
                    <div className="flex space-x-2">
                      <button className={`p-1 rounded-md text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300`}>
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className={`p-1 rounded-md text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300`}>
                        <Copy className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{idea.script}</p>
                </div>
                
                <div className="mt-4 flex flex-wrap gap-2 justify-between items-center">
                  <div className="flex items-center space-x-4">
                    <div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">Quality Score</span>
                      <p className={`font-bold ${getQualityColor(idea.quality)}`}>{idea.quality}%</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">Viral Potential</span>
                      <p className={`text-sm font-medium px-2 py-0.5 rounded-full inline-block mt-1 ${getViralPotentialStyle(idea.viralPotential)}`}>
                        {idea.viralPotential}
                      </p>
                    </div>
                  </div>
                  <div>
                    <button className="mr-2 px-3 py-1 rounded-md text-sm bg-blue-600 hover:bg-blue-700 text-white">
                      Generate Video
                    </button>
                    <button className="px-3 py-1 rounded-md text-sm bg-green-600 hover:bg-green-700 text-white">
                      Send to Content Plan
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentGenerator;