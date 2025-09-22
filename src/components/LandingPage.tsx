import React, { useState } from 'react';
import { Play, CheckCircle, Star, Users, Calendar, Zap } from 'lucide-react';

interface LandingPageProps {
  onLogin: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onLogin }) => {
  const [activeTab, setActiveTab] = useState('info');

  const features = [
    { icon: Calendar, title: 'Smart Scheduling', desc: 'Schedule posts across all platforms with AI optimization' },
    { icon: Zap, title: 'AI Content Generation', desc: 'Generate titles, descriptions with Ollama integration' },
    { icon: Users, title: 'Multi-Platform', desc: 'YouTube, Facebook, Instagram, Pinterest & WordPress' },
    { icon: CheckCircle, title: 'Bulk Upload', desc: 'Upload hundreds of videos with CSV/JSON files' }
  ];

  const plans = [
    {
      name: 'Starter',
      price: '$29',
      features: ['5 Channels', '100 Posts/Month', 'Basic Scheduling', 'Email Support']
    },
    {
      name: 'Professional',
      price: '$79',
      features: ['25 Channels', '1000 Posts/Month', 'AI Content Generation', 'Priority Support', 'Analytics']
    },
    {
      name: 'Enterprise',
      price: '$199',
      features: ['Unlimited Channels', 'Unlimited Posts', 'Custom AI Models', '24/7 Support', 'White Label']
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <nav className="bg-black/20 backdrop-blur-lg border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Play className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">SocialSync Pro</span>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => setActiveTab('info')}
                className={`px-4 py-2 rounded-lg transition-all ${activeTab === 'info' ? 'bg-purple-600 text-white' : 'text-gray-300 hover:text-white'}`}
              >
                Features
              </button>
              <button
                onClick={() => setActiveTab('pricing')}
                className={`px-4 py-2 rounded-lg transition-all ${activeTab === 'pricing' ? 'bg-purple-600 text-white' : 'text-gray-300 hover:text-white'}`}
              >
                Pricing
              </button>
              <button
                onClick={() => setActiveTab('login')}
                className={`px-4 py-2 rounded-lg transition-all ${activeTab === 'login' ? 'bg-purple-600 text-white' : 'text-gray-300 hover:text-white'}`}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {activeTab === 'info' && (
          <div className="space-y-16">
            {/* Hero Section */}
            <div className="text-center space-y-8">
              <h1 className="text-6xl font-bold text-white leading-tight">
                Manage All Your
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent block">
                  Social Media
                </span>
                From One Place
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Upload, schedule, and manage content across YouTube, Facebook, Instagram, Pinterest, and WordPress with AI-powered content generation and smart scheduling.
              </p>
              <button
                onClick={onLogin}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-purple-500 hover:to-pink-500 transition-all transform hover:scale-105"
              >
                Start Free Trial
              </button>
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all">
                  <feature.icon className="w-12 h-12 text-purple-400 mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-300">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'pricing' && (
          <div className="space-y-12">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-white mb-4">Simple, Transparent Pricing</h2>
              <p className="text-xl text-gray-300">Choose the plan that fits your needs</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {plans.map((plan, index) => (
                <div key={index} className={`bg-white/10 backdrop-blur-lg rounded-xl p-8 border ${index === 1 ? 'border-purple-400 scale-105' : 'border-purple-500/20'} hover:border-purple-500/40 transition-all`}>
                  {index === 1 && (
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1 rounded-full text-sm font-medium mb-4 inline-block">
                      Most Popular
                    </div>
                  )}
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <div className="text-4xl font-bold text-purple-400 mb-6">
                    {plan.price}
                    <span className="text-lg text-gray-300">/month</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-gray-300">
                        <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button 
                    onClick={onLogin}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold hover:from-purple-500 hover:to-pink-500 transition-all"
                  >
                    Get Started
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'login' && (
          <div className="max-w-md mx-auto">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-purple-500/20">
              <h2 className="text-3xl font-bold text-white mb-6 text-center">Welcome Back</h2>
              <form className="space-y-6">
                <div>
                  <label className="block text-gray-300 mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full bg-black/20 border border-purple-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Password</label>
                  <input
                    type="password"
                    className="w-full bg-black/20 border border-purple-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                    placeholder="Enter your password"
                  />
                </div>
                <button
                  type="button"
                  onClick={onLogin}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold hover:from-purple-500 hover:to-pink-500 transition-all"
                >
                  Login to Dashboard
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LandingPage;