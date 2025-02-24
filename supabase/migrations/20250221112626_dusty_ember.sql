/*
  # Concerts table setup

  1. New Table
    - `concerts`
      - `id` (uuid, primary key)
      - `date` (timestamptz)
      - `venue` (text)
      - `city` (text)
      - `ticket_url` (text, optional)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS
    - Add policy for public read access
    - Add policy for authenticated user management
*/

-- Drop existing policies if they exist
DO $$ 
BEGIN
  DROP POLICY IF EXISTS "Public read access for concerts" ON concerts;
  DROP POLICY IF EXISTS "Authenticated users can manage concerts" ON concerts;
EXCEPTION
  WHEN undefined_object THEN
    NULL;
END $$;

-- Create concerts table
CREATE TABLE IF NOT EXISTS concerts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  date timestamptz NOT NULL,
  venue text NOT NULL,
  city text NOT NULL,
  ticket_url text,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE concerts ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Public read access for concerts"
  ON concerts
  FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can manage concerts"
  ON concerts
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);