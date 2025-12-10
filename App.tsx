import React, { useState, useRef, useEffect } from 'react';
import { 
  Camera, 
  Home, 
  TrendingUp, 
  CloudSun, 
  Upload, 
  ChevronRight, 
  ChevronLeft,
  Sprout, 
  ShieldCheck, 
  MapPin, 
  Phone,
  Mic,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  Menu,
  MessageSquare,
  Mail,
  Volume2,
  StopCircle,
  Settings,
  Download,
  WifiOff
} from 'lucide-react';
import html2canvas from 'html2canvas';
import { analyzeCropImage, getMarketAdvice } from './services/geminiService';
import { MarketChart } from './components/MarketChart';
import { AppView, DiseaseAnalysis } from './types';

// --- Utility Components ---

const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'outline' }> = ({ 
  children, variant = 'primary', className = '', ...props 
}) => {
  const baseStyle = "px-4 py-3 rounded-xl font-semibold transition-all duration-200 active:scale-95 flex items-center justify-center gap-2";
  const variants = {
    primary: "bg-emerald-600 text-white shadow-lg shadow-emerald-200 hover:bg-emerald-700",
    secondary: "bg-orange-500 text-white shadow-lg shadow-orange-200 hover:bg-orange-600",
    outline: "border-2 border-emerald-600 text-emerald-700 hover:bg-emerald-50"
  };
  
  return (
    <button className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

// --- Constants ---

const farmerStories = [
  { 
    url: "https://images.unsplash.com/photo-1625246333195-58197bd47d19?auto=format&fit=crop&w=800&q=80", 
    text: "Agri Expert saved my potato crop from blight!", 
    author: "Sita, Gorkha" 
  },
  { 
    url: "https://images.unsplash.com/photo-1595248982379-e3745281222b?auto=format&fit=crop&w=800&q=80", 
    text: "I sold my rice at the highest price this season.", 
    author: "Ram, Pokhara" 
  },
  { 
    url: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?auto=format&fit=crop&w=800&q=80", 
    text: "Weather alerts helped me protect my seedlings.", 
    author: "Hari, Syangja" 
  }
];

// --- Main Views ---

const HomeView: React.FC<{ 
  onViewChange: (v: AppView) => void;
  userAltitude: string;
}> = ({ onViewChange, userAltitude }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const audioText = `Based on your altitude of ${userAltitude}m, verify your potato crops for Late Blight due to recent humidity.`;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % farmerStories.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const handleAudio = () => {
    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }

    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(audioText);
      utterance.onend = () => setIsPlaying(false);
      utterance.rate = 0.9; // Slightly slower for clarity
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
      setIsPlaying(true);
    } else {
      alert("Text-to-speech not supported in this browser.");
    }
  };

  return (
    <div className="space-y-6 pb-20 animate-fade-in">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-emerald-800 to-emerald-600 rounded-3xl p-6 text-white overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 opacity-10">
          <Sprout size={150} />
        </div>
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-emerald-100 text-sm font-medium uppercase tracking-wider">Namaste, Ram</p>
              <h1 className="text-2xl font-bold mt-1">Gandaki Province</h1>
            </div>
            <div className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1 text-xs">
              <Calendar size={12} />
              <span>Mangsir 19</span>
            </div>
          </div>
          
          <div className="flex gap-3 mt-6">
            <div className="flex-1 bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
              <p className="text-xs text-emerald-100">Today's Weather</p>
              <div className="flex items-center gap-2 mt-1">
                <CloudSun size={24} className="text-yellow-300" />
                <span className="text-xl font-bold">18°C</span>
              </div>
              <p className="text-[10px] text-emerald-100 mt-1">Clear Sky • Hum 65%</p>
            </div>
            <div className="flex-1 bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
              <p className="text-xs text-emerald-100">Market Alert</p>
              <div className="flex items-center gap-2 mt-1">
                <TrendingUp size={24} className="text-green-300" />
                <span className="text-xl font-bold">Rice ↑</span>
              </div>
              <p className="text-[10px] text-emerald-100 mt-1">+5% vs last week</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <div 
          onClick={() => onViewChange(AppView.SCANNER)}
          className="bg-white p-5 rounded-2xl shadow-sm border border-emerald-50 flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-emerald-200 transition-colors"
        >
          <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
            <Camera size={24} />
          </div>
          <span className="font-semibold text-gray-700">Scan Crop</span>
        </div>
        <div 
          onClick={() => onViewChange(AppView.MARKET)}
          className="bg-white p-5 rounded-2xl shadow-sm border border-emerald-50 flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-emerald-200 transition-colors"
        >
          <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-orange-600">
            <TrendingUp size={24} />
          </div>
          <span className="font-semibold text-gray-700">Market Prices</span>
        </div>
      </div>

      {/* AI Advisor Teaser */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-5 rounded-2xl border border-blue-100">
        <div className="flex items-start gap-4">
          <div className="bg-blue-600 text-white p-2 rounded-lg mt-1">
            <Mic size={20} />
          </div>
          <div>
            <h3 className="font-bold text-gray-800">Agri Expert Audio Assistant</h3>
            <p className="text-sm text-gray-600 mt-1 leading-relaxed">
              "{audioText}"
            </p>
            <button 
              onClick={handleAudio}
              className={`mt-3 text-xs font-bold flex items-center gap-1 transition-colors ${isPlaying ? 'text-red-500' : 'text-blue-600'}`}
            >
              {isPlaying ? (
                <>
                  <StopCircle size={14} /> Stop Playing
                </>
              ) : (
                <>
                  <Volume2 size={14} /> Listen Full Report
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Community Stories (Happy Farmers) */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-emerald-50 overflow-hidden">
        <h3 className="font-bold text-gray-800 mb-3 px-1">Community Success Stories</h3>
        <div className="relative h-48 rounded-xl overflow-hidden bg-gray-100">
           {farmerStories.map((story, index) => (
             <div 
               key={index}
               className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
             >
               <img 
                 src={story.url} 
                 alt="Happy Farmer" 
                 className="w-full h-full object-cover"
               />
               <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4">
                 <p className="text-white text-sm font-bold leading-tight">"{story.text}"</p>
                 <p className="text-emerald-200 text-xs mt-1 font-medium">- {story.author}</p>
               </div>
             </div>
           ))}
           
           <div className="absolute bottom-2 right-3 flex gap-1">
             {farmerStories.map((_, i) => (
               <div 
                 key={i} 
                 className={`w-1.5 h-1.5 rounded-full ${i === currentSlide ? 'bg-white' : 'bg-white/40'}`}
               />
             ))}
           </div>
        </div>
      </div>
    </div>
  );
};

const ScannerView: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<DiseaseAnalysis | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const resultCardRef = useRef<HTMLDivElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImage(base64String);
        analyze(base64String.split(',')[1]);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyze = async (base64: string) => {
    setAnalyzing(true);
    setResult(null);
    const data = await analyzeCropImage(base64);
    setResult(data);
    setAnalyzing(false);
  };

  const handleDownload = async () => {
    if (!resultCardRef.current) return;
    try {
      const canvas = await html2canvas(resultCardRef.current, {
        backgroundColor: '#ffffff',
        scale: 2 // Higher quality
      });
      const link = document.createElement('a');
      link.download = `agri-expert-diagnosis-${Date.now()}.jpg`;
      link.href = canvas.toDataURL('image/jpeg', 0.9);
      link.click();
    } catch (e) {
      console.error("Failed to save image", e);
      alert("Could not save image.");
    }
  };

  return (
    <div className="pb-24 animate-fade-in h-full flex flex-col">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">AI Crop Doctor</h2>
      
      {!image ? (
        <div className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-emerald-300 rounded-3xl bg-emerald-50/50 p-8 text-center">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mb-4 animate-bounce">
            <Camera size={40} />
          </div>
          <h3 className="text-xl font-semibold text-emerald-900">Take a Photo</h3>
          <p className="text-emerald-700 mt-2 mb-8 max-w-xs">
            Capture a clear image of the affected leaf or plant for instant AI diagnosis.
          </p>
          <input 
            type="file" 
            ref={fileInputRef}
            accept="image/*" 
            capture="environment"
            className="hidden"
            onChange={handleFileChange}
          />
          <Button onClick={() => fileInputRef.current?.click()} className="w-full max-w-xs shadow-xl">
            Open Camera
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="relative rounded-2xl overflow-hidden shadow-lg aspect-video bg-black">
            <img src={image} alt="Crop" className="w-full h-full object-contain" />
            <button 
              onClick={() => setImage(null)}
              className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full backdrop-blur-md"
            >
              <Upload size={16} className="rotate-45" />
            </button>
          </div>

          {analyzing && (
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-emerald-100 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-emerald-200 border-t-emerald-600 mb-4"></div>
              <p className="font-medium text-emerald-800">Agri Expert AI is analyzing...</p>
              <p className="text-xs text-gray-500 mt-1">Checking for 50+ diseases common in Nepal</p>
            </div>
          )}

          {result && (
            <div className="animate-slide-up space-y-4">
              <div ref={resultCardRef} className="bg-white rounded-2xl shadow-lg border border-emerald-100 overflow-hidden">
                <div className={`p-4 ${
                  result.severity === 'Critical' || result.severity === 'High' ? 'bg-red-50 border-b border-red-100' : 'bg-green-50 border-b border-green-100'
                }`}>
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold text-gray-900">{result.name}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                      result.severity === 'Critical' ? 'bg-red-200 text-red-800' : 'bg-green-200 text-green-800'
                    }`}>
                      {result.severity} Risk
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{result.description}</p>
                </div>
                
                <div className="p-5">
                  <h4 className="font-semibold text-gray-800 flex items-center gap-2 mb-3">
                    <ShieldCheck size={18} className="text-emerald-600" />
                    Recommended Treatment
                  </h4>
                  <ul className="space-y-3">
                    {result.treatment.map((step, idx) => (
                      <li key={idx} className="flex gap-3 text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">
                        <span className="flex-shrink-0 w-6 h-6 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center font-bold text-xs">
                          {idx + 1}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 pt-4 border-t border-gray-100 text-center">
                    <p className="text-[10px] text-gray-400">Agri Expert - AI Diagnosis Report</p>
                  </div>
                </div>
              </div>

              <Button 
                onClick={handleDownload} 
                variant="secondary"
                className="w-full flex items-center justify-center gap-2"
              >
                <Download size={18} />
                Save Analysis Card (Offline)
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const MarketView: React.FC = () => {
  const [advice, setAdvice] = useState<string>("Loading market insights...");
  const [isOfflineMode, setIsOfflineMode] = useState(false);
  const [marketItems, setMarketItems] = useState([
    { name: "Mansuli Rice", price: 52, trend: "up", change: "2.5%", demand: "High Demand", icon: "🌾", color: "green" },
    { name: "Red Potato", price: 41, trend: "down", change: "1.2%", demand: "Supply increasing", icon: "🥔", color: "yellow" }
  ]);
  
  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        // Fetch AI advice
        const text = await getMarketAdvice("Rice", 52);
        
        // Check internet for market items simulation
        if (!navigator.onLine) throw new Error("Offline");

        // Simulate fetching updated prices
        const updatedItems = [
          { name: "Mansuli Rice", price: 53, trend: "up", change: "2.8%", demand: "High Demand", icon: "🌾", color: "green" },
          { name: "Red Potato", price: 40, trend: "down", change: "1.5%", demand: "Supply increasing", icon: "🥔", color: "yellow" }
        ];

        if (text === "Advice currently unavailable." || !text) throw new Error("API Unavailable");
        
        setAdvice(text);
        setMarketItems(updatedItems);
        setIsOfflineMode(false);
        
        // Cache data
        localStorage.setItem('cached_market_advice', text);
        localStorage.setItem('cached_market_items', JSON.stringify(updatedItems));

      } catch (e) {
        console.warn("API failed, checking cache...");
        const cachedAdvice = localStorage.getItem('cached_market_advice');
        const cachedItems = localStorage.getItem('cached_market_items');
        
        if (cachedAdvice) setAdvice(cachedAdvice);
        if (cachedItems) setMarketItems(JSON.parse(cachedItems));
        
        if (cachedAdvice || cachedItems) {
          setIsOfflineMode(true);
        } else {
          setAdvice("Advice currently unavailable. Please check internet connection.");
        }
      }
    };

    fetchMarketData();
  }, []);

  return (
    <div className="pb-24 animate-fade-in space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Market Mandi</h2>
          <p className="text-sm text-gray-500">Pokhara Wholesale Market</p>
        </div>
        <button className="text-emerald-600 text-sm font-semibold">Change Market</button>
      </div>

      {isOfflineMode && (
        <div className="bg-amber-50 border border-amber-200 text-amber-800 px-4 py-3 rounded-xl flex items-center gap-3 text-sm animate-pulse">
          <WifiOff size={18} />
          <div>
            <p className="font-bold">⚠️ Offline Mode</p>
            <p className="text-xs">Showing cached data from your last visit.</p>
          </div>
        </div>
      )}

      <MarketChart />

      <div className="grid grid-cols-1 gap-4">
         {marketItems.map((item, index) => (
           <div key={index} className="bg-white p-4 rounded-xl shadow-sm border border-emerald-100 flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full bg-${item.color}-100 flex items-center justify-center text-xl`}>{item.icon}</div>
                <div>
                  <p className="font-bold text-gray-800">{item.name}</p>
                  <p className="text-xs text-gray-500">{item.demand}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-bold text-lg ${item.trend === 'up' ? 'text-emerald-600' : 'text-gray-800'}`}>NPR {item.price}</p>
                <p className={`text-xs font-medium ${item.trend === 'up' ? 'text-green-600' : 'text-red-500'}`}>
                  {item.trend === 'up' ? '▲' : '▼'} {item.change}
                </p>
              </div>
           </div>
         ))}
      </div>

      <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-2xl p-5 text-white shadow-lg">
        <div className="flex items-start gap-3">
          <div className="bg-white/20 p-2 rounded-full">
            <Mic size={20} />
          </div>
          <div>
            <h3 className="font-bold mb-1">AI Market Advisor</h3>
            <p className="text-sm text-emerald-100 italic">"{advice}"</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const ClimateView: React.FC = () => {
  const [weatherData, setWeatherData] = useState({
    temp: 18,
    condition: "Partly Cloudy",
    humidity: 65,
    rain: 10,
    wind: 5
  });
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        if (!navigator.onLine) throw new Error("Offline");
        
        // Simulate API Fetch delay
        await new Promise(r => setTimeout(r, 800));
        
        // Simulate fresh data
        const newData = {
          temp: 18,
          condition: "Partly Cloudy",
          humidity: 65,
          rain: 10,
          wind: 5
        };

        setWeatherData(newData);
        setIsOffline(false);
        localStorage.setItem('cached_weather', JSON.stringify(newData));
      } catch (e) {
        const cached = localStorage.getItem('cached_weather');
        if (cached) {
          setWeatherData(JSON.parse(cached));
          setIsOffline(true);
        }
      }
    };
    fetchWeather();
  }, []);

  return (
    <div className="pb-24 animate-fade-in space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Climate & Calendar</h2>

      {isOffline && (
        <div className="bg-amber-50 border border-amber-200 text-amber-800 px-4 py-3 rounded-xl flex items-center gap-3 text-sm animate-pulse">
          <WifiOff size={18} />
          <div>
            <p className="font-bold">⚠️ Offline Mode</p>
            <p className="text-xs">Showing cached weather data.</p>
          </div>
        </div>
      )}
      
      <div className="bg-white rounded-2xl shadow-sm border border-emerald-100 p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-100 rounded-full -mr-10 -mt-10 opacity-50"></div>
        <div className="relative z-10">
          <div className="flex justify-between items-start">
            <div>
               <h3 className="text-4xl font-bold text-gray-800">{weatherData.temp}°C</h3>
               <p className="text-gray-500 font-medium">{weatherData.condition}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500 font-bold uppercase tracking-wide">Pokhara</p>
              <p className="text-xs text-emerald-600 font-bold">Alt. 1400m</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 mt-6">
            <div className="bg-gray-50 p-2 rounded-lg text-center">
              <p className="text-xs text-gray-500">Humidity</p>
              <p className="font-bold text-gray-800">{weatherData.humidity}%</p>
            </div>
            <div className="bg-gray-50 p-2 rounded-lg text-center">
              <p className="text-xs text-gray-500">Rain</p>
              <p className="font-bold text-gray-800">{weatherData.rain}%</p>
            </div>
            <div className="bg-gray-50 p-2 rounded-lg text-center">
              <p className="text-xs text-gray-500">Wind</p>
              <p className="font-bold text-gray-800">{weatherData.wind} km/h</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-orange-50 rounded-2xl border border-orange-100 p-5">
        <div className="flex items-center gap-3 mb-3">
          <Calendar className="text-orange-600" />
          <h3 className="font-bold text-gray-800">Indigenous Calendar</h3>
        </div>
        <p className="text-sm text-gray-700 leading-relaxed">
          It is <span className="font-bold">Mangsir</span> (Harvest Season).
          Traditional wisdom suggests drying your harvested paddy now before the winter dew increases.
        </p>
        <div className="mt-4 flex gap-2">
          <span className="bg-white px-3 py-1 rounded-full text-xs font-bold text-orange-600 border border-orange-200">Harvest</span>
          <span className="bg-white px-3 py-1 rounded-full text-xs font-bold text-gray-500 border border-gray-200">Processing</span>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-emerald-100 p-5">
        <h3 className="font-bold text-gray-800 mb-4">Altitude Recommendations</h3>
        <div className="space-y-4">
           <div className="flex gap-3">
              <div className="mt-1"><CheckCircle2 size={16} className="text-emerald-500" /></div>
              <div>
                <p className="text-sm font-bold text-gray-800">Mid-Hills (1000m - 1500m)</p>
                <p className="text-xs text-gray-600">Ideal time for planting winter vegetables like Cauliflower and Broad Leaf Mustard (Rayom).</p>
              </div>
           </div>
           <div className="flex gap-3">
              <div className="mt-1"><AlertTriangle size={16} className="text-yellow-500" /></div>
              <div>
                <p className="text-sm font-bold text-gray-800">Frost Alert (High Hills)</p>
                <p className="text-xs text-gray-600">Cover potato seedlings with straw mulch overnight.</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

const SettingsView: React.FC<{
  altitude: string;
  setAltitude: (a: string) => void;
  onBack: () => void;
}> = ({ altitude, setAltitude, onBack }) => {
  const [localAlt, setLocalAlt] = useState(altitude);

  const handleSave = () => {
    setAltitude(localAlt);
    onBack();
  };

  return (
    <div className="pb-24 animate-fade-in space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={onBack} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
          <ChevronLeft size={20} className="text-gray-600" />
        </button>
        <h2 className="text-2xl font-bold text-gray-800">Settings</h2>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-emerald-100 space-y-4">
        <h3 className="font-semibold text-gray-700 flex items-center gap-2">
          <MapPin size={18} className="text-emerald-600" />
          Farm Profile
        </h3>
        <div>
          <label className="block text-sm text-gray-500 mb-2 font-medium">Farm Altitude (meters)</label>
          <input
            type="number"
            value={localAlt}
            onChange={(e) => setLocalAlt(e.target.value)}
            className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-lg font-semibold text-gray-800"
            placeholder="e.g. 1200"
          />
          <p className="text-xs text-gray-400 mt-2">Used for localized disease prediction, weather alerts, and crop recommendations.</p>
        </div>
        <Button onClick={handleSave} className="w-full mt-4">
          Save Profile
        </Button>
      </div>
      
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-emerald-100 space-y-4">
        <h3 className="font-semibold text-gray-700 flex items-center gap-2">
           <Settings size={18} className="text-gray-600" />
           App Preferences
        </h3>
        <div className="flex justify-between items-center py-2 border-b border-gray-50">
          <span className="text-sm text-gray-600">Language</span>
          <span className="text-sm font-bold text-gray-800">English</span>
        </div>
        <div className="flex justify-between items-center py-2">
          <span className="text-sm text-gray-600">Notifications</span>
          <div className="w-10 h-6 bg-emerald-500 rounded-full relative">
            <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main App Shell ---

export default function App() {
  const [currentView, setCurrentView] = useState<AppView>(AppView.HOME);
  const [lang, setLang] = useState<'EN' | 'NP'>('EN');
  const [userAltitude, setUserAltitude] = useState<string>('1200');

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center">
      <div className="w-full max-w-md bg-white min-h-screen shadow-2xl relative flex flex-col">
        
        {/* Header */}
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
              <Sprout size={20} />
            </div>
            <span className="font-bold text-xl text-emerald-900 tracking-tight">Agri Expert</span>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setLang(l => l === 'EN' ? 'NP' : 'EN')}
              className="text-xs font-bold bg-gray-100 px-2 py-1 rounded-md text-gray-600 border border-gray-200"
            >
              {lang === 'EN' ? '🇳🇵 NP' : '🇺🇸 EN'}
            </button>
            <button 
              onClick={() => setCurrentView(AppView.SETTINGS)}
              className="text-gray-600 hover:text-emerald-600 transition-colors"
            >
              <Menu size={24} />
            </button>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 px-6 py-6 overflow-y-auto no-scrollbar scroll-smooth">
          {currentView === AppView.HOME && <HomeView onViewChange={setCurrentView} userAltitude={userAltitude} />}
          {currentView === AppView.SCANNER && <ScannerView />}
          {currentView === AppView.MARKET && <MarketView />}
          {currentView === AppView.CLIMATE && <ClimateView />}
          {currentView === AppView.SETTINGS && (
            <SettingsView 
              altitude={userAltitude} 
              setAltitude={setUserAltitude} 
              onBack={() => setCurrentView(AppView.HOME)} 
            />
          )}
        </main>

        {/* Bottom Navigation */}
        {currentView !== AppView.SETTINGS && (
          <nav className="sticky bottom-0 bg-white border-t border-gray-100 px-6 py-3 flex justify-between items-center z-50 pb-safe">
            <button 
              onClick={() => setCurrentView(AppView.HOME)}
              className={`flex flex-col items-center gap-1 ${currentView === AppView.HOME ? 'text-emerald-600' : 'text-gray-400'}`}
            >
              <Home size={24} strokeWidth={currentView === AppView.HOME ? 2.5 : 2} />
              <span className="text-[10px] font-medium">Home</span>
            </button>
            
            <button 
              onClick={() => setCurrentView(AppView.SCANNER)}
              className={`flex flex-col items-center gap-1 ${currentView === AppView.SCANNER ? 'text-emerald-600' : 'text-gray-400'}`}
            >
              <div className={`p-3 rounded-full -mt-8 shadow-lg border-4 border-white transition-all ${currentView === AppView.SCANNER ? 'bg-emerald-600 text-white transform scale-110' : 'bg-emerald-500 text-white'}`}>
                <Camera size={28} />
              </div>
              <span className="text-[10px] font-medium">Scan</span>
            </button>

            <button 
              onClick={() => setCurrentView(AppView.MARKET)}
              className={`flex flex-col items-center gap-1 ${currentView === AppView.MARKET ? 'text-emerald-600' : 'text-gray-400'}`}
            >
              <TrendingUp size={24} strokeWidth={currentView === AppView.MARKET ? 2.5 : 2} />
              <span className="text-[10px] font-medium">Market</span>
            </button>
            
            <button 
              onClick={() => setCurrentView(AppView.CLIMATE)}
              className={`flex flex-col items-center gap-1 ${currentView === AppView.CLIMATE ? 'text-emerald-600' : 'text-gray-400'}`}
            >
              <CloudSun size={24} strokeWidth={currentView === AppView.CLIMATE ? 2.5 : 2} />
              <span className="text-[10px] font-medium">Climate</span>
            </button>
          </nav>
        )}
      </div>
    </div>
  );
}