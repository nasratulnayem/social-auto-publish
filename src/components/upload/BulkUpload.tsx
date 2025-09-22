import React, { useState } from 'react';
import { Upload, FileText, Download, Calendar, Play } from 'lucide-react';

interface BulkUploadProps {
  platform: string;
}

const BulkUpload: React.FC<BulkUploadProps> = ({ platform }) => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [processedData, setProcessedData] = useState<any[]>([]);
  const [scheduleSettings, setScheduleSettings] = useState({
    startDate: '',
    postsPerDay: 3,
    timeSlots: ['10:00', '14:00', '18:00']
  });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      // Mock processing - in real app would parse CSV/JSON
      const mockData = Array.from({ length: 100 }, (_, i) => ({
        id: i + 1,
        title: `Video Title ${i + 1}`,
        description: `Description for video ${i + 1}`,
        tags: `tag${i + 1}, video, content`,
        status: 'pending',
        scheduledDate: null
      }));
      setProcessedData(mockData);
    }
  };

  const generateSchedule = () => {
    const startDate = new Date(scheduleSettings.startDate);
    const updatedData = processedData.map((item, index) => {
      const dayOffset = Math.floor(index / scheduleSettings.postsPerDay);
      const timeSlotIndex = index % scheduleSettings.postsPerDay;
      const scheduledDate = new Date(startDate);
      scheduledDate.setDate(scheduledDate.getDate() + dayOffset);
      
      return {
        ...item,
        scheduledDate: scheduledDate.toISOString().split('T')[0],
        scheduledTime: scheduleSettings.timeSlots[timeSlotIndex] || '10:00',
        status: 'scheduled'
      };
    });
    
    setProcessedData(updatedData);
  };

  const downloadTemplate = () => {
    const template = platform === 'youtube' 
      ? 'Title,Description,Tags,Category,Visibility,VideoFile\nSample Title,Sample Description,tag1 tag2 tag3,Education,public,video1.mp4'
      : 'Title,Content,Tags,MediaFile\nSample Post,Sample content with hashtags,#tag1 #tag2,image1.jpg';
    
    const blob = new Blob([template], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${platform}_template.csv`;
    a.click();
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Bulk Upload for {platform.charAt(0).toUpperCase() + platform.slice(1)}</h2>
        <p className="text-gray-300">Upload multiple posts with CSV or JSON files</p>
      </div>

      {/* File Upload */}
      <div className="bg-purple-900/20 border-2 border-dashed border-purple-500/30 rounded-xl p-8 text-center hover:border-purple-500/50 transition-all">
        <FileText className="w-16 h-16 text-purple-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-white mb-2">Upload CSV or JSON File</h3>
        <p className="text-gray-300 mb-4">Upload your bulk content file with titles, descriptions, and metadata</p>
        
        <div className="flex justify-center space-x-4">
          <input
            type="file"
            accept=".csv,.json"
            onChange={handleFileUpload}
            className="hidden"
            id="bulk-upload"
          />
          <label
            htmlFor="bulk-upload"
            className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-500 transition-all cursor-pointer inline-flex items-center space-x-2"
          >
            <Upload className="w-5 h-5" />
            <span>Choose File</span>
          </label>
          
          <button
            onClick={downloadTemplate}
            className="bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-500 transition-all inline-flex items-center space-x-2"
          >
            <Download className="w-5 h-5" />
            <span>Download Template</span>
          </button>
        </div>
        
        {uploadedFile && (
          <p className="text-green-400 mt-4">✓ {uploadedFile.name} uploaded ({processedData.length} items)</p>
        )}
      </div>

      {/* Schedule Settings */}
      {processedData.length > 0 && (
        <div className="bg-black/30 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Schedule Settings</h3>
          
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-gray-300 mb-2">Start Date</label>
              <input
                type="date"
                value={scheduleSettings.startDate}
                onChange={(e) => setScheduleSettings(prev => ({ ...prev, startDate: e.target.value }))}
                className="w-full bg-black/20 border border-purple-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500"
              />
            </div>
            
            <div>
              <label className="block text-gray-300 mb-2">Posts Per Day</label>
              <select
                value={scheduleSettings.postsPerDay}
                onChange={(e) => setScheduleSettings(prev => ({ ...prev, postsPerDay: parseInt(e.target.value) }))}
                className="w-full bg-black/20 border border-purple-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500"
              >
                <option value={1}>1 post</option>
                <option value={2}>2 posts</option>
                <option value={3}>3 posts</option>
                <option value={4}>4 posts</option>
              </select>
            </div>
            
            <div>
              <label className="block text-gray-300 mb-2">Time Slots</label>
              <input
                type="text"
                value={scheduleSettings.timeSlots.join(', ')}
                onChange={(e) => setScheduleSettings(prev => ({ ...prev, timeSlots: e.target.value.split(', ') }))}
                placeholder="10:00, 14:00, 18:00"
                className="w-full bg-black/20 border border-purple-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>
          
          <button
            onClick={generateSchedule}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-500 transition-all inline-flex items-center space-x-2"
          >
            <Calendar className="w-5 h-5" />
            <span>Generate Schedule</span>
          </button>
        </div>
      )}

      {/* Data Preview */}
      {processedData.length > 0 && (
        <div className="bg-black/30 rounded-xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-white">Content Preview ({processedData.length} items)</h3>
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-500 transition-all inline-flex items-center space-x-2">
              <Play className="w-4 h-4" />
              <span>Start Bulk Upload</span>
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-white">
              <thead>
                <tr className="border-b border-purple-500/20">
                  <th className="text-left py-3 px-2">#</th>
                  <th className="text-left py-3 px-2">Title</th>
                  <th className="text-left py-3 px-2">Status</th>
                  <th className="text-left py-3 px-2">Scheduled</th>
                </tr>
              </thead>
              <tbody>
                {processedData.slice(0, 10).map((item) => (
                  <tr key={item.id} className="border-b border-purple-500/10 hover:bg-white/5">
                    <td className="py-3 px-2">{item.id}</td>
                    <td className="py-3 px-2">{item.title}</td>
                    <td className="py-3 px-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        item.status === 'scheduled' ? 'bg-blue-600' : 'bg-gray-600'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3 px-2">
                      {item.scheduledDate ? `${item.scheduledDate} ${item.scheduledTime}` : '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {processedData.length > 10 && (
              <p className="text-gray-400 mt-4 text-center">Showing 10 of {processedData.length} items</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BulkUpload;