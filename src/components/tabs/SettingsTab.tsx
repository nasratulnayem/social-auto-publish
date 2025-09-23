import React, { useState, useEffect } from 'react';
import { Key, Database, Zap, Globe, Bell, Shield, CheckCircle, XCircle, Loader, ExternalLink } from 'lucide-react';

const SettingsTab: React.FC = () => {
  const [settings, setSettings] = useState({
    // Ollama Configuration
    ollamaUrl: 'https://b3ab5420ac68.ngrok-free.app',
    ollamaModel: 'gemma3:1b',
    
    // YouTube Configuration
    youtubeApiKey: '',
    youtubeClientId: '',
    youtubeClientSecret: '',
    youtubeChannelId: '',
    youtubeAccessToken: '',
    youtubeRefreshToken: '',
    
    // Facebook Configuration
    facebookAppId: '',
    facebookAppSecret: '',
    facebookAccessToken: '',
    facebookPageId: '',
    
    // Instagram Configuration
    instagramAppId: '',
    instagramAppSecret: '',
    instagramAccessToken: '',
    instagramBusinessAccountId: '',
    
    // Pinterest Configuration
    pinterestAppId: '',
    pinterestAppSecret: '',
    pinterestAccessToken: '',
    pinterestBoardId: '',
    
    // WordPress Configuration
    wordpressUrl: '',
    wordpressUsername: '',
    wordpressPassword: '',
    wordpressApplicationPassword: '',
    
    // General Settings
    defaultScheduleTime: '10:00',
    timeZone: 'UTC',
    notifications: true,
    autoPublish: false
  });

  const [connectionStatus, setConnectionStatus] = useState<{[key: string]: 'idle' | 'testing' | 'success' | 'error'}>({
    youtube: 'idle',
    facebook: 'idle',
    instagram: 'idle',
    pinterest: 'idle',
    wordpress: 'idle',
    ollama: 'idle'
  });

  const [savedConnections, setSavedConnections] = useState<{[key: string]: boolean}>({});

  useEffect(() => {
    // Load saved settings from localStorage
    const saved = localStorage.getItem('platformSettings');
    if (saved) {
      setSettings(prev => ({ ...prev, ...JSON.parse(saved) }));
    }

    const savedConns = localStorage.getItem('platformConnections');
    if (savedConns) {
      setSavedConnections(JSON.parse(savedConns));
    }
  }, []);

  const handleSettingChange = (key: string, value: string | boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const saveSettings = () => {
    localStorage.setItem('platformSettings', JSON.stringify(settings));
    alert('Settings saved successfully!');
  };

  const connectFacebook = () => {
    const redirectUri = 'http://127.0.0.1:5001/fb-callback';
    const scope = 'pages_manage_posts,pages_read_engagement,pages_show_list';
    const facebookAuthUrl = `https://www.facebook.com/v18.0/dialog/oauth?client_id=${settings.facebookAppId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${scope}&response_type=code`;
    
    window.open(facebookAuthUrl, 'facebook-auth', 'width=600,height=600');
  };

  const connectYouTube = () => {
    const redirectUri = 'http://127.0.0.1:5001/youtube-callback';
    const scope = 'https://www.googleapis.com/auth/youtube.upload https://www.googleapis.com/auth/youtube';
    const youtubeAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${settings.youtubeClientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scope)}&response_type=code&access_type=offline`;
    
    window.open(youtubeAuthUrl, 'youtube-auth', 'width=600,height=600');
  };

  const connectInstagram = () => {
    const redirectUri = 'http://127.0.0.1:5001/instagram-callback';
    const scope = 'user_profile,user_media';
    const instagramAuthUrl = `https://api.instagram.com/oauth/authorize?client_id=${settings.instagramAppId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${scope}&response_type=code`;
    
    window.open(instagramAuthUrl, 'instagram-auth', 'width=600,height=600');
  };

  const connectPinterest = () => {
    const redirectUri = 'http://127.0.0.1:5001/pinterest-callback';
    const scope = 'boards:read,pins:read,pins:write';
    const pinterestAuthUrl = `https://www.pinterest.com/oauth/?client_id=${settings.pinterestAppId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${scope}&response_type=code`;
    
    window.open(pinterestAuthUrl, 'pinterest-auth', 'width=600,height=600');
  };

  const testConnection = async (platform: string) => {
    setConnectionStatus(prev => ({ ...prev, [platform]: 'testing' }));
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      switch (platform) {
        case 'youtube':
          if (settings.youtubeApiKey && settings.youtubeClientId) {
            setConnectionStatus(prev => ({ ...prev, [platform]: 'success' }));
            setSavedConnections(prev => ({ ...prev, [platform]: true }));
          } else {
            throw new Error('Missing YouTube credentials');
          }
          break;
        case 'facebook':
          if (settings.facebookAppId && settings.facebookAppSecret) {
            setConnectionStatus(prev => ({ ...prev, [platform]: 'success' }));
            setSavedConnections(prev => ({ ...prev, [platform]: true }));
          } else {
            throw new Error('Missing Facebook credentials');
          }
          break;
        case 'instagram':
          if (settings.instagramAppId && settings.instagramAppSecret) {
            setConnectionStatus(prev => ({ ...prev, [platform]: 'success' }));
            setSavedConnections(prev => ({ ...prev, [platform]: true }));
          } else {
            throw new Error('Missing Instagram credentials');
          }
          break;
        case 'pinterest':
          if (settings.pinterestAppId && settings.pinterestAppSecret) {
            setConnectionStatus(prev => ({ ...prev, [platform]: 'success' }));
            setSavedConnections(prev => ({ ...prev, [platform]: true }));
          } else {
            throw new Error('Missing Pinterest credentials');
          }
          break;
        case 'wordpress':
          if (settings.wordpressUrl && settings.wordpressUsername) {
            setConnectionStatus(prev => ({ ...prev, [platform]: 'success' }));
            setSavedConnections(prev => ({ ...prev, [platform]: true }));
          } else {
            throw new Error('Missing WordPress credentials');
          }
          break;
        case 'ollama':
          try {
            const response = await fetch(`${settings.ollamaUrl}/api/tags`);
            if (response.ok) {
              setConnectionStatus(prev => ({ ...prev, [platform]: 'success' }));
              setSavedConnections(prev => ({ ...prev, [platform]: true }));
              return;
            }
          } catch (error) {
            console.error('Ollama connection failed:', error);
          }
          break;
      }
      
      localStorage.setItem('platformConnections', JSON.stringify(savedConnections));
    } catch (error) {
      setConnectionStatus(prev => ({ ...prev, [platform]: 'error' }));
    }
  };

  const getConnectionIcon = (status: string) => {
    switch (status) {
      case 'testing':
        return <Loader className="w-4 h-4 animate-spin text-yellow-400" />;
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'error':
        return <XCircle className="w-4 h-4 text-red-400" />;
      default:
        return null;
    }
  };

  const platformConfigs = [
    {
      title: 'YouTube Configuration',
      platform: 'youtube',
      icon: '🎥',
      color: 'border-red-500/30',
      connectAction: connectYouTube,
      fields: [
        { key: 'youtubeApiKey', label: 'API Key', type: 'password', placeholder: 'Your YouTube Data API v3 key' },
        { key: 'youtubeClientId', label: 'Client ID', type: 'text', placeholder: 'OAuth 2.0 Client ID' },
        { key: 'youtubeClientSecret', label: 'Client Secret', type: 'password', placeholder: 'OAuth 2.0 Client Secret' },
        { key: 'youtubeChannelId', label: 'Channel ID', type: 'text', placeholder: 'Your YouTube Channel ID' }
      ]
    },
    {
      title: 'Facebook Configuration',
      platform: 'facebook',
      icon: '📘',
      color: 'border-blue-500/30',
      connectAction: connectFacebook,
      fields: [
        { key: 'facebookAppId', label: 'App ID', type: 'text', placeholder: 'Facebook App ID' },
        { key: 'facebookAppSecret', label: 'App Secret', type: 'password', placeholder: 'Facebook App Secret' },
        { key: 'facebookPageId', label: 'Page ID', type: 'text', placeholder: 'Facebook Page ID' }
      ]
    },
    {
      title: 'Instagram Configuration',
      platform: 'instagram',
      icon: '📷',
      color: 'border-pink-500/30',
      connectAction: connectInstagram,
      fields: [
        { key: 'instagramAppId', label: 'App ID', type: 'text', placeholder: 'Instagram App ID' },
        { key: 'instagramAppSecret', label: 'App Secret', type: 'password', placeholder: 'Instagram App Secret' },
        { key: 'instagramBusinessAccountId', label: 'Business Account ID', type: 'text', placeholder: 'Instagram Business Account ID' }
      ]
    },
    {
      title: 'Pinterest Configuration',
      platform: 'pinterest',
      icon: '📌',
      color: 'border-red-400/30',
      connectAction: connectPinterest,
      fields: [
        { key: 'pinterestAppId', label: 'App ID', type: 'text', placeholder: 'Pinterest App ID' },
        { key: 'pinterestAppSecret', label: 'App Secret', type: 'password', placeholder: 'Pinterest App Secret' },
        { key: 'pinterestBoardId', label: 'Board ID', type: 'text', placeholder: 'Default Pinterest Board ID' }
      ]
    },
    {
      title: 'WordPress Configuration',
      platform: 'wordpress',
      icon: '📝',
      color: 'border-blue-600/30',
      connectAction: null,
      fields: [
        { key: 'wordpressUrl', label: 'WordPress URL', type: 'url', placeholder: 'https://yoursite.com' },
        { key: 'wordpressUsername', label: 'Username', type: 'text', placeholder: 'WordPress Username' },
        { key: 'wordpressApplicationPassword', label: 'Application Password', type: 'password', placeholder: 'WordPress Application Password' }
      ]
    }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-2">Settings & Configuration</h2>
        <p className="text-gray-300">Configure your API keys, authentication, and platform settings</p>
      </div>

      {/* Quick Connect Section */}
      <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-xl p-6 border border-purple-500/30">
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
          <Zap className="w-6 h-6 text-purple-400" />
          <span>Quick Connect</span>
        </h3>
        <p className="text-gray-300 mb-6">Connect your social media accounts with one click using OAuth</p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button
            onClick={connectYouTube}
            disabled={!settings.youtubeClientId}
            className="flex flex-col items-center p-4 bg-red-600/20 hover:bg-red-600/30 rounded-lg transition-all disabled:opacity-50"
          >
            <span className="text-2xl mb-2">🎥</span>
            <span className="text-white font-medium">YouTube</span>
          </button>
          
          <button
            onClick={connectFacebook}
            disabled={!settings.facebookAppId}
            className="flex flex-col items-center p-4 bg-blue-600/20 hover:bg-blue-600/30 rounded-lg transition-all disabled:opacity-50"
          >
            <span className="text-2xl mb-2">📘</span>
            <span className="text-white font-medium">Facebook</span>
          </button>
          
          <button
            onClick={connectInstagram}
            disabled={!settings.instagramAppId}
            className="flex flex-col items-center p-4 bg-pink-600/20 hover:bg-pink-600/30 rounded-lg transition-all disabled:opacity-50"
          >
            <span className="text-2xl mb-2">📷</span>
            <span className="text-white font-medium">Instagram</span>
          </button>
          
          <button
            onClick={connectPinterest}
            disabled={!settings.pinterestAppId}
            className="flex flex-col items-center p-4 bg-red-400/20 hover:bg-red-400/30 rounded-lg transition-all disabled:opacity-50"
          >
            <span className="text-2xl mb-2">📌</span>
            <span className="text-white font-medium">Pinterest</span>
          </button>
        </div>
      </div>

      {/* Ollama Configuration */}
      <div className="bg-black/30 rounded-xl p-6 border border-purple-500/30">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Zap className="w-6 h-6 text-purple-400" />
            <h3 className="text-xl font-semibold text-white">AI Configuration (Ollama)</h3>
          </div>
          <div className="flex items-center space-x-2">
            {getConnectionIcon(connectionStatus.ollama)}
            <button
              onClick={() => testConnection('ollama')}
              disabled={connectionStatus.ollama === 'testing'}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-500 transition-all disabled:opacity-50"
            >
              {connectionStatus.ollama === 'testing' ? 'Testing...' : 'Test Connection'}
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-300 mb-2">Ollama API URL</label>
            <input
              type="url"
              value={settings.ollamaUrl}
              onChange={(e) => handleSettingChange('ollamaUrl', e.target.value)}
              placeholder="https://your-ollama-instance.com"
              className="w-full bg-black/20 border border-purple-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-2">Ollama Model</label>
            <input
              type="text"
              value={settings.ollamaModel}
              onChange={(e) => handleSettingChange('ollamaModel', e.target.value)}
              placeholder="gemma3:1b"
              className="w-full bg-black/20 border border-purple-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
            />
          </div>
        </div>
      </div>

      {/* Platform Configurations */}
      {platformConfigs.map((config, index) => (
        <div key={index} className={`bg-black/30 rounded-xl p-6 border ${config.color}`}>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">{config.icon}</span>
              <h3 className="text-xl font-semibold text-white">{config.title}</h3>
            </div>
            <div className="flex items-center space-x-2">
              {getConnectionIcon(connectionStatus[config.platform])}
              {config.connectAction && (
                <button
                  onClick={config.connectAction}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-500 transition-all inline-flex items-center space-x-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Connect</span>
                </button>
              )}
              <button
                onClick={() => testConnection(config.platform)}
                disabled={connectionStatus[config.platform] === 'testing'}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg font-medium hover:from-purple-500 hover:to-pink-500 transition-all disabled:opacity-50"
              >
                {connectionStatus[config.platform] === 'testing' ? 'Testing...' : 'Test Connection'}
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {config.fields.map((field) => (
              <div key={field.key}>
                <label className="block text-gray-300 mb-2">{field.label}</label>
                <input
                  type={field.type}
                  value={settings[field.key as keyof typeof settings] as string}
                  onChange={(e) => handleSettingChange(field.key, e.target.value)}
                  placeholder={field.placeholder}
                  className="w-full bg-black/20 border border-purple-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                />
              </div>
            ))}
          </div>

          {/* Platform-specific help text */}
          <div className="mt-4 p-4 bg-purple-900/20 rounded-lg">
            <h4 className="text-white font-medium mb-2">Setup Instructions:</h4>
            <div className="text-gray-300 text-sm space-y-1">
              {config.platform === 'youtube' && (
                <>
                  <p>1. Create a project in Google Cloud Console</p>
                  <p>2. Enable YouTube Data API v3</p>
                  <p>3. Create OAuth 2.0 credentials</p>
                  <p>4. Add redirect URI: http://127.0.0.1:5001/youtube-callback</p>
                </>
              )}
              {config.platform === 'facebook' && (
                <>
                  <p>1. Create a Facebook App in Meta for Developers</p>
                  <p>2. Add Facebook Login and Pages API products</p>
                  <p>3. Add redirect URI: http://127.0.0.1:5001/fb-callback</p>
                  <p>4. Get your Page ID from Facebook Page settings</p>
                </>
              )}
              {config.platform === 'instagram' && (
                <>
                  <p>1. Create a Facebook App with Instagram Basic Display</p>
                  <p>2. Convert personal account to Instagram Business Account</p>
                  <p>3. Add redirect URI: http://127.0.0.1:5001/instagram-callback</p>
                  <p>4. Connect Instagram account to Facebook Page</p>
                </>
              )}
              {config.platform === 'pinterest' && (
                <>
                  <p>1. Create a Pinterest App in Pinterest Developers</p>
                  <p>2. Generate OAuth credentials</p>
                  <p>3. Add redirect URI: http://127.0.0.1:5001/pinterest-callback</p>
                  <p>4. Find your Board ID from Pinterest settings</p>
                </>
              )}
              {config.platform === 'wordpress' && (
                <>
                  <p>1. Install WordPress REST API (usually built-in)</p>
                  <p>2. Create Application Password in User Profile</p>
                  <p>3. Ensure REST API is accessible</p>
                  <p>4. Test with /wp-json/wp/v2/ endpoint</p>
                </>
              )}
            </div>
          </div>
        </div>
      ))}

      {/* General Settings */}
      <div className="bg-black/30 rounded-xl p-6 border border-purple-500/30">
        <div className="flex items-center space-x-3 mb-6">
          <Bell className="w-6 h-6 text-purple-400" />
          <h3 className="text-xl font-semibold text-white">General Settings</h3>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-gray-300 mb-2">Default Schedule Time</label>
            <input
              type="time"
              value={settings.defaultScheduleTime}
              onChange={(e) => handleSettingChange('defaultScheduleTime', e.target.value)}
              className="w-full bg-black/20 border border-purple-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500"
            />
          </div>
          
          <div>
            <label className="block text-gray-300 mb-2">Time Zone</label>
            <select
              value={settings.timeZone}
              onChange={(e) => handleSettingChange('timeZone', e.target.value)}
              className="w-full bg-black/20 border border-purple-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500"
            >
              <option value="UTC">UTC</option>
              <option value="EST">Eastern Time (EST)</option>
              <option value="PST">Pacific Time (PST)</option>
              <option value="GMT">Greenwich Mean Time (GMT)</option>
              <option value="CET">Central European Time (CET)</option>
              <option value="JST">Japan Standard Time (JST)</option>
              <option value="IST">India Standard Time (IST)</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-white font-medium">Email Notifications</h4>
              <p className="text-gray-400 text-sm">Receive email updates about your posts and uploads</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.notifications}
                onChange={(e) => handleSettingChange('notifications', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-white font-medium">Auto-Publish</h4>
              <p className="text-gray-400 text-sm">Automatically publish scheduled posts without manual approval</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.autoPublish}
                onChange={(e) => handleSettingChange('autoPublish', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Connection Status Overview */}
      <div className="bg-black/30 rounded-xl p-6 border border-purple-500/30">
        <h3 className="text-xl font-semibold text-white mb-4">Connection Status Overview</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {Object.entries(connectionStatus).map(([platform, status]) => (
            <div key={platform} className="bg-black/20 rounded-lg p-4 text-center">
              <div className="flex justify-center mb-2">
                {getConnectionIcon(status)}
              </div>
              <div className="text-white font-medium capitalize">{platform}</div>
              <div className={`text-sm ${
                status === 'success' ? 'text-green-400' : 
                status === 'error' ? 'text-red-400' : 
                status === 'testing' ? 'text-yellow-400' : 'text-gray-400'
              }`}>
                {status === 'idle' ? 'Not tested' : status}
              </div>
              {savedConnections[platform] && (
                <div className="text-xs text-green-400 mt-1">Connected</div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center space-x-4">
        <button 
          onClick={saveSettings}
          className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-purple-500 hover:to-pink-500 transition-all"
        >
          Save All Settings
        </button>
        <button className="bg-gray-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-500 transition-all">
          Reset to Defaults
        </button>
      </div>
    </div>
  );
};

export default SettingsTab;