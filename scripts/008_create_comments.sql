-- Create comments table for post comments
CREATE TABLE IF NOT EXISTS comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  author_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS comments_post_id_idx ON comments(post_id);
CREATE INDEX IF NOT EXISTS comments_author_id_idx ON comments(author_id);
CREATE INDEX IF NOT EXISTS comments_created_at_idx ON comments(created_at DESC);

-- Enable Row Level Security
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can view comments
CREATE POLICY comments_select_all ON comments
  FOR SELECT
  USING (true);

-- Policy: Authenticated users can create comments
CREATE POLICY comments_insert_own ON comments
  FOR INSERT
  WITH CHECK (auth.uid() = author_id);

-- Policy: Users can update their own comments
CREATE POLICY comments_update_own ON comments
  FOR UPDATE
  USING (auth.uid() = author_id);

-- Policy: Users can delete their own comments
CREATE POLICY comments_delete_own ON comments
  FOR DELETE
  USING (auth.uid() = author_id);
