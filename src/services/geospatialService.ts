import { supabase } from '../lib/supabase';
import type { WellCollection, PipelineCollection } from '../types/geospatial';

/**
 * Convert PostGIS geography point to GeoJSON coordinates
 */
const parseGeographyPoint = (geography: any): [number, number] => {
  if (typeof geography === 'string') {
    // Parse WKT format: POINT(lng lat)
    const match = geography.match(/POINT\(([^)]+)\)/);
    if (match) {
      const [lng, lat] = match[1].split(' ').map(Number);
      return [lng, lat];
    }
  }
  // Fallback for other formats
  return [0, 0];
};

/**
 * Convert PostGIS geography linestring to GeoJSON coordinates
 */
const parseGeographyLineString = (geography: any): number[][] => {
  if (typeof geography === 'string') {
    // Parse WKT format: LINESTRING(lng1 lat1, lng2 lat2, ...)
    const match = geography.match(/LINESTRING\(([^)]+)\)/);
    if (match) {
      return match[1].split(',').map(point => {
        const [lng, lat] = point.trim().split(' ').map(Number);
        return [lng, lat];
      });
    }
  }
  // Fallback for other formats
  return [];
};

/**
 * Fetch wells data from Supabase and convert to GeoJSON
 */
export const fetchWellsData = async (): Promise<WellCollection> => {
  const { data, error } = await supabase
    .from('wells')
    .select('*');

  if (error) {
    throw new Error(`Failed to fetch wells: ${error.message}`);
  }

  const features = data.map(well => ({
    type: 'Feature' as const,
    geometry: {
      type: 'Point' as const,
      coordinates: parseGeographyPoint(well.location)
    },
    properties: {
      name: well.name,
      status: well.status,
      type: well.type,
      depth: well.depth,
      production: well.production,
      operator: well.operator,
      drillDate: well.drill_date,
      apiNumber: well.api_number
    }
  }));

  return {
    type: 'FeatureCollection',
    features
  };
};

/**
 * Fetch pipelines data from Supabase and convert to GeoJSON
 */
export const fetchPipelinesData = async (): Promise<PipelineCollection> => {
  const { data, error } = await supabase
    .from('pipelines')
    .select('*');

  if (error) {
    throw new Error(`Failed to fetch pipelines: ${error.message}`);
  }

  const features = data.map(pipeline => ({
    type: 'Feature' as const,
    geometry: {
      type: 'LineString' as const,
      coordinates: parseGeographyLineString(pipeline.route)
    },
    properties: {
      name: pipeline.name,
      type: pipeline.type,
      diameter: pipeline.diameter,
      length: pipeline.length,
      operator: pipeline.operator,
      capacity: pipeline.capacity,
      installDate: pipeline.install_date,
      material: pipeline.material
    }
  }));

  return {
    type: 'FeatureCollection',
    features
  };
};

/**
 * Load all geospatial data from Supabase
 */
export const loadGeospatialData = async () => {
  try {
    const [wells, pipelines] = await Promise.all([
      fetchWellsData(),
      fetchPipelinesData()
    ]);

    return { wells, pipelines };
  } catch (error) {
    console.error('Error loading geospatial data:', error);
    throw error;
  }
};

/**
 * Insert a new well into Supabase
 */
export const insertWell = async (wellData: {
  name: string;
  status: 'active' | 'inactive' | 'planned';
  type: 'Oil Well' | 'Gas Well' | 'Injection Well';
  depth?: string;
  production?: string;
  operator: string;
  drill_date?: string;
  api_number?: string;
  coordinates: [number, number];
}) => {
  const { coordinates, ...rest } = wellData;
  
  const { data, error } = await supabase
    .from('wells')
    .insert({
      ...rest,
      location: `POINT(${coordinates[0]} ${coordinates[1]})`
    })
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to insert well: ${error.message}`);
  }

  return data;
};

/**
 * Insert a new pipeline into Supabase
 */
export const insertPipeline = async (pipelineData: {
  name: string;
  type: 'oil' | 'gas' | 'water';
  diameter?: string;
  length?: string;
  operator: string;
  capacity?: string;
  install_date?: string;
  material?: string;
  coordinates: number[][];
}) => {
  const { coordinates, ...rest } = pipelineData;
  
  const lineString = coordinates
    .map(coord => `${coord[0]} ${coord[1]}`)
    .join(', ');
  
  const { data, error } = await supabase
    .from('pipelines')
    .insert({
      ...rest,
      route: `LINESTRING(${lineString})`
    })
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to insert pipeline: ${error.message}`);
  }

  return data;
};