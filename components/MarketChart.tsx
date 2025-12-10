import React, { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

// Simulated data for different time ranges
const data1W = [
  { day: 'Mon', rice: 45, maize: 30, potato: 35 },
  { day: 'Tue', rice: 46, maize: 32, potato: 34 },
  { day: 'Wed', rice: 48, maize: 31, potato: 36 },
  { day: 'Thu', rice: 47, maize: 33, potato: 38 },
  { day: 'Fri', rice: 50, maize: 34, potato: 40 },
  { day: 'Sat', rice: 52, maize: 35, potato: 42 },
  { day: 'Sun', rice: 51, maize: 36, potato: 41 },
];

const data1M = Array.from({ length: 15 }, (_, i) => ({
  day: `${i * 2 + 1}`,
  rice: 45 + Math.random() * 10,
  maize: 30 + Math.random() * 5,
  potato: 35 + Math.random() * 15
}));

const data3M = Array.from({ length: 12 }, (_, i) => ({
  day: `W${i + 1}`,
  rice: 40 + Math.random() * 15,
  maize: 28 + Math.random() * 8,
  potato: 30 + Math.random() * 20
}));

type TimeRange = '1W' | '1M' | '3M';

export const MarketChart: React.FC = () => {
  const [range, setRange] = useState<TimeRange>('1W');

  const getData = () => {
    switch (range) {
      case '1M': return data1M;
      case '3M': return data3M;
      default: return data1W;
    }
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-emerald-100">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-semibold text-emerald-800">Price Trends (NPR/kg)</h3>
        <div className="flex bg-gray-100 rounded-lg p-1">
          {(['1W', '1M', '3M'] as TimeRange[]).map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
                range === r 
                ? 'bg-white text-emerald-600 shadow-sm' 
                : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>
      
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={getData()}>
            <defs>
              <linearGradient id="colorRice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#059669" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#059669" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
            <XAxis 
              dataKey="day" 
              tick={{fontSize: 10, fill: '#6b7280'}} 
              axisLine={false}
              tickLine={false}
              interval={range === '1W' ? 0 : 2}
            />
            <YAxis 
              tick={{fontSize: 10, fill: '#6b7280'}} 
              axisLine={false}
              tickLine={false}
              domain={['dataMin - 5', 'dataMax + 5']}
            />
            <Tooltip 
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Area 
              type="monotone" 
              dataKey="rice" 
              stroke="#059669" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorRice)" 
              name="Rice (Mansuli)"
            />
            <Line 
              type="monotone" 
              dataKey="potato" 
              stroke="#ca8a04" 
              strokeWidth={2} 
              dot={false} 
              name="Red Potato" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};