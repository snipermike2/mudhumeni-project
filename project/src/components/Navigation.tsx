import React from 'react';
import { MessageCircle, Sprout, Cloud, User, Menu } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, setActiveTab, isOpen, setIsOpen }) => {
  const { t } = useLanguage();

  const tabs = [
    { id: 'chat', label: t.navigation.chat, icon: MessageCircle },
    { id: 'crops', label: t.navigation.crops, icon: Sprout },
    { id: 'weather', label: t.navigation.weather, icon: Cloud },
    { id: 'profile', label: t.navigation.profile, icon: User },
  ];

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-green-600 text-white p-4 z-50">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">{t.appName}</h1>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-md hover:bg-green-700 transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed md:relative inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="p-6 border-b">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
              <Sprout className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">{t.appName}</h1>
              <p className="text-sm text-gray-600">{t.tagline}</p>
            </div>
          </div>
        </div>

        <nav className="mt-6">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setIsOpen(false);
                }}
                className={`
                  w-full flex items-center space-x-3 px-6 py-3 text-left transition-colors
                  ${activeTab === tab.id
                    ? 'bg-green-50 text-green-700 border-r-4 border-green-600'
                    : 'text-gray-700 hover:bg-gray-50'
                  }
                `}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{tab.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
          <div className="text-xs text-gray-500 text-center">
            <p>Offline Mode Available</p>
            <div className="flex items-center justify-center mt-1">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              <span>Connected</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;