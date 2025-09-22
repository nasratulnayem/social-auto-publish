import React, { useState } from 'react';
import { Upload, Video, PlaySquare, Calendar, FileText, Sparkles, BarChart } from 'lucide-react';
import VideoUploadForm from '../upload/VideoUploadForm';
import BulkUpload from '../upload/BulkUpload';
import ScheduledPosts from '../schedule/ScheduledPosts';
import OllamaTextEditor from '../editor/OllamaTextEditor';

const YouTubeTab: React.FC = () => {
  const [activeSection, setActiveSection] = useState('upload');

  const sections = [
    { id: 'upload', name: 'Upload Video', icon: Upload },
    { id: 'shorts', name: 'Upload Shorts', icon: PlaySquare },
    { id: 'bulk', name: 'Bulk Upload', icon: FileText },
    { id: 'schedule', name: 'Scheduled', icon: Calendar },
    { id: 'analytics', name: 'Analytics', icon: BarChart }
  ];

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'upload':
        return <VideoUploadForm type="video" />;
      case 'shorts':
        return <VideoUploadForm type="shorts" />;
      case 'bulk':
        return <BulkUpload platform="youtube" />;
      case 'schedule':
        return <ScheduledPosts platform="youtube" />;
      case 'analytics':
        return <div className="text-white">Analytics coming soon...</div>;
      default:
        return <VideoUploadForm type="video" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Section Navigation */}
      <div className="flex space-x-2 overflow-x-auto pb-2">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all whitespace-nowrap ${
              activeSection === section.id
                ? 'bg-red-600 text-white'
                : 'bg-white/10 text-gray-300 hover:text-white hover:bg-white/20'
            }`}
          >
            <section.icon className="w-4 h-4" />
            <span>{section.name}</span>
          </button>
        ))}
      </div>

      {/* Section Content */}
      <div className="bg-black/30 rounded-xl p-6">
        {renderSectionContent()}
      </div>
    </div>
  );
};

export default YouTubeTab;