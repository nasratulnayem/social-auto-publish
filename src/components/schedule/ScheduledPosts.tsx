import React, { useState } from 'react';
import { Calendar, Clock, Play, Pause, Edit, Trash2, Eye } from 'lucide-react';

interface ScheduledPostsProps {
  platform: string;
}

const ScheduledPosts: React.FC<ScheduledPostsProps> = ({ platform }) => {
  const [filter, setFilter] = useState('all');
  
  // Mock data - in real app would come from API
  const scheduledPosts = [
    {
      id: 1,
      title: 'Amazing Travel Video from Bali',
      type: 'video',
      scheduledDate: '2024-01-15',
      scheduledTime: '10:00',
      status: 'scheduled',
      thumbnail: 'https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?w=300&h=200&fit=crop'
    },
    {
      id: 2,
      title: 'Tech Review: Latest Smartphone',
      type: 'shorts',
      scheduledDate: '2024-01-15',
      scheduledTime: '14:00',
      status: 'scheduled',
      thumbnail: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?w=300&h=200&fit=crop'
    },
    {
      id: 3,
      title: 'Cooking Tutorial: Italian Pasta',
      type: 'video',
      scheduledDate: '2024-01-16',
      scheduledTime: '18:00',
      status: 'publishing',
      thumbnail: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?w=300&h=200&fit=crop'
    },
    {
      id: 4,
      title: 'Morning Routine for Productivity',
      type: 'post',
      scheduledDate: '2024-01-17',
      scheduledTime: '08:00',
      status: 'scheduled',
      thumbnail: 'https://images.pexels.com/photos/374074/pexels-photo-374074.jpeg?w=300&h=200&fit=crop'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-600';
      case 'publishing': return 'bg-green-600';
      case 'published': return 'bg-gray-600';
      case 'failed': return 'bg-red-600';
      default: return 'bg-gray-600';
    }
  };

  const filteredPosts = scheduledPosts.filter(post => 
    filter === 'all' || post.status === filter
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Scheduled Posts</h2>
          <p className="text-gray-300">Manage your scheduled content for {platform}</p>
        </div>
        
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="bg-black/20 border border-purple-500/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
        >
          <option value="all">All Posts</option>
          <option value="scheduled">Scheduled</option>
          <option value="publishing">Publishing</option>
          <option value="published">Published</option>
          <option value="failed">Failed</option>
        </select>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-black/30 rounded-xl p-4">
          <div className="text-2xl font-bold text-blue-400">12</div>
          <div className="text-gray-300 text-sm">Scheduled</div>
        </div>
        <div className="bg-black/30 rounded-xl p-4">
          <div className="text-2xl font-bold text-green-400">1</div>
          <div className="text-gray-300 text-sm">Publishing</div>
        </div>
        <div className="bg-black/30 rounded-xl p-4">
          <div className="text-2xl font-bold text-gray-400">45</div>
          <div className="text-gray-300 text-sm">Published</div>
        </div>
        <div className="bg-black/30 rounded-xl p-4">
          <div className="text-2xl font-bold text-red-400">2</div>
          <div className="text-gray-300 text-sm">Failed</div>
        </div>
      </div>

      {/* Scheduled Posts List */}
      <div className="bg-black/30 rounded-xl overflow-hidden">
        {filteredPosts.map((post) => (
          <div key={post.id} className="flex flex-col md:flex-row items-start md:items-center p-6 border-b border-purple-500/10 hover:bg-white/5 transition-all">
            {/* Thumbnail */}
            <img
              src={post.thumbnail}
              alt={post.title}
              className="w-24 h-16 rounded-lg object-cover mb-4 md:mb-0 md:mr-4"
            />
            
            {/* Content */}
            <div className="flex-1 space-y-2">
              <h3 className="text-white font-semibold">{post.title}</h3>
              <div className="flex items-center space-x-4 text-sm text-gray-400">
                <span className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>{post.scheduledDate}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{post.scheduledTime}</span>
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium text-white ${getStatusColor(post.status)}`}>
                  {post.status}
                </span>
              </div>
            </div>
            
            {/* Actions */}
            <div className="flex items-center space-x-2 mt-4 md:mt-0">
              <button className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all">
                <Eye className="w-4 h-4" />
              </button>
              <button className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all">
                <Edit className="w-4 h-4" />
              </button>
              {post.status === 'scheduled' && (
                <button className="p-2 text-green-400 hover:text-green-300 hover:bg-white/10 rounded-lg transition-all">
                  <Play className="w-4 h-4" />
                </button>
              )}
              {post.status === 'publishing' && (
                <button className="p-2 text-yellow-400 hover:text-yellow-300 hover:bg-white/10 rounded-lg transition-all">
                  <Pause className="w-4 h-4" />
                </button>
              )}
              <button className="p-2 text-red-400 hover:text-red-300 hover:bg-white/10 rounded-lg transition-all">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-12">
          <Calendar className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-400 mb-2">No scheduled posts</h3>
          <p className="text-gray-500">Create your first scheduled post to get started</p>
        </div>
      )}
    </div>
  );
};

export default ScheduledPosts;