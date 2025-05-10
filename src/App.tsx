import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useThemeStore } from './stores/themeStore';

// Components
import Layout from './components/Layout';

// Pages
import Dashboard from './pages/Dashboard';
import Trends from './pages/Trends';
import ContentGenerator from './pages/ContentGenerator';
import VideoGenerator from './pages/VideoGenerator';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import Login from './pages/Login';

function App() {
  const { isDarkMode } = useThemeStore();

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="trends" element={<Trends />} />
            <Route path="content" element={<ContentGenerator />} />
            <Route path="video" element={<VideoGenerator />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;