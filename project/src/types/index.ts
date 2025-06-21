export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  preferredLanguage: 'en' | 'sn' | 'nd';
  farmSize: number;
  primaryCrops: string[];
}

export interface SoilData {
  pH: number;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  temperature: number;
  humidity: number;
  rainfall: number;
  location: string;
  timestamp: Date;
}

export interface CropRecommendation {
  id: string;
  crop: string;
  confidence: number;
  season: string;
  expectedYield: number;
  plantingDate: string;
  harvestDate: string;
  requirements: {
    water: string;
    fertilizer: string;
    pestControl: string;
  };
  marketPrice: number;
  profitability: number;
}

export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  language: 'en' | 'sn' | 'nd';
  rating?: number;
  feedback?: string;
  confidence?: number;
}

export interface FeedbackData {
  id: string;
  type: 'chat' | 'crop_recommendation';
  targetId: string;
  rating: number;
  comment: string;
  userId: string;
  timestamp: Date;
}

export interface AIResponse {
  response: string;
  confidence: number;
  sources?: string[];
  followUpQuestions?: string[];
}