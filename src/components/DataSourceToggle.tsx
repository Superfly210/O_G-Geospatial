import React from 'react';
import { Database, HardDrive } from 'lucide-react';

interface DataSourceToggleProps {
  useSupabase: boolean;
  onToggle: () => void;
  loading?: boolean;
}

const DataSourceToggle: React.FC<DataSourceToggleProps> = ({ 
  useSupabase, 
  onToggle, 
  loading = false 
}) => {
  return (
    <div className="absolute top-4 right-4 bg-gray-800 bg-opacity-90 backdrop-blur-sm rounded-lg shadow-xl border border-gray-700">
      <div className="p-4">
        <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">
          Data Source
        </h3>
        
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            {useSupabase ? (
              <Database className="w-4 h-4 text-green-400" />
            ) : (
              <HardDrive className="w-4 h-4 text-blue-400" />
            )}
            <span className="text-gray-200 text-sm">
              {useSupabase ? 'Supabase' : 'Sample Data'}
            </span>
          </div>
          
          <button
            onClick={onToggle}
            disabled={loading}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 ${
              useSupabase ? 'bg-green-600' : 'bg-gray-600'
            } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                useSupabase ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
        
        <div className="mt-2 text-xs text-gray-400">
          {useSupabase 
            ? 'Loading data from Supabase database' 
            : 'Using local sample data'
          }
        </div>
      </div>
    </div>
  );
};

export default DataSourceToggle;