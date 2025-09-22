import React, { useState } from 'react';
import { Upload, Image, Calendar, Send, Eye } from 'lucide-react';
import OllamaTextEditor from '../editor/OllamaTextEditor';

interface PostUploadFormProps {
  platform: 'facebook' | 'instagram' | 'pinterest' | 'wordpress';
  type: 'post' | 'media' | 'story' | 'pin' | 'blog';
}

const PostUploadForm: React.FC<PostUploadFormProps> = ({ platform, type }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    tags: '',
    scheduleDate: '',
    scheduleTime: '',
    media: null as File | null
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, media: file }));
    }
  };

  const handleSubmit = (action: 'draft' | 'schedule' | 'publish') => {
    console.log('Submitting:', { ...formData, action, platform, type });
  };

  const getUploadLabel = () => {
    switch (type) {
      case 'story':
        return 'Upload Story Media';
      case 'pin':
        return 'Upload Pin Image';
      case 'blog':
        return 'Upload Featured Image';
      default:
        return 'Upload Media';
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">
          Create {type.charAt(0).toUpperCase() + type.slice(1)} for {platform.charAt(0).toUpperCase() + platform.slice(1)}
        </h2>
        <p className="text-gray-300">Create engaging content for your audience</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left Column - Media Upload */}
        <div className="space-y-6">
          <div className="bg-purple-900/20 border-2 border-dashed border-purple-500/30 rounded-xl p-8 text-center hover:border-purple-500/50 transition-all">
            <Image className="w-16 h-16 text-purple-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">{getUploadLabel()}</h3>
            <p className="text-gray-300 mb-4">
              {type === 'story' ? 'JPG, PNG, MP4 (9:16 aspect ratio)' : 'JPG, PNG, GIF, MP4'}
            </p>
            <input
              type="file"
              accept={type === 'story' ? "image/*,video/*" : "image/*"}
              onChange={handleFileChange}
              className="hidden"
              id="media-upload"
            />
            <label
              htmlFor="media-upload"
              className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-500 transition-all cursor-pointer inline-block"
            >
              Choose File
            </label>
            {formData.media && (
              <p className="text-green-400 mt-2">✓ {formData.media.name}</p>
            )}
          </div>
        </div>

        {/* Right Column - Content */}
        <div className="space-y-6">
          {type === 'blog' && (
            <div>
              <label className="block text-gray-300 mb-2">Post Title*</label>
              <OllamaTextEditor
                value={formData.title}
                onChange={(value) => setFormData(prev => ({ ...prev, title: value }))}
                placeholder="Enter your blog post title..."
                maxLength={200}
              />
            </div>
          )}

          <div>
            <label className="block text-gray-300 mb-2">
              {type === 'blog' ? 'Post Content' : 'Caption'}
            </label>
            <OllamaTextEditor
              value={formData.content}
              onChange={(value) => setFormData(prev => ({ ...prev, content: value }))}
              placeholder={type === 'blog' ? 'Write your blog post content...' : 'Write your caption...'}
              rows={type === 'blog' ? 10 : 6}
              maxLength={type === 'blog' ? 10000 : 2200}
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">
              {platform === 'wordpress' ? 'Categories/Tags' : 'Hashtags'}
            </label>
            <OllamaTextEditor
              value={formData.tags}
              onChange={(value) => setFormData(prev => ({ ...prev, tags: value }))}
              placeholder={platform === 'wordpress' ? 'Enter categories and tags...' : 'Enter hashtags...'}
              maxLength={500}
            />
          </div>

          {/* Schedule */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-300 mb-2">Schedule Date</label>
              <input
                type="date"
                value={formData.scheduleDate}
                onChange={(e) => setFormData(prev => ({ ...prev, scheduleDate: e.target.value }))}
                className="w-full bg-black/20 border border-purple-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500"
              />
            </div>
            
            <div>
              <label className="block text-gray-300 mb-2">Schedule Time</label>
              <input
                type="time"
                value={formData.scheduleTime}
                onChange={(e) => setFormData(prev => ({ ...prev, scheduleTime: e.target.value }))}
                className="w-full bg-black/20 border border-purple-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 justify-center pt-6 border-t border-purple-500/20">
        <button
          onClick={() => handleSubmit('draft')}
          className="flex items-center space-x-2 bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-500 transition-all"
        >
          <Upload className="w-5 h-5" />
          <span>Save as Draft</span>
        </button>
        
        <button
          onClick={() => handleSubmit('schedule')}
          className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-500 transition-all"
        >
          <Calendar className="w-5 h-5" />
          <span>Schedule</span>
        </button>
        
        <button
          onClick={() => handleSubmit('publish')}
          className="flex items-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-500 transition-all"
        >
          <Send className="w-5 h-5" />
          <span>Publish Now</span>
        </button>
      </div>
    </div>
  );
};

export default PostUploadForm;