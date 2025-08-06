import type { MapBounds, DataFilter } from '../types/geospatial';

/**
 * Calculate the center point of a bounding box
 */
export const calculateCenter = (bounds: MapBounds): [number, number] => {
  const lng = (bounds.east + bounds.west) / 2;
  const lat = (bounds.north + bounds.south) / 2;
  return [lng, lat];
};

/**
 * Convert GeoJSON coordinates to MapLibre LngLat format
 */
export const coordinatesToLngLat = (coordinates: number[]): { lng: number; lat: number } => {
  return {
    lng: coordinates[0],
    lat: coordinates[1]
  };
};

/**
 * Generate color based on well status
 */
export const getWellColor = (status: string): string => {
  switch (status) {
    case 'active':
      return '#10b981'; // green
    case 'inactive':
      return '#ef4444'; // red
    case 'planned':
      return '#f59e0b'; // amber
    default:
      return '#6b7280'; // gray
  }
};

/**
 * Generate color based on pipeline type
 */
export const getPipelineColor = (type: string): string => {
  switch (type) {
    case 'oil':
      return '#dc2626'; // red
    case 'gas':
      return '#2563eb'; // blue
    case 'water':
      return '#059669'; // emerald
    default:
      return '#6b7280'; // gray
  }
};

/**
 * Format production values for display
 */
export const formatProduction = (production: string, type: string): string => {
  if (production === 'N/A' || !production) return 'N/A';
  
  if (type.toLowerCase().includes('gas')) {
    return production.includes('MMcf') ? production : `${production} MMcf/day`;
  } else {
    return production.includes('bbl') ? production : `${production} bbl/day`;
  }
};

/**
 * Apply filters to GeoJSON data
 */
export const applyDataFilter = (
  features: GeoJSON.Feature[],
  filter: DataFilter
): GeoJSON.Feature[] => {
  return features.filter(feature => {
    const props = feature.properties;
    if (!props) return true;

    // Filter by well status
    if (filter.wellStatus && filter.wellStatus.length > 0) {
      if (!filter.wellStatus.includes(props.status)) return false;
    }

    // Filter by pipeline type
    if (filter.pipelineType && filter.pipelineType.length > 0) {
      if (!filter.pipelineType.includes(props.type)) return false;
    }

    // Filter by operator
    if (filter.operator && filter.operator.length > 0) {
      if (!filter.operator.includes(props.operator)) return false;
    }

    return true;
  });
};

/**
 * Calculate zoom level based on data extent
 */
export const calculateOptimalZoom = (bounds: MapBounds): number => {
  const latDiff = bounds.north - bounds.south;
  const lngDiff = bounds.east - bounds.west;
  const maxDiff = Math.max(latDiff, lngDiff);
  
  if (maxDiff > 10) return 4;
  if (maxDiff > 5) return 6;
  if (maxDiff > 2) return 8;
  if (maxDiff > 1) return 10;
  return 12;
};