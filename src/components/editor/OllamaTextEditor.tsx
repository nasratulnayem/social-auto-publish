import React, { useState } from 'react';
import { Sparkles, RotateCcw, Wand2, Zap } from 'lucide-react';

interface OllamaTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
  maxLength?: number;
}

const OllamaTextEditor: React.FC<OllamaTextEditorProps> = ({
  value,
  onChange,
  placeholder = 'Enter your text...',
  rows = 3,
  maxLength
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showToneOptions, setShowToneOptions] = useState(false);

  const toneOptions = [
    { id: 'engaging', name: 'Engaging', icon: '🎯', description: 'Catchy and attention-grabbing', color: 'from-orange-500 to-red-500' },
    { id: 'professional', name: 'Professional', icon: '💼', description: 'Formal and business-like', color: 'from-blue-500 to-indigo-500' },
    { id: 'casual', name: 'Casual', icon: '😊', description: 'Friendly and relaxed', color: 'from-green-500 to-teal-500' },
    { id: 'educational', name: 'Educational', icon: '🎓', description: 'Informative and instructive', color: 'from-purple-500 to-pink-500' },
    { id: 'emotional', name: 'Emotional', icon: '❤️', description: 'Heartfelt and touching', color: 'from-pink-500 to-rose-500' },
    { id: 'humorous', name: 'Humorous', icon: '😂', description: 'Fun and entertaining', color: 'from-yellow-500 to-orange-500' }
  ];

  const rewriteWithOllama = async (tone: string) => {
    if (!value.trim()) return;
    
    setIsLoading(true);
    try {
      const settings = JSON.parse(localStorage.getItem('platformSettings') || '{}');
      const ollamaUrl = settings.ollamaUrl || 'https://b3ab5420ac68.ngrok-free.app';
      const ollamaModel = settings.ollamaModel || 'gemma3:1b';

      const response = await fetch(`${ollamaUrl}/api/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: ollamaModel,
          prompt: `Rewrite the following text in a ${tone} tone while keeping the core message intact and making it more ${tone}. Keep it concise and engaging:\n\n"${value}"`,
          stream: false
        })
      });

      if (response.ok) {
        const data = await response.json();
        const rewrittenText = data.response || value;
        onChange(rewrittenText.trim());
      } else {
        console.error('Failed to rewrite text');
        alert('Failed to connect to Ollama. Please check your settings.');
      }
    } catch (error) {
      console.error('Error calling Ollama API:', error);
      alert('Error connecting to Ollama. Please check your settings.');
    } finally {
      setIsLoading(false);
      setShowToneOptions(false);
    }
  };

  return (
    <div className="relative">
      <div className="relative">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={rows}
          maxLength={maxLength}
          className="w-full bg-black/20 border border-purple-500/30 rounded-lg px-4 py-3 pr-12 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 resize-none transition-all"
        />
        
        {/* AI Rewrite Toggle Button */}
        <button
          type="button"
          onClick={() => setShowToneOptions(!showToneOptions)}
          disabled={!value.trim() || isLoading}
          className={`absolute top-3 right-3 p-2 rounded-lg transition-all ${
            value.trim() && !isLoading
              ? 'text-purple-400 hover:text-purple-300 hover:bg-purple-500/20 hover:scale-110'
              : 'text-gray-600'
          }`}
          title="AI Rewrite with Ollama"
        >
          {isLoading ? (
            <RotateCcw className="w-5 h-5 animate-spin" />
          ) : (
            <div className="relative">
              <Wand2 className="w-5 h-5" />
              {value.trim() && !isLoading && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse">
                  <Sparkles className="w-2 h-2 text-white absolute top-0.5 left-0.5" />
                </div>
              )}
            </div>
          )}
        </button>
      </div>

      {/* Character Count */}
      {maxLength && (
        <div className="text-right text-sm text-gray-400 mt-1">
          <span className={value.length > maxLength * 0.9 ? 'text-yellow-400' : value.length === maxLength ? 'text-red-400' : ''}>
            {value.length}/{maxLength}
          </span>
        </div>
      )}

      {/* Tone Options Dropdown */}
      {showToneOptions && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-black/95 backdrop-blur-xl border border-purple-500/30 rounded-xl p-4 z-50 shadow-2xl">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-white font-medium flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-purple-400" />
              <span>Choose writing tone</span>
            </h4>
            <div className="flex items-center space-x-2 text-xs text-gray-400">
              <Zap className="w-3 h-3" />
              <span>Powered by Ollama</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {toneOptions.map((tone) => (
              <button
                key={tone.id}
                onClick={() => rewriteWithOllama(tone.name.toLowerCase())}
                disabled={isLoading}
                className={`flex items-center space-x-3 p-3 bg-gradient-to-r ${tone.color} bg-opacity-20 hover:bg-opacity-30 rounded-lg transition-all text-left disabled:opacity-50 hover:scale-105 hover:shadow-lg border border-white/10`}
              >
                <span className="text-2xl">{tone.icon}</span>
                <div>
                  <div className="text-white font-medium">{tone.name}</div>
                  <div className="text-gray-300 text-sm">{tone.description}</div>
                </div>
              </button>
            ))}
          </div>
          
          <div className="mt-4 pt-3 border-t border-purple-500/20">
            <button
              onClick={() => setShowToneOptions(false)}
              className="w-full text-gray-400 hover:text-white transition-all text-center py-2 hover:bg-white/5 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OllamaTextEditor;