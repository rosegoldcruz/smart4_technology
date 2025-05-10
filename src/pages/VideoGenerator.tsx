import React, { useState } from 'react';
import { useThemeStore } from '../stores/themeStore';
import { Film, Image, Clock, Volume2, Settings, Layers, Play, Pencil, Check } from 'lucide-react';

const VideoGenerator: React.FC = () => {
  const { isDarkMode } = useThemeStore();
  const [activeTab, setActiveTab] = useState('create');
  const [currentStep, setCurrentStep] = useState(1);
  
  const videoProjects = [
    {
      id: 1,
      title: "5 Easy Dance Moves",
      thumbnail: "https://images.pexels.com/photos/7557909/pexels-photo-7557909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      status: "In Progress",
      progress: 65,
      platform: "TikTok",
      duration: "45 sec"
    },
    {
      id: 2,
      title: "Morning Coffee Routine",
      thumbnail: "https://images.pexels.com/photos/6400865/pexels-photo-6400865.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      status: "Rendering",
      progress: 85,
      platform: "TikTok",
      duration: "32 sec"
    },
    {
      id: 3,
      title: "Weekend Travel Hacks",
      thumbnail: "https://images.pexels.com/photos/7267852/pexels-photo-7267852.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      status: "Complete",
      progress: 100,
      platform: "TikTok",
      duration: "58 sec"
    }
  ];
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Complete':
        return isDarkMode ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-800';
      case 'Rendering':
        return isDarkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800';
      case 'In Progress':
        return isDarkMode ? 'bg-purple-900 text-purple-200' : 'bg-purple-100 text-purple-800';
      default:
        return isDarkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-100 text-gray-800';
    }
  };
  
  const renderStep = () => {
    switch(currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Video Title
              </label>
              <input 
                type="text" 
                placeholder="Enter a title for your video"
                className={`w-full px-4 py-2 rounded-md border ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-800'
                }`}
                defaultValue="5 Easy Dance Moves Anyone Can Master"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Video Script
              </label>
              <textarea
                rows={5}
                className={`w-full px-4 py-2 rounded-md border ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-800'
                }`}
                defaultValue="Hey! Think you can't dance? Today I'm going to prove you wrong with 5 super simple moves anyone can master! First, the shoulder pop - just roll those shoulders back and forth. Next, the step-touch - literally just step side to side with a little rhythm! The hip sway is all about loosening up - shift your weight like this. Try the arm wave - it looks impressive but it's actually super easy! And finally, the spin - just pivot on one foot! That's it! Practice these 5 moves and you've officially got dance skills. Comment which move was your favorite!"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Video Platform
              </label>
              <select
                className={`w-full px-4 py-2 rounded-md border ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-800'
                }`}
              >
                <option>TikTok</option>
                <option>Instagram Reels</option>
                <option>YouTube Shorts</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Hashtags
              </label>
              <input 
                type="text" 
                placeholder="Enter hashtags separated by spaces"
                className={`w-full px-4 py-2 rounded-md border ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-800'
                }`}
                defaultValue="#DanceTutorial #BeginnerDance #LearnToDance #EasyDance #DanceTips"
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Video Style
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button className={`p-4 rounded-lg border-2 ${
                  isDarkMode 
                    ? 'border-blue-500 bg-gray-700' 
                    : 'border-blue-500 bg-blue-50'
                }`}>
                  <div className="flex flex-col items-center">
                    <Image className="h-8 w-8 mb-2 text-blue-500" />
                    <span className="font-medium">Avatar</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">CREATIFY</span>
                  </div>
                </button>
                <button className={`p-4 rounded-lg border-2 ${
                  isDarkMode 
                    ? 'border-gray-600 bg-gray-700' 
                    : 'border-gray-200 bg-white'
                }`}>
                  <div className="flex flex-col items-center">
                    <Layers className="h-8 w-8 mb-2 text-gray-500" />
                    <span className="font-medium">Scene</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">Hailuo</span>
                  </div>
                </button>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Avatar Style
              </label>
              <div className="grid grid-cols-3 gap-4">
                <div className={`p-3 rounded-lg border ${
                  isDarkMode ? 'border-gray-600' : 'border-gray-200'
                }`}>
                  <img 
                    src="https://images.pexels.com/photos/1674752/pexels-photo-1674752.jpeg?auto=compress&cs=tinysrgb&w=150" 
                    alt="Avatar 1" 
                    className="w-full h-24 object-cover rounded-md mb-2"
                  />
                  <p className="text-center text-sm">Professional</p>
                </div>
                <div className={`p-3 rounded-lg border ${
                  isDarkMode ? 'border-blue-500' : 'border-blue-500'
                }`}>
                  <img 
                    src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150" 
                    alt="Avatar 2" 
                    className="w-full h-24 object-cover rounded-md mb-2"
                  />
                  <p className="text-center text-sm">Casual</p>
                </div>
                <div className={`p-3 rounded-lg border ${
                  isDarkMode ? 'border-gray-600' : 'border-gray-200'
                }`}>
                  <img 
                    src="https://images.pexels.com/photos/1542085/pexels-photo-1542085.jpeg?auto=compress&cs=tinysrgb&w=150" 
                    alt="Avatar 3" 
                    className="w-full h-24 object-cover rounded-md mb-2"
                  />
                  <p className="text-center text-sm">Creative</p>
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Voice Style
              </label>
              <select
                className={`w-full px-4 py-2 rounded-md border ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-800'
                }`}
              >
                <option>Energetic Female</option>
                <option>Calm Female</option>
                <option>Energetic Male</option>
                <option>Calm Male</option>
              </select>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Background Music
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className={`p-4 rounded-lg border-2 ${
                  isDarkMode 
                    ? 'border-blue-500 bg-gray-700' 
                    : 'border-blue-500 bg-blue-50'
                }`}>
                  <div className="flex items-center">
                    <div className="mr-3 p-2 rounded-full bg-blue-500">
                      <Volume2 className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-medium">Upbeat Pop</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Energetic and fun</p>
                    </div>
                  </div>
                </div>
                <div className={`p-4 rounded-lg border ${
                  isDarkMode 
                    ? 'border-gray-600 bg-gray-700' 
                    : 'border-gray-200 bg-white'
                }`}>
                  <div className="flex items-center">
                    <div className="mr-3 p-2 rounded-full bg-gray-500 dark:bg-gray-600">
                      <Volume2 className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-medium">Electronic Dance</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Modern and trendy</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Music Volume
              </label>
              <input 
                type="range" 
                min="0" 
                max="100" 
                defaultValue="30"
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                <span>Low</span>
                <span>Medium</span>
                <span>High</span>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Video Effects
              </label>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input type="checkbox" id="captions" className="mr-2" defaultChecked />
                  <label htmlFor="captions">Add automatic captions</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="zoom" className="mr-2" defaultChecked />
                  <label htmlFor="zoom">Dynamic zoom effects</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="transitions" className="mr-2" defaultChecked />
                  <label htmlFor="transitions">Smooth transitions</label>
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Output Quality
              </label>
              <select
                className={`w-full px-4 py-2 rounded-md border ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-800'
                }`}
              >
                <option>High (1080p)</option>
                <option>Medium (720p)</option>
                <option>Low (480p)</option>
              </select>
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
        <h1 className="text-2xl font-bold">Video Generator</h1>
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => setActiveTab('create')}
            className={`px-4 py-2 rounded-md ${
              activeTab === 'create' 
                ? 'bg-blue-600 text-white' 
                : isDarkMode 
                  ? 'bg-gray-700 text-white hover:bg-gray-600' 
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            Create Video
          </button>
          <button 
            onClick={() => setActiveTab('library')}
            className={`px-4 py-2 rounded-md ${
              activeTab === 'library' 
                ? 'bg-blue-600 text-white' 
                : isDarkMode 
                  ? 'bg-gray-700 text-white hover:bg-gray-600' 
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            Video Library
          </button>
        </div>
      </div>
      
      {activeTab === 'create' ? (
        <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-sm`}>
          <div className="flex items-center mb-6">
            <div className="flex-1">
              <h2 className="text-lg font-semibold">Create New Video</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Generate a TikTok-ready video based on your script</p>
            </div>
            <div className={`flex ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'} rounded-lg p-1`}>
              <button className={`px-3 py-1.5 text-sm rounded ${
                currentStep === 1 
                  ? 'bg-blue-600 text-white' 
                  : ''
              }`}>
                1. Content
              </button>
              <button className={`px-3 py-1.5 text-sm rounded ${
                currentStep === 2 
                  ? 'bg-blue-600 text-white' 
                  : ''
              }`}>
                2. Style
              </button>
              <button className={`px-3 py-1.5 text-sm rounded ${
                currentStep === 3 
                  ? 'bg-blue-600 text-white' 
                  : ''
              }`}>
                3. Settings
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              {renderStep()}
            </div>
            
            <div>
              <div className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'} p-4 rounded-lg`}>
                <h3 className="font-medium mb-3">Video Preview</h3>
                <div className="bg-gray-800 rounded-lg aspect-[9/16] relative flex items-center justify-center">
                  <div className="absolute inset-0 opacity-20">
                    <img 
                      src="https://images.pexels.com/photos/7557909/pexels-photo-7557909.jpeg?auto=compress&cs=tinysrgb&w=600" 
                      alt="Preview" 
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <div className="text-center z-10">
                    <div className="p-3 rounded-full bg-blue-500/50 mx-auto mb-3 backdrop-blur-sm">
                      <Play className="h-6 w-6 text-white" />
                    </div>
                    <p className="text-white text-sm">Preview will appear here</p>
                  </div>
                </div>
                
                <div className="mt-4 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Estimated Duration:</span>
                    <span>~45 seconds</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Generation Platform:</span>
                    <span>CREATIFY</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 space-y-4">
                <button className="w-full py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-medium">
                  Generate Video
                </button>
                {currentStep > 1 && (
                  <button 
                    onClick={() => setCurrentStep(prev => prev - 1)}
                    className={`w-full py-2 rounded-md ${
                      isDarkMode 
                        ? 'bg-gray-700 hover:bg-gray-600' 
                        : 'bg-gray-200 hover:bg-gray-300'
                    } font-medium`}
                  >
                    Previous Step
                  </button>
                )}
                {currentStep < 3 && (
                  <button 
                    onClick={() => setCurrentStep(prev => prev + 1)}
                    className="w-full py-2 rounded-md bg-green-600 hover:bg-green-700 text-white font-medium"
                  >
                    Next Step
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videoProjects.map(video => (
            <div 
              key={video.id}
              className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-sm overflow-hidden`}
            >
              <div className="relative">
                <img 
                  src={video.thumbnail} 
                  alt={video.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 transition-opacity">
                  <button className="p-3 rounded-full bg-blue-500/80 backdrop-blur-sm">
                    <Play className="h-6 w-6 text-white" />
                  </button>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium text-white">{video.title}</h3>
                    <span className={`px-2 py-0.5 text-xs rounded-full ${getStatusColor(video.status)}`}>
                      {video.status}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <Film className="h-4 w-4 mr-1 text-gray-500 dark:text-gray-400" />
                    <span className="text-sm text-gray-500 dark:text-gray-400">{video.platform}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1 text-gray-500 dark:text-gray-400" />
                    <span className="text-sm text-gray-500 dark:text-gray-400">{video.duration}</span>
                  </div>
                </div>
                
                {video.status !== 'Complete' && (
                  <div className="mb-4">
                    <div className="w-full bg-gray-300 dark:bg-gray-600 h-2 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${
                          video.status === 'Rendering' ? 'bg-blue-500' : 'bg-purple-500'
                        }`} 
                        style={{ width: `${video.progress}%` }}
                      ></div>
                    </div>
                    <p className="text-right text-xs mt-1 text-gray-500 dark:text-gray-400">
                      {video.progress}% complete
                    </p>
                  </div>
                )}
                
                <div className="flex justify-between">
                  {video.status === 'Complete' ? (
                    <>
                      <button className="px-3 py-1.5 rounded bg-blue-600 hover:bg-blue-700 text-white text-sm">
                        Download
                      </button>
                      <button className="px-3 py-1.5 rounded bg-green-600 hover:bg-green-700 text-white text-sm">
                        Publish
                      </button>
                    </>
                  ) : video.status === 'Rendering' ? (
                    <button className="px-3 py-1.5 rounded bg-orange-600 hover:bg-orange-700 text-white text-sm w-full">
                      Cancel Rendering
                    </button>
                  ) : (
                    <>
                      <button className="px-3 py-1.5 rounded bg-blue-600 hover:bg-blue-700 text-white text-sm">
                        Continue Editing
                      </button>
                      <button className="px-3 py-1.5 rounded bg-red-600 hover:bg-red-700 text-white text-sm">
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VideoGenerator;