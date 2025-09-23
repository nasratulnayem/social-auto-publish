import React, { useState } from 'react';
import { Upload, Video, Calendar, Send, Eye, FileText, Image } from 'lucide-react';
import OllamaTextEditor from '../editor/OllamaTextEditor';

interface VideoUploadFormProps {
  type: 'video' | 'shorts';
}

const VideoUploadForm: React.FC<VideoUploadFormProps> = ({ type }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tags: '',
    category: 'Education',
    visibility: 'public',
    scheduleDate: '',
    scheduleTime: '',
    thumbnail: null as File | null,
    video: null as File | null,
    subtitles: null as File | null,
    firstComment: ''
  });

  const [dragActive, setDragActive] = useState(false);

  const categories = [
    'Education', 'Entertainment', 'Gaming', 'Music', 'News & Politics',
    'Science & Technology', 'Sports', 'Travel & Events', 'People & Blogs'
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'video' | 'thumbnail' | 'subtitles') => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, [field]: file }));
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('video/')) {
        setFormData(prev => ({ ...prev, video: file }));
      }
    }
  };

  const handleSubmit = (action: 'draft' | 'schedule' | 'publish') => {
    console.log('Submitting:', { ...formData, action, type });
    alert(`${type === 'shorts' ? 'YouTube Short' : 'YouTube Video'} ${action === 'publish' ? 'published' : action === 'schedule' ? 'scheduled' : 'saved as draft'} successfully!`);
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-2">
          Upload {type === 'shorts' ? 'YouTube Shorts' : 'YouTube Video'}
        </h2>
        <p className="text-gray-300">
          {type === 'shorts' 
            ? 'Upload vertical videos up to 60 seconds for maximum engagement' 
            : 'Upload your video with complete metadata for professional publishing'
          }
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left Column - File Upload */}
        <div className="space-y-6">
          {/* Video Upload */}
          <div 
            className={`bg-gradient-to-br from-purple-900/20 to-pink-900/20 border-2 border-dashed rounded-xl p-8 text-center transition-all ${
              dragActive ? 'border-purple-400 bg-purple-500/20' : 'border-purple-500/30 hover:border-purple-500/50'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <Video className="w-16 h-16 text-purple-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              Upload {type === 'shorts' ? 'Short Video' : 'Video'}
            </h3>
            <p className="text-gray-300 mb-4">
              {type === 'shorts' 
                ? 'MP4, MOV, AVI (Max 60 seconds, 9:16 aspect ratio)'
                : 'MP4, MOV, AVI (Max 2GB)'
              }
            </p>
            <input
              type="file"
              accept="video/*"
              onChange={(e) => handleFileChange(e, 'video')}
              className="hidden"
              id="video-upload"
            />
            <label
              htmlFor="video-upload"
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-500 hover:to-pink-500 transition-all cursor-pointer inline-block transform hover:scale-105"
            >
              Choose Video File
            </label>
            {formData.video && (
              <div className="mt-4 p-3 bg-green-600/20 rounded-lg">
                <p className="text-green-400 font-medium">✓ {formData.video.name}</p>
                <p className="text-gray-300 text-sm">{(formData.video.size / (1024 * 1024)).toFixed(2)} MB</p>
              </div>
            )}
          </div>

          {/* Thumbnail Upload */}
          <div className="bg-black/30 border-2 border-dashed border-purple-500/30 rounded-xl p-6 text-center hover:border-purple-500/50 transition-all">
            <Image className="w-12 h-12 text-purple-400 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-white mb-2">Custom Thumbnail</h3>
            <p className="text-gray-300 mb-4">JPG, PNG (1280x720 recommended)</p>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, 'thumbnail')}
              className="hidden"
              id="thumbnail-upload"
            />
            <label
              htmlFor="thumbnail-upload"
              className="bg-gray-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-500 transition-all cursor-pointer inline-block"
            >
              Choose Thumbnail
            </label>
            {formData.thumbnail && (
              <p className="text-green-400 mt-2">✓ {formData.thumbnail.name}</p>
            )}
          </div>

          {/* Subtitles Upload */}
          <div className="bg-black/30 border-2 border-dashed border-purple-500/30 rounded-xl p-6 text-center hover:border-purple-500/50 transition-all">
            <FileText className="w-12 h-12 text-purple-400 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-white mb-2">Subtitles (Optional)</h3>
            <p className="text-gray-300 mb-4">SRT, VTT files</p>
            <input
              type="file"
              accept=".srt,.vtt"
              onChange={(e) => handleFileChange(e, 'subtitles')}
              className="hidden"
              id="subtitles-upload"
            />
            <label
              htmlFor="subtitles-upload"
              className="bg-gray-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-500 transition-all cursor-pointer inline-block"
            >
              Choose Subtitle File
            </label>
            {formData.subtitles && (
              <p className="text-green-400 mt-2">✓ {formData.subtitles.name}</p>
            )}
          </div>
        </div>

        {/* Right Column - Metadata */}
        <div className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-gray-300 mb-2 font-medium">Video Title*</label>
            <OllamaTextEditor
              value={formData.title}
              onChange={(value) => setFormData(prev => ({ ...prev, title: value }))}
              placeholder="Enter an engaging title for your video..."
              maxLength={100}
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-300 mb-2 font-medium">Description</label>
            <OllamaTextEditor
              value={formData.description}
              onChange={(value) => setFormData(prev => ({ ...prev, description: value }))}
              placeholder="Describe your video content, include relevant keywords..."
              rows={6}
              maxLength={5000}
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-gray-300 mb-2 font-medium">Tags</label>
            <OllamaTextEditor
              value={formData.tags}
              onChange={(value) => setFormData(prev => ({ ...prev, tags: value }))}
              placeholder="Enter tags separated by commas (e.g., tutorial, tech, review)..."
              maxLength={500}
            />
          </div>

          {/* First Comment */}
          <div>
            <label className="block text-gray-300 mb-2 font-medium">First Comment (Optional)</label>
            <OllamaTextEditor
              value={formData.firstComment}
              onChange={(value) => setFormData(prev => ({ ...prev, firstComment: value }))}
              placeholder="Add a pinned comment to engage your audience..."
              rows={3}
              maxLength={1000}
            />
          </div>

          {/* Category & Visibility */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-300 mb-2 font-medium">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                className="w-full bg-black/20 border border-purple-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-all"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-gray-300 mb-2 font-medium">Visibility</label>
              <select
                value={formData.visibility}
                onChange={(e) => setFormData(prev => ({ ...prev, visibility: e.target.value }))}
                className="w-full bg-black/20 border border-purple-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-all"
              >
                <option value="public">Public</option>
                <option value="unlisted">Unlisted</option>
                <option value="private">Private</option>
              </select>
            </div>
          </div>

          {/* Schedule */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-300 mb-2 font-medium">Schedule Date</label>
              <input
                type="date"
                value={formData.scheduleDate}
                onChange={(e) => setFormData(prev => ({ ...prev, scheduleDate: e.target.value }))}
                className="w-full bg-black/20 border border-purple-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-all"
              />
            </div>
            
            <div>
              <label className="block text-gray-300 mb-2 font-medium">Schedule Time</label>
              <input
                type="time"
                value={formData.scheduleTime}
                onChange={(e) => setFormData(prev => ({ ...prev, scheduleTime: e.target.value }))}
                className="w-full bg-black/20 border border-purple-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-all"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 justify-center pt-6 border-t border-purple-500/20">
        <button
          onClick={() => handleSubmit('draft')}
          className="flex items-center space-x-2 bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-500 transition-all transform hover:scale-105"
        >
          <Upload className="w-5 h-5" />
          <span>Save as Draft</span>
        </button>
        
        <button
          onClick={() => handleSubmit('schedule')}
          disabled={!formData.scheduleDate || !formData.scheduleTime}
          className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-500 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Calendar className="w-5 h-5" />
          <span>Schedule</span>
        </button>
        
        <button
          onClick={() => handleSubmit('publish')}
          disabled={!formData.video || !formData.title}
          className="flex items-center space-x-2 bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-500 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send className="w-5 h-5" />
          <span>Publish Now</span>
        </button>
        
        <button 
          disabled={!formData.video}
          className="flex items-center space-x-2 bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-500 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Eye className="w-5 h-5" />
          <span>Preview on YouTube</span>
        </button>
      </div>
    </div>
  );
};

export default VideoUploadForm;