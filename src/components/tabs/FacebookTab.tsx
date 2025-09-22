import React, { useState } from 'react';
import { Upload, Image, FileText, Calendar, BarChart } from 'lucide-react';
import PostUploadForm from '../upload/PostUploadForm';
import BulkUpload from '../upload/BulkUpload';
import ScheduledPosts from '../schedule/ScheduledPosts';

const FacebookTab: React.FC = () => {
  const [activeSection, setActiveSection] = useState('upload');

  const sections = [
    { id: 'upload', name: 'Upload Post', icon: Upload },
    { id: 'media', name: 'Media Post', icon: Image },
    { id: 'bulk', name: 'Bulk Upload', icon: FileText },
    { id: 'schedule', name: 'Scheduled', icon: Calendar },
    { id: 'analytics', name: 'Analytics', icon: BarChart }
  ];

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'upload':
        return <PostUploadForm platform="facebook" type="post" />;
      case 'media':
        return <PostUploadForm platform="facebook" type="media" />;
      case 'bulk':
        return <BulkUpload platform="facebook" />;
      case 'schedule':
        return <ScheduledPosts platform="facebook" />;
      case 'analytics':
        return <div className="text-white">Analytics coming soon...</div>;
      default:
        return <PostUploadForm platform="facebook" type="post" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex space-x-2 overflow-x-auto pb-2">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all whitespace-nowrap ${
              activeSection === section.id
                ? 'bg-blue-600 text-white'
                : 'bg-white/10 text-gray-300 hover:text-white hover:bg-white/20'
            }`}
          >
            <section.icon className="w-4 h-4" />
            <span>{section.name}</span>
          </button>
        ))}
      </div>

      <div className="bg-black/30 rounded-xl p-6">
        {renderSectionContent()}
      </div>
    </div>
  );
};

export default FacebookTab;