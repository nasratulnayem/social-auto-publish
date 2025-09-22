import React, { useState } from 'react';
import { Youtube, Facebook, Instagram, Image as ImageIcon, FileText, Settings, Upload, Calendar, BarChart } from 'lucide-react';
import YouTubeTab from './tabs/YouTubeTab';
import FacebookTab from './tabs/FacebookTab';
import InstagramTab from './tabs/InstagramTab';
import PinterestTab from './tabs/PinterestTab';
import WordPressTab from './tabs/WordPressTab';
import SettingsTab from './tabs/SettingsTab';

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('youtube');

  const tabs = [
    { id: 'youtube', name: 'YouTube', icon: Youtube, color: 'text-red-500' },
    { id: 'facebook', name: 'Facebook', icon: Facebook, color: 'text-blue-500' },
    { id: 'instagram', name: 'Instagram', icon: Instagram, color: 'text-pink-500' },
    { id: 'pinterest', name: 'Pinterest', icon: ImageIcon, color: 'text-red-400' },
    { id: 'wordpress', name: 'WordPress', icon: FileText, color: 'text-blue-600' },
    { id: 'settings', name: 'Settings', icon: Settings, color: 'text-gray-400' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'youtube':
        return <YouTubeTab />;
      case 'facebook':
        return <FacebookTab />;
      case 'instagram':
        return <InstagramTab />;
      case 'pinterest':
        return <PinterestTab />;
      case 'wordpress':
        return <WordPressTab />;
      case 'settings':
        return <SettingsTab />;
      default:
        return <YouTubeTab />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-black">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-lg border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-white">SocialSync Pro Dashboard</h1>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-black/30 rounded-lg px-3 py-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-sm text-gray-300">All Systems Online</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Tab Navigation */}
        <nav className="flex space-x-1 bg-black/20 backdrop-blur-lg rounded-xl p-1 mb-8 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <tab.icon className={`w-5 h-5 ${activeTab === tab.id ? 'text-white' : tab.color}`} />
              <span className="font-medium">{tab.name}</span>
            </button>
          ))}
        </nav>

        {/* Tab Content */}
        <div className="bg-black/20 backdrop-blur-lg rounded-xl border border-purple-500/20 p-6">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;