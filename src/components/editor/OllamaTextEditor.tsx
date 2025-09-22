import React, { useState } from 'react';
import { Sparkles, RotateCcw, Wand2 } from 'lucide-react';

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
    { id: 'engaging', name: 'Engaging', icon: '🎯', description: 'Catchy and attention-grabbing' },
    { id: 'professional', name: 'Professional', icon: '💼', description: 'Formal and business-like' },
    { id: 'casual', name: 'Casual', icon: '😊', description: 'Friendly and relaxed' },
    { id: 'educational', name: 'Educational', icon: '🎓', description: 'Informative and instructive' },
    { id: 'emotional', name: 'Emotional', icon: '❤️', description: 'Heartfelt and touching' },
    { id: 'humorous', name: 'Humorous', icon: '😂', description: 'Fun and entertaining' }
  ];

  const rewriteWithOllama = async (tone: string) => {
    if (!value.trim()) return;
    
    setIsLoading(true);
    try {
      const response = await fetch('https://b3ab5420ac68.ngrok-free.app/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gemma3:1b',
          prompt: `Rewrite the following text in a ${tone} tone while keeping the core message intact:\n\n"${value}"`,
          stream: false
        })
      });

      if (response.ok) {
        const data = await response.json();
        onChange(data.response || value);
      } else {
        console.error('Failed to rewrite text');
      }
    } catch (error) {
      console.error('Error calling Ollama API:', error);
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
          className="w-full bg-black/20 border border-purple-500/30 rounded-lg px-4 py-3 pr-12 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 resize-none"
        />
        
        {/* AI Rewrite Toggle Button */}
        <button
          type="button"
          onClick={() => setShowToneOptions(!showToneOptions)}
          disabled={!value.trim() || isLoading}
          className={`absolute top-3 right-3 p-2 rounded-lg transition-all ${
            value.trim() && !isLoading
              ? 'text-purple-400 hover:text-purple-300 hover:bg-purple-500/20'
              : 'text-gray-600'
          }`}
          title="AI Rewrite with Ollama"
        >
          {isLoading ? (
            <RotateCcw className="w-5 h-5 animate-spin" />
          ) : (
            <Wand2 className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Character Count */}
      {maxLength && (
        <div className="text-right text-sm text-gray-400 mt-1">
          {value.length}/{maxLength}
        </div>
      )}

      {/* Tone Options Dropdown */}
      {showToneOptions && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-black/90 backdrop-blur-lg border border-purple-500/30 rounded-xl p-4 z-10">
          <h4 className="text-white font-medium mb-3 flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-purple-400" />
            <span>Choose writing tone</span>
          </h4>
          
          <div className="grid grid-cols-2 gap-3">
            {toneOptions.map((tone) => (
              <button
                key={tone.id}
                onClick={() => rewriteWithOllama(tone.name.toLowerCase())}
                disabled={isLoading}
                className="flex items-center space-x-3 p-3 bg-white/10 hover:bg-white/20 rounded-lg transition-all text-left disabled:opacity-50"
              >
                <span className="text-2xl">{tone.icon}</span>
                <div>
                  <div className="text-white font-medium">{tone.name}</div>
                  <div className="text-gray-400 text-sm">{tone.description}</div>
                </div>
              </button>
            ))}
          </div>
          
          <button
            onClick={() => setShowToneOptions(false)}
            className="w-full mt-3 text-gray-400 hover:text-white transition-all text-center py-2"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default OllamaTextEditor;