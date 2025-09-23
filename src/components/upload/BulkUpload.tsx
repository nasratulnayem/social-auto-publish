import React, { useState } from 'react';
import { Upload, FileText, Download, Calendar, Play, CheckCircle, Clock, AlertCircle } from 'lucide-react';

interface BulkUploadProps {
  platform: string;
}

const BulkUpload: React.FC<BulkUploadProps> = ({ platform }) => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [processedData, setProcessedData] = useState<any[]>([]);
  const [scheduleSettings, setScheduleSettings] = useState({
    startDate: '',
    postsPerDay: 3,
    timeSlots: ['10:00', '14:00', '18:00'],
    skipWeekends: false
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      setIsProcessing(true);
      
      // Simulate file processing
      setTimeout(() => {
        const mockData = Array.from({ length: 100 }, (_, i) => ({
          id: i + 1,
          title: `${platform === 'youtube' ? 'Video' : 'Post'} Title ${i + 1}`,
          description: `Description for ${platform === 'youtube' ? 'video' : 'post'} ${i + 1}`,
          tags: `tag${i + 1}, ${platform}, content`,
          status: 'pending',
          scheduledDate: null,
          scheduledTime: null,
          mediaFile: `${platform === 'youtube' ? 'video' : 'image'}${i + 1}.${platform === 'youtube' ? 'mp4' : 'jpg'}`
        }));
        setProcessedData(mockData);
        setIsProcessing(false);
      }, 2000);
    }
  };

  const generateSchedule = () => {
    const startDate = new Date(scheduleSettings.startDate);
    let currentDate = new Date(startDate);
    let postIndex = 0;
    
    const updatedData = processedData.map((item) => {
      // Skip weekends if option is enabled
      while (scheduleSettings.skipWeekends && (currentDate.getDay() === 0 || currentDate.getDay() === 6)) {
        currentDate.setDate(currentDate.getDate() + 1);
      }
      
      const timeSlotIndex = postIndex % scheduleSettings.postsPerDay;
      const scheduledTime = scheduleSettings.timeSlots[timeSlotIndex] || '10:00';
      
      const result = {
        ...item,
        scheduledDate: currentDate.toISOString().split('T')[0],
        scheduledTime: scheduledTime,
        status: 'scheduled'
      };
      
      postIndex++;
      
      // Move to next day after posting all daily slots
      if (postIndex % scheduleSettings.postsPerDay === 0) {
        currentDate.setDate(currentDate.getDate() + 1);
      }
      
      return result;
    });
    
    setProcessedData(updatedData);
  };

  const downloadTemplate = () => {
    let template = '';
    let filename = '';
    
    switch (platform) {
      case 'youtube':
        template = 'Title,Description,Tags,Category,Visibility,VideoFile,ThumbnailFile\n"Amazing Tutorial Video","Learn something new today","tutorial,education,howto","Education","public","video1.mp4","thumb1.jpg"';
        filename = 'youtube_template.csv';
        break;
      case 'facebook':
        template = 'Title,Content,Tags,MediaFile\n"Engaging Facebook Post","Check out this amazing content! #facebook #social","#facebook #social #content","image1.jpg"';
        filename = 'facebook_template.csv';
        break;
      case 'instagram':
        template = 'Caption,Tags,MediaFile\n"Beautiful sunset today! 🌅","#sunset #photography #nature #beautiful","sunset.jpg"';
        filename = 'instagram_template.csv';
        break;
      case 'pinterest':
        template = 'Title,Description,Tags,MediaFile,BoardId\n"DIY Home Decor Ideas","Amazing DIY projects for your home","#DIY #homedecor #crafts","diy_image.jpg","board123"';
        filename = 'pinterest_template.csv';
        break;
      case 'wordpress':
        template = 'Title,Content,Tags,Category,Status,FeaturedImage\n"Blog Post Title","Full blog post content goes here...","blogging,tips,wordpress","Technology","draft","featured.jpg"';
        filename = 'wordpress_template.csv';
        break;
      default:
        template = 'Title,Content,Tags,MediaFile\n"Sample Post","Sample content","#tag1 #tag2","image1.jpg"';
        filename = `${platform}_template.csv`;
    }
    
    const blob = new Blob([template], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const startBulkUpload = () => {
    alert(`Starting bulk upload of ${processedData.length} items to ${platform}!`);
    // Here you would implement the actual bulk upload logic
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-2">
          Bulk Upload for {platform.charAt(0).toUpperCase() + platform.slice(1)}
        </h2>
        <p className="text-gray-300">Upload multiple posts with CSV or JSON files and schedule them automatically</p>
      </div>

      {/* File Upload */}
      <div className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border-2 border-dashed border-purple-500/30 rounded-xl p-8 text-center hover:border-purple-500/50 transition-all">
        <FileText className="w-16 h-16 text-purple-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-white mb-2">Upload CSV or JSON File</h3>
        <p className="text-gray-300 mb-6">Upload your bulk content file with titles, descriptions, and metadata</p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <input
            type="file"
            accept=".csv,.json"
            onChange={handleFileUpload}
            className="hidden"
            id="bulk-upload"
          />
          <label
            htmlFor="bulk-upload"
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-500 hover:to-pink-500 transition-all cursor-pointer inline-flex items-center space-x-2 transform hover:scale-105"
          >
            <Upload className="w-5 h-5" />
            <span>Choose File</span>
          </label>
          
          <button
            onClick={downloadTemplate}
            className="bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-500 transition-all inline-flex items-center space-x-2 transform hover:scale-105"
          >
            <Download className="w-5 h-5" />
            <span>Download Template</span>
          </button>
        </div>
        
        {uploadedFile && (
          <div className="mt-6 p-4 bg-green-600/20 rounded-lg">
            <p className="text-green-400 font-medium">✓ {uploadedFile.name} uploaded</p>
            {isProcessing ? (
              <p className="text-yellow-400 mt-2">Processing file...</p>
            ) : (
              <p className="text-gray-300 mt-2">{processedData.length} items processed</p>
            )}
          </div>
        )}
      </div>

      {/* Schedule Settings */}
      {processedData.length > 0 && (
        <div className="bg-black/30 rounded-xl p-6 border border-purple-500/20">
          <h3 className="text-xl font-semibold text-white mb-6 flex items-center space-x-2">
            <Calendar className="w-6 h-6 text-purple-400" />
            <span>Smart Scheduling Settings</span>
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div>
              <label className="block text-gray-300 mb-2 font-medium">Start Date</label>
              <input
                type="date"
                value={scheduleSettings.startDate}
                onChange={(e) => setScheduleSettings(prev => ({ ...prev, startDate: e.target.value }))}
                className="w-full bg-black/20 border border-purple-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-all"
              />
            </div>
            
            <div>
              <label className="block text-gray-300 mb-2 font-medium">Posts Per Day</label>
              <select
                value={scheduleSettings.postsPerDay}
                onChange={(e) => setScheduleSettings(prev => ({ ...prev, postsPerDay: parseInt(e.target.value) }))}
                className="w-full bg-black/20 border border-purple-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-all"
              >
                <option value={1}>1 post</option>
                <option value={2}>2 posts</option>
                <option value={3}>3 posts</option>
                <option value={4}>4 posts</option>
                <option value={5}>5 posts</option>
              </select>
            </div>
            
            <div>
              <label className="block text-gray-300 mb-2 font-medium">Time Slots</label>
              <input
                type="text"
                value={scheduleSettings.timeSlots.join(', ')}
                onChange={(e) => setScheduleSettings(prev => ({ ...prev, timeSlots: e.target.value.split(', ') }))}
                placeholder="10:00, 14:00, 18:00"
                className="w-full bg-black/20 border border-purple-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-all"
              />
            </div>
            
            <div className="flex items-center">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={scheduleSettings.skipWeekends}
                  onChange={(e) => setScheduleSettings(prev => ({ ...prev, skipWeekends: e.target.checked }))}
                  className="w-4 h-4 text-purple-600 bg-black/20 border-purple-500/30 rounded focus:ring-purple-500"
                />
                <span className="text-gray-300">Skip Weekends</span>
              </label>
            </div>
          </div>
          
          <button
            onClick={generateSchedule}
            disabled={!scheduleSettings.startDate}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-500 transition-all inline-flex items-center space-x-2 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Calendar className="w-5 h-5" />
            <span>Generate Schedule</span>
          </button>
        </div>
      )}

      {/* Data Preview */}
      {processedData.length > 0 && (
        <div className="bg-black/30 rounded-xl p-6 border border-purple-500/20">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <h3 className="text-xl font-semibold text-white">Content Preview</h3>
              <p className="text-gray-300">{processedData.length} items ready for upload</p>
            </div>
            
            <div className="flex gap-3">
              <div className="flex items-center space-x-2 bg-blue-600/20 px-3 py-2 rounded-lg">
                <Clock className="w-4 h-4 text-blue-400" />
                <span className="text-blue-400 text-sm">
                  {processedData.filter(item => item.status === 'scheduled').length} Scheduled
                </span>
              </div>
              
              <button 
                onClick={startBulkUpload}
                disabled={processedData.filter(item => item.status === 'scheduled').length === 0}
                className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-500 transition-all inline-flex items-center space-x-2 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Play className="w-4 h-4" />
                <span>Start Bulk Upload</span>
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-white">
              <thead>
                <tr className="border-b border-purple-500/20">
                  <th className="text-left py-3 px-2">#</th>
                  <th className="text-left py-3 px-2">Title</th>
                  <th className="text-left py-3 px-2">Status</th>
                  <th className="text-left py-3 px-2">Scheduled</th>
                  <th className="text-left py-3 px-2">Media</th>
                </tr>
              </thead>
              <tbody>
                {processedData.slice(0, 10).map((item) => (
                  <tr key={item.id} className="border-b border-purple-500/10 hover:bg-white/5 transition-all">
                    <td className="py-3 px-2 text-gray-400">{item.id}</td>
                    <td className="py-3 px-2">
                      <div className="font-medium">{item.title}</div>
                      <div className="text-sm text-gray-400 truncate max-w-xs">{item.description}</div>
                    </td>
                    <td className="py-3 px-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 w-fit ${
                        item.status === 'scheduled' ? 'bg-blue-600' : 
                        item.status === 'pending' ? 'bg-yellow-600' : 'bg-gray-600'
                      }`}>
                        {item.status === 'scheduled' && <CheckCircle className="w-3 h-3" />}
                        {item.status === 'pending' && <AlertCircle className="w-3 h-3" />}
                        <span>{item.status}</span>
                      </span>
                    </td>
                    <td className="py-3 px-2 text-sm">
                      {item.scheduledDate ? (
                        <div>
                          <div className="text-white">{item.scheduledDate}</div>
                          <div className="text-gray-400">{item.scheduledTime}</div>
                        </div>
                      ) : (
                        <span className="text-gray-500">Not scheduled</span>
                      )}
                    </td>
                    <td className="py-3 px-2 text-sm text-gray-400">{item.mediaFile}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {processedData.length > 10 && (
              <div className="text-center py-4">
                <p className="text-gray-400">Showing 10 of {processedData.length} items</p>
                <button className="text-purple-400 hover:text-purple-300 mt-2">View All Items</button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Schedule Summary */}
      {processedData.length > 0 && processedData.some(item => item.status === 'scheduled') && (
        <div className="bg-gradient-to-r from-green-600/20 to-blue-600/20 rounded-xl p-6 border border-green-500/30">
          <h3 className="text-xl font-semibold text-white mb-4">Schedule Summary</h3>
          <div className="grid md:grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-green-400">{processedData.filter(item => item.status === 'scheduled').length}</div>
              <div className="text-gray-300">Posts Scheduled</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-400">
                {Math.ceil(processedData.filter(item => item.status === 'scheduled').length / scheduleSettings.postsPerDay)}
              </div>
              <div className="text-gray-300">Days Duration</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-400">{scheduleSettings.postsPerDay}</div>
              <div className="text-gray-300">Posts Per Day</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BulkUpload;