import React from 'react';
import { Eye, EyeOff, Circle, Minus } from 'lucide-react';

interface LayerVisibility {
  wells: boolean;
  pipelines: boolean;
}

interface LayerControlsProps {
  layerVisibility: LayerVisibility;
  onToggleLayer: (layer: keyof LayerVisibility) => void;
}

const LayerControls: React.FC<LayerControlsProps> = ({ layerVisibility, onToggleLayer }) => {
  return (
    <div className="absolute top-4 left-4 bg-gray-800 bg-opacity-90 backdrop-blur-sm rounded-lg shadow-xl border border-gray-700">
      <div className="p-4">
        <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">
          Map Layers
        </h3>
        
        <div className="space-y-3">
          {/* Wells Layer Control */}
          <div className="flex items-center justify-between space-x-3">
            <div className="flex items-center space-x-2">
              <Circle className="w-4 h-4 text-green-400 fill-current" />
              <span className="text-gray-200 text-sm">Wells</span>
            </div>
            <button
              onClick={() => onToggleLayer('wells')}
              className={`p-1 rounded transition-colors ${
                layerVisibility.wells 
                  ? 'text-blue-400 hover:text-blue-300' 
                  : 'text-gray-500 hover:text-gray-400'
              }`}
              title={layerVisibility.wells ? 'Hide wells' : 'Show wells'}
            >
              {layerVisibility.wells ? (
                <Eye className="w-4 h-4" />
              ) : (
                <EyeOff className="w-4 h-4" />
              )}
            </button>
          </div>

          {/* Pipelines Layer Control */}
          <div className="flex items-center justify-between space-x-3">
            <div className="flex items-center space-x-2">
              <Minus className="w-4 h-4 text-red-400" />
              <span className="text-gray-200 text-sm">Pipelines</span>
            </div>
            <button
              onClick={() => onToggleLayer('pipelines')}
              className={`p-1 rounded transition-colors ${
                layerVisibility.pipelines 
                  ? 'text-blue-400 hover:text-blue-300' 
                  : 'text-gray-500 hover:text-gray-400'
              }`}
              title={layerVisibility.pipelines ? 'Hide pipelines' : 'Show pipelines'}
            >
              {layerVisibility.pipelines ? (
                <Eye className="w-4 h-4" />
              ) : (
                <EyeOff className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-4 pt-3 border-t border-gray-600">
          <h4 className="text-gray-300 text-xs uppercase tracking-wide mb-2">Legend</h4>
          <div className="space-y-2 text-xs">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
              <span className="text-gray-300">Active Wells</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <span className="text-gray-300">Inactive Wells</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-0.5 bg-red-600"></div>
              <span className="text-gray-300">Oil Pipelines</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-0.5 bg-blue-600"></div>
              <span className="text-gray-300">Gas Pipelines</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LayerControls;