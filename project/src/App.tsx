import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import Navigation from './components/Navigation';
import AgriculturalChatbot from './components/ChatInterface';
import CropRecommendations from './components/CropRecommendations';
import WeatherDashboard from './components/WeatherDashboard';
import UserProfile from './components/UserProfile';
import AuthForm from './components/AuthForm';

const AppContent: React.FC = () => {
  const { isAuthenticated, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('chat');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Mudhumeni AI...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AuthForm />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'chat':
        return <AgriculturalChatbot />;
      case 'crops':
        return <CropRecommendations />;
      case 'weather':
        return <WeatherDashboard />;
      case 'profile':
        return <UserProfile />;
      default:
        return <AgriculturalChatbot />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Navigation
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />
      
      <div className="flex-1 flex flex-col md:ml-0">
        {/* Mobile header spacer */}
        <div className="h-16 md:hidden"></div>
        
        {/* Main content */}
        <main className="flex-1 overflow-hidden">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </AuthProvider>
  );
}

export default App;