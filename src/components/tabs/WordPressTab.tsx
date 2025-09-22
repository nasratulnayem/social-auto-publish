import React, { useState } from 'react';
import { Upload, FileText, Calendar, BarChart, Edit } from 'lucide-react';
import PostUploadForm from '../upload/PostUploadForm';
import BulkUpload from '../upload/BulkUpload';
import ScheduledPosts from '../schedule/ScheduledPosts';

const WordPressTab: React.FC = () => {
  const [activeSection, setActiveSection] = useState('upload');

  const sections = [
    { id: 'upload', name: 'New Post', icon: Upload },
    { id: 'draft', name: 'Drafts', icon: Edit },
    { id: 'bulk', name: 'Bulk Upload', icon: FileText },
    { id: 'schedule', name: 'Scheduled', icon: Calendar },
    { id: 'analytics', name: 'Analytics', icon: BarChart }
  ];

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'upload':
        return <PostUploadForm platform="wordpress" type="blog" />;
      case 'draft':
        return <div className="text-white">Draft management coming soon...</div>;
      case 'bulk':
        return <BulkUpload platform="wordpress" />;
      case 'schedule':
        return <ScheduledPosts platform="wordpress" />;
      case 'analytics':
        return <div className="text-white">Analytics coming soon...</div>;
      default:
        return <PostUploadForm platform="wordpress" type="blog" />;
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
                ? 'bg-blue-700 text-white'
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

export default WordPressTab;