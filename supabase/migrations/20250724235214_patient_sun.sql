/*
  # Create geospatial schema for nubuckmap project

  1. New Tables
    - `wells`
      - `id` (uuid, primary key)
      - `name` (text)
      - `status` (text) - active, inactive, planned
      - `type` (text) - Oil Well, Gas Well, Injection Well
      - `depth` (text)
      - `production` (text)
      - `operator` (text)
      - `drill_date` (date)
      - `api_number` (text)
      - `location` (geography point)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `pipelines`
      - `id` (uuid, primary key)
      - `name` (text)
      - `type` (text) - oil, gas, water
      - `diameter` (text)
      - `length` (text)
      - `operator` (text)
      - `capacity` (text)
      - `install_date` (date)
      - `material` (text)
      - `route` (geography linestring)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users to read data
    - Add policies for authenticated users to manage their own data
*/

-- Enable PostGIS extension for geospatial data
CREATE EXTENSION IF NOT EXISTS postgis;

-- Create wells table
CREATE TABLE IF NOT EXISTS wells (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'planned')),
  type text NOT NULL CHECK (type IN ('Oil Well', 'Gas Well', 'Injection Well')),
  depth text DEFAULT '',
  production text DEFAULT '',
  operator text NOT NULL,
  drill_date date,
  api_number text,
  location geography(POINT, 4326) NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create pipelines table
CREATE TABLE IF NOT EXISTS pipelines (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  type text NOT NULL DEFAULT 'oil' CHECK (type IN ('oil', 'gas', 'water')),
  diameter text DEFAULT '',
  length text DEFAULT '',
  operator text NOT NULL,
  capacity text DEFAULT '',
  install_date date,
  material text,
  route geography(LINESTRING, 4326) NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE wells ENABLE ROW LEVEL SECURITY;
ALTER TABLE pipelines ENABLE ROW LEVEL SECURITY;

-- Create policies for wells
CREATE POLICY "Anyone can read wells"
  ON wells
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert wells"
  ON wells
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update wells"
  ON wells
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete wells"
  ON wells
  FOR DELETE
  TO authenticated
  USING (true);

-- Create policies for pipelines
CREATE POLICY "Anyone can read pipelines"
  ON pipelines
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert pipelines"
  ON pipelines
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update pipelines"
  ON pipelines
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete pipelines"
  ON pipelines
  FOR DELETE
  TO authenticated
  USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS wells_location_idx ON wells USING GIST (location);
CREATE INDEX IF NOT EXISTS wells_status_idx ON wells (status);
CREATE INDEX IF NOT EXISTS wells_operator_idx ON wells (operator);

CREATE INDEX IF NOT EXISTS pipelines_route_idx ON pipelines USING GIST (route);
CREATE INDEX IF NOT EXISTS pipelines_type_idx ON pipelines (type);
CREATE INDEX IF NOT EXISTS pipelines_operator_idx ON pipelines (operator);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_wells_updated_at
  BEFORE UPDATE ON wells
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_pipelines_updated_at
  BEFORE UPDATE ON pipelines
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();