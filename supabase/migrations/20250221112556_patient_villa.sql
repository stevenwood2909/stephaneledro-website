/*
  # Initial schema setup for music player

  1. New Tables
    - `playlists`
      - `id` (uuid, primary key)
      - `title` (text)
      - `created_at` (timestamptz)
      - `user_id` (uuid, references auth.users)
    
    - `tracks`
      - `id` (uuid, primary key)
      - `title` (text)
      - `artist` (text)
      - `audio_url` (text)
      - `duration` (integer)
      - `created_at` (timestamptz)
      - `playlist_id` (uuid, references playlists)

  2. Security
    - Enable RLS on both tables
    - Add policies for public read access
    - Add policies for authenticated user management
*/

-- Drop existing policies if they exist
DO $$ 
BEGIN
  DROP POLICY IF EXISTS "Public read access for playlists" ON playlists;
  DROP POLICY IF EXISTS "Users can insert their own playlists" ON playlists;
  DROP POLICY IF EXISTS "Public read access for tracks" ON tracks;
  DROP POLICY IF EXISTS "Users can insert tracks to their playlists" ON tracks;
EXCEPTION
  WHEN undefined_object THEN
    NULL;
END $$;

-- Create playlists table
CREATE TABLE IF NOT EXISTS playlists (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  created_at timestamptz DEFAULT now(),
  user_id uuid REFERENCES auth.users(id)
);

-- Create tracks table
CREATE TABLE IF NOT EXISTS tracks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  artist text NOT NULL,
  audio_url text NOT NULL,
  duration integer NOT NULL,
  created_at timestamptz DEFAULT now(),
  playlist_id uuid REFERENCES playlists(id) ON DELETE CASCADE
);

-- Enable RLS
ALTER TABLE playlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE tracks ENABLE ROW LEVEL SECURITY;

-- Create policies for playlists
CREATE POLICY "Public read access for playlists"
  ON playlists
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert their own playlists"
  ON playlists
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Create policies for tracks
CREATE POLICY "Public read access for tracks"
  ON tracks
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert tracks to their playlists"
  ON tracks
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM playlists
      WHERE id = playlist_id
      AND user_id = auth.uid()
    )
  );