import React, { useState, useEffect } from 'react';
import { Cloud, Sun, CloudRain, Wind, Thermometer, Droplets, Eye, Gauge } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface WeatherData {
  current: {
    temperature: number;
    humidity: number;
    windSpeed: number;
    pressure: number;
    visibility: number;
    condition: string;
    icon: string;
  };
  forecast: Array<{
    date: string;
    high: number;
    low: number;
    condition: string;
    icon: string;
    precipitation: number;
  }>;
}

const WeatherDashboard: React.FC = () => {
  const { t } = useLanguage();
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock weather data
    setTimeout(() => {
      setWeather({
        current: {
          temperature: 28,
          humidity: 65,
          windSpeed: 12,
          pressure: 1013,
          visibility: 10,
          condition: 'Partly Cloudy',
          icon: 'partly-cloudy'
        },
        forecast: [
          { date: '2024-01-15', high: 30, low: 18, condition: 'Sunny', icon: 'sunny', precipitation: 0 },
          { date: '2024-01-16', high: 32, low: 20, condition: 'Partly Cloudy', icon: 'partly-cloudy', precipitation: 10 },
          { date: '2024-01-17', high: 25, low: 16, condition: 'Rainy', icon: 'rainy', precipitation: 85 },
          { date: '2024-01-18', high: 27, low: 17, condition: 'Cloudy', icon: 'cloudy', precipitation: 40 },
          { date: '2024-01-19', high: 29, low: 19, condition: 'Sunny', icon: 'sunny', precipitation: 0 },
        ]
      });
      setLoading(false);
    }, 1000);
  }, []);

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case 'sunny': return Sun;
      case 'partly-cloudy': return Cloud;
      case 'cloudy': return Cloud;
      case 'rainy': return CloudRain;
      default: return Sun;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (!weather) return null;

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Weather & Climate</h1>
        <p className="text-gray-600">Real-time weather data for your farming decisions</p>
      </div>

      {/* Current Weather */}
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold mb-1">Harare, Zimbabwe</h2>
            <p className="text-blue-100">Current Weather</p>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold">{weather.current.temperature}°C</div>
            <div className="text-blue-100">{weather.current.condition}</div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center space-x-2">
            <Droplets className="w-5 h-5 text-blue-200" />
            <div>
              <p className="text-sm text-blue-200">Humidity</p>
              <p className="font-semibold">{weather.current.humidity}%</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Wind className="w-5 h-5 text-blue-200" />
            <div>
              <p className="text-sm text-blue-200">Wind Speed</p>
              <p className="font-semibold">{weather.current.windSpeed} km/h</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Gauge className="w-5 h-5 text-blue-200" />
            <div>
              <p className="text-sm text-blue-200">Pressure</p>
              <p className="font-semibold">{weather.current.pressure} hPa</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Eye className="w-5 h-5 text-blue-200" />
            <div>
              <p className="text-sm text-blue-200">Visibility</p>
              <p className="font-semibold">{weather.current.visibility} km</p>
            </div>
          </div>
        </div>
      </div>

      {/* 5-Day Forecast */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">5-Day Forecast</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {weather.forecast.map((day, index) => {
            const Icon = getWeatherIcon(day.icon);
            const date = new Date(day.date);
            const dayName = index === 0 ? 'Today' : date.toLocaleDateString('en-US', { weekday: 'short' });
            
            return (
              <div key={day.date} className="text-center p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="font-semibold text-gray-900 mb-2">{dayName}</div>
                <div className="flex justify-center mb-2 text-gray-600">
                  <Icon className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <div className="font-semibold text-gray-900">{day.high}°</div>
                  <div className="text-sm text-gray-600">{day.low}°</div>
                  <div className="text-xs text-blue-600">{day.precipitation}%</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Farming Insights */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Farming Insights</h2>
        
        <div className="space-y-4">
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-start space-x-3">
              <div className="bg-green-500 rounded-full p-1">
                <Droplets className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-green-900">Irrigation Recommendation</h3>
                <p className="text-green-800 text-sm">
                  With 65% humidity and no rain expected for 2 days, consider light irrigation for sensitive crops.
                </p>
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start space-x-3">
              <div className="bg-blue-500 rounded-full p-1">
                <CloudRain className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-blue-900">Rainfall Alert</h3>
                <p className="text-blue-800 text-sm">
                  Heavy rain expected on January 17th (85% chance). Prepare drainage and harvest ready crops.
                </p>
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-start space-x-3">
              <div className="bg-yellow-500 rounded-full p-1">
                <Thermometer className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-yellow-900">Temperature Advisory</h3>
                <p className="text-yellow-800 text-sm">
                  Optimal temperature for most crops. Good conditions for planting tomatoes and peppers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Historical Data */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">This Month's Summary</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">425mm</div>
            <div className="text-sm text-gray-600">Total Rainfall</div>
            <div className="text-xs text-green-600 mt-1">15% above average</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">26.5°C</div>
            <div className="text-sm text-gray-600">Average Temperature</div>
            <div className="text-xs text-green-600 mt-1">2°C above average</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-teal-600">12</div>
            <div className="text-sm text-gray-600">Sunny Days</div>
            <div className="text-xs text-yellow-600 mt-1">Average for season</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherDashboard;