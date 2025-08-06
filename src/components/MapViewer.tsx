import React, { useRef, useEffect, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import LayerControls from './LayerControls';
import DataSourceToggle from './DataSourceToggle';
import { useMapData } from '../hooks/useMapData';

interface LayerVisibility {
  wells: boolean;
  pipelines: boolean;
}

const MapViewer: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const listenersAdded = useRef<boolean>(false);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [layerVisibility, setLayerVisibility] = useState<LayerVisibility>({
    wells: true,
    pipelines: true,
  });
  
  const { data, loading, error, useSupabase, toggleDataSource } = useMapData();

  useEffect(() => {
    if (!mapContainer.current) return;

    // Initialize map
    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: {
        version: 8,
        sources: {
          'osm': {
            type: 'raster',
            tiles: [
              'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
            ],
            tileSize: 256,
            maxzoom: 18
          }
        },
        layers: [
          {
            id: 'osm',
            type: 'raster',
            source: 'osm'
          }
        ]
      },
      center: [-98.5795, 39.8283], // Center of USA
      zoom: 4,
      attributionControl: false
    });

    // Add navigation controls
    map.current.addControl(new maplibregl.NavigationControl(), 'top-right');

    // Wait for map to load before adding data
    map.current.on('load', () => {
      if (!map.current) return;
      
      setIsMapLoaded(true);
    });

    return () => {
      if (map.current) {
        map.current.remove();
      }
      listenersAdded.current = false;
    };
  }, []);

  // Update map data when data changes
  useEffect(() => {
    if (!map.current || !isMapLoaded || !data) return;

    // Update wells data source
    if (map.current.getSource('wells')) {
      (map.current.getSource('wells') as maplibregl.GeoJSONSource).setData(data.wells);
    } else {
      // Add wells data source
      map.current.addSource('wells', {
        type: 'geojson',
        data: data.wells
      });
    }

    // Update pipelines data source
    if (map.current.getSource('pipelines')) {
      (map.current.getSource('pipelines') as maplibregl.GeoJSONSource).setData(data.pipelines);
    } else {
      // Add pipelines data source
      map.current.addSource('pipelines', {
        type: 'geojson',
        data: data.pipelines
      });
    }

    // Add layers if they don't exist
    if (!map.current.getLayer('wells')) {
      // Add wells layer
      map.current.addLayer({
        id: 'wells',
        type: 'circle',
        source: 'wells',
        paint: {
          'circle-radius': [
            'interpolate',
            ['linear'],
            ['zoom'],
            4, 4,
            10, 8,
            16, 12
          ],
          'circle-color': [
            'case',
            ['==', ['get', 'status'], 'active'], '#10b981',
            ['==', ['get', 'status'], 'inactive'], '#ef4444',
            '#f59e0b'
          ],
          'circle-stroke-width': 2,
          'circle-stroke-color': '#ffffff',
          'circle-opacity': 0.8
        }
      });
    }

    if (!map.current.getLayer('pipelines')) {
      // Add pipelines layer
      map.current.addLayer({
        id: 'pipelines',
        type: 'line',
        source: 'pipelines',
        paint: {
          'line-color': [
            'case',
            ['==', ['get', 'type'], 'oil'], '#dc2626',
            ['==', ['get', 'type'], 'gas'], '#2563eb',
            '#6b7280'
          ],
          'line-width': [
            'interpolate',
            ['linear'],
            ['zoom'],
            4, 2,
            10, 4,
            16, 6
          ],
          'line-opacity': 0.8
        }
      });
    }

    // Add click handlers for popups if not already added
    if (!listenersAdded.current) {
      map.current.on('click', 'wells', (e) => {
        if (!map.current || !e.features) return;
        
        const feature = e.features[0];
        const coordinates = (feature.geometry as GeoJSON.Point).coordinates.slice();
        const properties = feature.properties;

        new maplibregl.Popup()
          .setLngLat([coordinates[0], coordinates[1]])
          .setHTML(`
            <div class="p-3">
              <h3 class="font-bold text-lg mb-2">${properties?.name}</h3>
              <div class="space-y-1 text-sm">
                <div><span class="font-medium">Status:</span> <span class="capitalize">${properties?.status}</span></div>
                <div><span class="font-medium">Type:</span> ${properties?.type}</div>
                <div><span class="font-medium">Depth:</span> ${properties?.depth}</div>
                <div><span class="font-medium">Production:</span> ${properties?.production}</div>
              </div>
            </div>
          `)
          .addTo(map.current);
      });

      map.current.on('click', 'pipelines', (e) => {
        if (!map.current || !e.features) return;
        
        const feature = e.features[0];
        const coordinates = e.lngLat;
        const properties = feature.properties;

        new maplibregl.Popup()
          .setLngLat(coordinates)
          .setHTML(`
            <div class="p-3">
              <h3 class="font-bold text-lg mb-2">${properties?.name}</h3>
              <div class="space-y-1 text-sm">
                <div><span class="font-medium">Type:</span> <span class="capitalize">${properties?.type}</span></div>
                <div><span class="font-medium">Diameter:</span> ${properties?.diameter}</div>
                <div><span class="font-medium">Length:</span> ${properties?.length}</div>
                <div><span class="font-medium">Operator:</span> ${properties?.operator}</div>
              </div>
            </div>
          `)
          .addTo(map.current);
      });

      // Change cursor on hover
      map.current.on('mouseenter', 'wells', () => {
        if (map.current) map.current.getCanvas().style.cursor = 'pointer';
      });

      map.current.on('mouseleave', 'wells', () => {
        if (map.current) map.current.getCanvas().style.cursor = '';
      });

      map.current.on('mouseenter', 'pipelines', () => {
        if (map.current) map.current.getCanvas().style.cursor = 'pointer';
      });

      map.current.on('mouseleave', 'pipelines', () => {
        if (map.current) map.current.getCanvas().style.cursor = '';
      });

      listenersAdded.current = true;
    }
  }, [data, isMapLoaded]);

  // Handle layer visibility changes
  useEffect(() => {
    if (!map.current || !isMapLoaded) return;

    const visibility = layerVisibility.wells ? 'visible' : 'none';
    map.current.setLayoutProperty('wells', 'visibility', visibility);
  }, [layerVisibility.wells, isMapLoaded]);

  useEffect(() => {
    if (!map.current || !isMapLoaded) return;

    const visibility = layerVisibility.pipelines ? 'visible' : 'none';
    map.current.setLayoutProperty('pipelines', 'visibility', visibility);
  }, [layerVisibility.pipelines, isMapLoaded]);

  const toggleLayer = (layer: keyof LayerVisibility) => {
    setLayerVisibility(prev => ({
      ...prev,
      [layer]: !prev[layer]
    }));
  };

  return (
    <div className="relative w-full h-full">
      <div ref={mapContainer} className="w-full h-full" />
      
      {loading && (
        <div className="absolute inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-800 rounded-lg p-4 text-white">
            Loading geospatial data...
          </div>
        </div>
      )}
      
      {error && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg">
          Error: {error}
        </div>
      )}
      
      <LayerControls 
        layerVisibility={layerVisibility}
        onToggleLayer={toggleLayer}
      />
      
      <DataSourceToggle
        useSupabase={useSupabase}
        onToggle={toggleDataSource}
        loading={loading}
      />
    </div>
  );
};

export default MapViewer;