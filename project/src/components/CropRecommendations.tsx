import React, { useState } from 'react';
import { Sprout, TrendingUp, Calendar, DollarSign, Droplets, Zap } from 'lucide-react';
import { SoilData, CropRecommendation } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

const CropRecommendations: React.FC = () => {
  const { t } = useLanguage();
  const [soilData, setSoilData] = useState<Partial<SoilData>>({
    pH: 6.5,
    nitrogen: 40,
    phosphorus: 30,
    potassium: 25,
    temperature: 25,
    humidity: 65,
    rainfall: 800,
    location: 'Harare'
  });
  const [recommendations, setRecommendations] = useState<CropRecommendation[]>([]);
  const [loading, setLoading] = useState(false);

  const getMockRecommendations = (data: Partial<SoilData>): CropRecommendation[] => {
    // Mock ML algorithm logic
    const baseRecommendations = [
      {
        id: '1',
        crop: 'Maize',
        confidence: 0.92,
        season: 'Rainy Season',
        expectedYield: 4.5,
        plantingDate: '2024-11-15',
        harvestDate: '2025-04-15',
        requirements: {
          water: 'Moderate to High',
          fertilizer: 'NPK 10-10-10',
          pestControl: 'Cutworm, Aphid control'
        },
        marketPrice: 350,
        profitability: 85
      },
      {
        id: '2',
        crop: 'Tomatoes',
        confidence: 0.87,
        season: 'Dry Season',
        expectedYield: 12,
        plantingDate: '2024-05-01',
        harvestDate: '2024-08-15',
        requirements: {
          water: 'High with drip irrigation',
          fertilizer: 'High calcium fertilizer',
          pestControl: 'Blight prevention'
        },
        marketPrice: 80,
        profitability: 78
      },
      {
        id: '3',
        crop: 'Beans',
        confidence: 0.81,
        season: 'Rainy Season',
        expectedYield: 1.8,
        plantingDate: '2024-12-01',
        harvestDate: '2025-03-01',
        requirements: {
          water: 'Moderate',
          fertilizer: 'Low nitrogen, high phosphorus',
          pestControl: 'Bean beetle control'
        },
        marketPrice: 400,
        profitability: 72
      }
    ];

    // Adjust confidence based on soil conditions
    return baseRecommendations.map(rec => ({
      ...rec,
      confidence: Math.min(rec.confidence + (Math.random() * 0.1 - 0.05), 0.95)
    })).sort((a, b) => b.confidence - a.confidence);
  };

  const handleGetRecommendations = async () => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const recs = getMockRecommendations(soilData);
      setRecommendations(recs);
      setLoading(false);
    }, 2000);
  };

  const handleInputChange = (field: keyof SoilData, value: number | string) => {
    setSoilData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{t.crops.title}</h1>
        <p className="text-gray-600">{t.crops.subtitle}</p>
      </div>

      {/* Soil Data Input */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <Zap className="w-5 h-5 mr-2 text-green-600" />
          {t.crops.inputSoil}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">pH Level</label>
            <input
              type="number"
              step="0.1"
              value={soilData.pH || ''}
              onChange={(e) => handleInputChange('pH', parseFloat(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="6.0 - 8.0"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nitrogen (ppm)</label>
            <input
              type="number"
              value={soilData.nitrogen || ''}
              onChange={(e) => handleInputChange('nitrogen', parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="20 - 60"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phosphorus (ppm)</label>
            <input
              type="number"
              value={soilData.phosphorus || ''}
              onChange={(e) => handleInputChange('phosphorus', parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="15 - 45"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Potassium (ppm)</label>
            <input
              type="number"
              value={soilData.potassium || ''}
              onChange={(e) => handleInputChange('potassium', parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="10 - 40"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Temperature (°C)</label>
            <input
              type="number"
              value={soilData.temperature || ''}
              onChange={(e) => handleInputChange('temperature', parseFloat(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="15 - 35"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Humidity (%)</label>
            <input
              type="number"
              value={soilData.humidity || ''}
              onChange={(e) => handleInputChange('humidity', parseFloat(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="40 - 80"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Rainfall (mm/year)</label>
            <input
              type="number"
              value={soilData.rainfall || ''}
              onChange={(e) => handleInputChange('rainfall', parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="300 - 1200"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <input
              type="text"
              value={soilData.location || ''}
              onChange={(e) => handleInputChange('location', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Your location"
            />
          </div>
        </div>
        
        <div className="mt-6">
          <button
            onClick={handleGetRecommendations}
            disabled={loading}
            className="w-full md:w-auto px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
          >
            {loading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Analyzing...
              </div>
            ) : (
              <>
                <Sprout className="w-5 h-5 mr-2" />
                {t.crops.getRecommendations}
              </>
            )}
          </button>
        </div>
      </div>

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">Your Personalized Crop Recommendations</h2>
          
          <div className="grid gap-6">
            {recommendations.map((rec, index) => (
              <div key={rec.id} className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <div className="bg-green-100 p-2 rounded-lg mr-3">
                      <Sprout className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{rec.crop}</h3>
                      <p className="text-sm text-gray-600">{rec.season}</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="flex items-center mb-1">
                      <span className="text-sm text-gray-600 mr-2">{t.crops.confidence}:</span>
                      <span className="text-lg font-semibold text-green-600">
                        {Math.round(rec.confidence * 100)}%
                      </span>
                    </div>
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-600 h-2 rounded-full"
                        style={{ width: `${rec.confidence * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  <div className="flex items-center">
                    <TrendingUp className="w-4 h-4 text-gray-500 mr-2" />
                    <div>
                      <p className="text-sm text-gray-600">Expected Yield</p>
                      <p className="font-semibold">{rec.expectedYield} tonnes/ha</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 text-gray-500 mr-2" />
                    <div>
                      <p className="text-sm text-gray-600">Planting Date</p>
                      <p className="font-semibold">{new Date(rec.plantingDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <DollarSign className="w-4 h-4 text-gray-500 mr-2" />
                    <div>
                      <p className="text-sm text-gray-600">Market Price</p>
                      <p className="font-semibold">${rec.marketPrice}/tonne</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <TrendingUp className="w-4 h-4 text-gray-500 mr-2" />
                    <div>
                      <p className="text-sm text-gray-600">Profitability</p>
                      <p className="font-semibold text-green-600">{rec.profitability}%</p>
                    </div>
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Requirements:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                    <div>
                      <span className="font-medium text-gray-700">Water:</span>
                      <span className="ml-1 text-gray-600">{rec.requirements.water}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Fertilizer:</span>
                      <span className="ml-1 text-gray-600">{rec.requirements.fertilizer}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Pest Control:</span>
                      <span className="ml-1 text-gray-600">{rec.requirements.pestControl}</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">Rate this recommendation:</span>
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <button
                          key={rating}
                          className="text-gray-300 hover:text-yellow-400 transition-colors"
                        >
                          <TrendingUp className="w-4 h-4" />
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm">
                    Add to Farm Plan
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CropRecommendations;