import { useState, useEffect } from 'react';
import { wellsData, pipelinesData } from '../data/sampleData';
import { loadGeospatialData } from '../services/geospatialService';
import type { WellCollection, PipelineCollection } from '../types/geospatial';

interface MapData {
  wells: WellCollection;
  pipelines: PipelineCollection;
}

interface UseMapDataReturn {
  data: MapData | null;
  loading: boolean;
  error: string | null;
  refreshData: () => Promise<void>;
}

export const useMapData = (): UseMapDataReturn => {
  const [data, setData] = useState<MapData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [useSupabase, setUseSupabase] = useState(false);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      let mapData: MapData;
      
      if (useSupabase) {
        try {
          // Try to load from Supabase
          const supabaseData = await loadGeospatialData();
          mapData = supabaseData;
        } catch (supabaseError) {
          console.warn('Failed to load from Supabase, falling back to sample data:', supabaseError);
          // Fallback to sample data if Supabase fails
          mapData = {
            wells: wellsData,
            pipelines: pipelinesData
          };
        }
      } else {
        // Use sample data
        mapData = {
          wells: wellsData,
          pipelines: pipelinesData
        };
      }
      
      setData(mapData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const refreshData = async () => {
    await loadData();
  };
  
  const toggleDataSource = () => {
    setUseSupabase(!useSupabase);
  };

  return {
    data,
    loading,
    error,
    refreshData,
    useSupabase,
    toggleDataSource
  };
};