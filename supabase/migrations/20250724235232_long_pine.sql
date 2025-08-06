/*
  # Seed sample data for nubuckmap project

  1. Sample Wells Data
    - Insert sample oil and gas wells across Texas
    - Include various statuses and operators
    - Use realistic coordinates and production data

  2. Sample Pipeline Data
    - Insert sample oil and gas pipelines
    - Connect major production areas
    - Include realistic capacity and operator data
*/

-- Insert sample wells data
INSERT INTO wells (name, status, type, depth, production, operator, drill_date, api_number, location) VALUES
  (
    'Eagle Ford Well #1',
    'active',
    'Oil Well',
    '8,500 ft',
    '450 bbl/day',
    'Texas Energy Corp',
    '2022-03-15',
    'TX-123-45678',
    ST_GeogFromText('POINT(-95.369 29.760)')
  ),
  (
    'Permian Basin Well #2',
    'active',
    'Gas Well',
    '12,300 ft',
    '2.1 MMcf/day',
    'Lone Star Gas',
    '2021-11-08',
    'TX-234-56789',
    ST_GeogFromText('POINT(-97.743 30.267)')
  ),
  (
    'West Texas Well #3',
    'inactive',
    'Oil Well',
    '6,800 ft',
    'N/A',
    'Desert Oil Co',
    '2019-07-22',
    'TX-345-67890',
    ST_GeogFromText('POINT(-101.856 33.578)')
  ),
  (
    'Barnett Shale Well #4',
    'active',
    'Gas Well',
    '7,200 ft',
    '1.8 MMcf/day',
    'Shale Energy LLC',
    '2023-01-10',
    'TX-456-78901',
    ST_GeogFromText('POINT(-99.901 31.997)')
  ),
  (
    'East Texas Well #5',
    'active',
    'Oil Well',
    '9,100 ft',
    '320 bbl/day',
    'Piney Woods Energy',
    '2022-09-05',
    'TX-567-89012',
    ST_GeogFromText('POINT(-94.043 33.441)')
  ),
  (
    'Permian Well #6',
    'active',
    'Oil Well',
    '11,500 ft',
    '680 bbl/day',
    'West Texas Drilling',
    '2023-05-18',
    'TX-678-90123',
    ST_GeogFromText('POINT(-103.204 32.365)')
  );

-- Insert sample pipelines data
INSERT INTO pipelines (name, type, diameter, length, operator, capacity, install_date, material, route) VALUES
  (
    'East Texas Oil Pipeline',
    'oil',
    '24 in',
    '285 miles',
    'Texas Pipeline Co',
    '150,000 bbl/day',
    '2020-06-15',
    'Steel',
    ST_GeogFromText('LINESTRING(-95.369 29.760, -94.043 33.441, -97.743 30.267)')
  ),
  (
    'Trans-Texas Gas Pipeline',
    'gas',
    '36 in',
    '420 miles',
    'Natural Gas Transport LLC',
    '2.5 Bcf/day',
    '2019-08-22',
    'Steel',
    ST_GeogFromText('LINESTRING(-101.856 33.578, -99.901 31.997, -97.743 30.267, -95.369 29.760)')
  ),
  (
    'Permian Express Pipeline',
    'oil',
    '30 in',
    '195 miles',
    'Desert Pipeline Corp',
    '200,000 bbl/day',
    '2021-03-10',
    'Steel',
    ST_GeogFromText('LINESTRING(-103.204 32.365, -101.856 33.578, -99.901 31.997)')
  ),
  (
    'Central Texas Gas Line',
    'gas',
    '42 in',
    '310 miles',
    'Hill Country Gas',
    '3.1 Bcf/day',
    '2022-11-05',
    'Steel',
    ST_GeogFromText('LINESTRING(-97.743 30.267, -99.901 31.997, -94.043 33.441)')
  );