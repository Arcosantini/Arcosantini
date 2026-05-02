-- Create posts table for nightlife events and general updates
CREATE TABLE IF NOT EXISTS posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  event_name TEXT,
  event_date TIMESTAMPTZ,
  event_location TEXT,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create post_likes table
CREATE TABLE IF NOT EXISTS post_likes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, post_id)
);

-- Enable Row Level Security
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_likes ENABLE ROW LEVEL SECURITY;

-- Posts policies
CREATE POLICY posts_select_all ON posts FOR SELECT USING (true);
CREATE POLICY posts_insert_own ON posts FOR INSERT WITH CHECK (auth.uid() = author_id);
CREATE POLICY posts_update_own ON posts FOR UPDATE USING (auth.uid() = author_id);
CREATE POLICY posts_delete_own ON posts FOR DELETE USING (auth.uid() = author_id);

-- Post likes policies
CREATE POLICY post_likes_select_all ON post_likes FOR SELECT USING (true);
CREATE POLICY post_likes_insert_own ON post_likes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY post_likes_delete_own ON post_likes FOR DELETE USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS posts_author_id_idx ON posts(author_id);
CREATE INDEX IF NOT EXISTS posts_created_at_idx ON posts(created_at DESC);
CREATE INDEX IF NOT EXISTS post_likes_post_id_idx ON post_likes(post_id);
CREATE INDEX IF NOT EXISTS post_likes_user_id_idx ON post_likes(user_id);
