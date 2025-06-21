import React, { useState } from 'react';
import { User, Settings, Globe, Smartphone, MapPin, Sprout, Star } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';

const UserProfile: React.FC = () => {
  const { user, logout } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const [activeTab, setActiveTab] = useState('profile');

  if (!user) return null;

  const handleLanguageChange = (newLanguage: 'en' | 'sn' | 'nd') => {
    setLanguage(newLanguage);
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'feedback', label: 'Feedback', icon: Star },
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center">
            <User className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
            <p className="text-gray-600">{user.email}</p>
            <div className="flex items-center mt-2 text-sm text-gray-500">
              <MapPin className="w-4 h-4 mr-1" />
              {user.location}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-4">Farm Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Farm Size</label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="number"
                        step="0.1"
                        value={user.farmSize}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                      <span className="text-sm text-gray-600">hectares</span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Primary Crops</label>
                    <div className="flex flex-wrap gap-2">
                      {user.primaryCrops.map((crop, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm flex items-center"
                        >
                          <Sprout className="w-3 h-3 mr-1" />
                          {crop}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      value={user.phone}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    <input
                      type="text"
                      value={user.location}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  Update Profile
                </button>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-4">Language Preferences</h2>
                <div className="space-y-3">
                  {[
                    { code: 'en', name: 'English', flag: '🇬🇧' },
                    { code: 'sn', name: 'Shona', flag: '🇿🇼' },
                    { code: 'nd', name: 'Ndebele', flag: '🇿🇼' }
                  ].map((lang) => (
                    <label key={lang.code} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                      <input
                        type="radio"
                        name="language"
                        value={lang.code}
                        checked={language === lang.code}
                        onChange={(e) => handleLanguageChange(e.target.value as 'en' | 'sn' | 'nd')}
                        className="text-green-600 focus:ring-green-500"
                      />
                      <span className="text-2xl">{lang.flag}</span>
                      <span className="font-medium">{lang.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4">Notifications</h2>
                <div className="space-y-3">
                  <label className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Smartphone className="w-5 h-5 text-gray-600" />
                      <span>Push Notifications</span>
                    </div>
                    <input type="checkbox" defaultChecked className="text-green-600 focus:ring-green-500" />
                  </label>
                  
                  <label className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Globe className="w-5 h-5 text-gray-600" />
                      <span>Weather Alerts</span>
                    </div>
                    <input type="checkbox" defaultChecked className="text-green-600 focus:ring-green-500" />
                  </label>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4">Offline Mode</h2>
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="font-medium text-blue-900">Offline Mode Available</span>
                  </div>
                  <p className="text-sm text-blue-800">
                    Your conversations and crop data are cached locally for offline access. 
                    Sync will occur automatically when connection is restored.
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t">
                <button
                  onClick={logout}
                  className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Sign Out
                </button>
              </div>
            </div>
          )}

          {activeTab === 'feedback' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-4">Your Feedback History</h2>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Crop Recommendation: Maize</span>
                      <div className="flex items-center">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="w-4 h-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">
                      "Very accurate recommendation! The yield was exactly as predicted."
                    </p>
                    <p className="text-xs text-gray-500 mt-2">January 10, 2024</p>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">AI Chat: Pest Control</span>
                      <div className="flex items-center">
                        {[1, 2, 3, 4].map((star) => (
                          <Star key={star} className="w-4 h-4 text-yellow-400 fill-current" />
                        ))}
                        <Star className="w-4 h-4 text-gray-300" />
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">
                      "Good advice on aphid control, but could use more local pest information."
                    </p>
                    <p className="text-xs text-gray-500 mt-2">January 8, 2024</p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4">Share General Feedback</h2>
                <div className="space-y-4">
                  <textarea
                    placeholder="Tell us how we can improve Mudhumeni AI..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    rows={4}
                  />
                  <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                    Submit Feedback
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;