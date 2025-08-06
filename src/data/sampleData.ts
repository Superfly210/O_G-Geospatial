// Sample GeoJSON data for demonstration
// In a real application, this would come from Supabase or an API

export const wellsData: GeoJSON.FeatureCollection = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-95.369, 29.760] // Houston, TX area
      },
      properties: {
        name: 'Eagle Ford Well #1',
        status: 'active',
        type: 'Oil Well',
        depth: '8,500',
        production: '450 bbl/day',
        operator: 'Texas Energy Corp'
      }
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-97.743, 30.267] // Austin, TX area
      },
      properties: {
        name: 'Permian Basin Well #2',
        status: 'active',
        type: 'Gas Well',
        depth: '12,300',
        production: '2.1 MMcf/day',
        operator: 'Lone Star Gas'
      }
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-101.856, 33.578] // Lubbock, TX area
      },
      properties: {
        name: 'West Texas Well #3',
        status: 'inactive',
        type: 'Oil Well',
        depth: '6,800',
        production: 'N/A',
        operator: 'Desert Oil Co'
      }
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-99.901, 31.997] // San Angelo, TX area
      },
      properties: {
        name: 'Barnett Shale Well #4',
        status: 'active',
        type: 'Gas Well',
        depth: '7,200',
        production: '1.8 MMcf/day',
        operator: 'Shale Energy LLC'
      }
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-94.043, 33.441] // Marshall, TX area
      },
      properties: {
        name: 'East Texas Well #5',
        status: 'active',
        type: 'Oil Well',
        depth: '9,100',
        production: '320 bbl/day',
        operator: 'Piney Woods Energy'
      }
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-103.204, 32.365] // Midland, TX area
      },
      properties: {
        name: 'Permian Well #6',
        status: 'active',
        type: 'Oil Well',
        depth: '11,500',
        production: '680 bbl/day',
        operator: 'West Texas Drilling'
      }
    }
  ]
};

export const pipelinesData: GeoJSON.FeatureCollection = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      geometry: {
        type: 'LineString',
        coordinates: [
          [-95.369, 29.760],
          [-94.043, 33.441],
          [-97.743, 30.267]
        ]
      },
      properties: {
        name: 'East Texas Oil Pipeline',
        type: 'oil',
        diameter: '24',
        length: '285',
        operator: 'Texas Pipeline Co',
        capacity: '150,000 bbl/day'
      }
    },
    {
      type: 'Feature',
      geometry: {
        type: 'LineString',
        coordinates: [
          [-101.856, 33.578],
          [-99.901, 31.997],
          [-97.743, 30.267],
          [-95.369, 29.760]
        ]
      },
      properties: {
        name: 'Trans-Texas Gas Pipeline',
        type: 'gas',
        diameter: '36',
        length: '420',
        operator: 'Natural Gas Transport LLC',
        capacity: '2.5 Bcf/day'
      }
    },
    {
      type: 'Feature',
      geometry: {
        type: 'LineString',
        coordinates: [
          [-103.204, 32.365],
          [-101.856, 33.578],
          [-99.901, 31.997]
        ]
      },
      properties: {
        name: 'Permian Express Pipeline',
        type: 'oil',
        diameter: '30',
        length: '195',
        operator: 'Desert Pipeline Corp',
        capacity: '200,000 bbl/day'
      }
    },
    {
      type: 'Feature',
      geometry: {
        type: 'LineString',
        coordinates: [
          [-97.743, 30.267],
          [-99.901, 31.997],
          [-94.043, 33.441]
        ]
      },
      properties: {
        name: 'Central Texas Gas Line',
        type: 'gas',
        diameter: '42',
        length: '310',
        operator: 'Hill Country Gas',
        capacity: '3.1 Bcf/day'
      }
    }
  ]
};

// Placeholder for Supabase integration