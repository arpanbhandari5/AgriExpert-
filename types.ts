export interface DiseaseAnalysis {
  name: string;
  confidence: number;
  description: string;
  treatment: string[];
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  isPlant: boolean;
}

export interface MarketItem {
  crop: string;
  price: number;
  trend: 'up' | 'down' | 'stable';
  prediction: string;
}

export enum AppView {
  HOME = 'HOME',
  SCANNER = 'SCANNER',
  MARKET = 'MARKET',
  CLIMATE = 'CLIMATE',
  SETTINGS = 'SETTINGS'
}

export interface WeatherData {
  temp: number;
  condition: string;
  altitude: number;
  humidity: number;
}