import React from 'react';
import { MapPin, Zap } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-900 border-b border-gray-700 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-lg">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">GeoEnergy</h1>
            <p className="text-sm text-gray-400">Oil & Gas Data Viewer</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-gray-300">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">Real-time Geospatial Data</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;