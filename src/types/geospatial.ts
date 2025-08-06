// Type definitions for geospatial data structures

export interface WellProperties {
  name: string;
  status: 'active' | 'inactive' | 'planned';
  type: 'Oil Well' | 'Gas Well' | 'Injection Well';
  depth: string;
  production: string;
  operator: string;
  drillDate?: string;
  apiNumber?: string;
}

export interface PipelineProperties {
  name: string;
  type: 'oil' | 'gas' | 'water';
  diameter: string;
  length: string;
  operator: string;
  capacity: string;
  installDate?: string;
  material?: string;
}

export interface Well extends GeoJSON.Feature<GeoJSON.Point, WellProperties> {}
export interface Pipeline extends GeoJSON.Feature<GeoJSON.LineString, PipelineProperties> {}

export interface WellCollection extends GeoJSON.FeatureCollection<GeoJSON.Point, WellProperties> {}
export interface PipelineCollection extends GeoJSON.FeatureCollection<GeoJSON.LineString, PipelineProperties> {}

export interface LayerVisibility {
  wells: boolean;
  pipelines: boolean;
  facilities?: boolean;
  leases?: boolean;
}

export interface MapBounds {
  north: number;
  south: number;
  east: number;
  west: number;
}

export interface DataFilter {
  wellStatus?: string[];
  pipelineType?: string[];
  operator?: string[];
  dateRange?: {
    start: Date;
    end: Date;
  };
}