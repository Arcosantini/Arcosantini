-- Add performance indexes for common query patterns
-- These indexes significantly speed up queries on large tables

-- Posts: Index on author_id for fetching user's posts on profile pages
CREATE INDEX IF NOT EXISTS idx_posts_author_id ON posts(author_id);

-- Posts: Composite index for feed pagination (created_at desc with author_id)
CREATE INDEX IF NOT EXISTS idx_posts_created_at_desc ON posts(created_at DESC);

-- Comments: Index on post_id for fetching comments on a post
CREATE INDEX IF NOT EXISTS idx_comments_post_id ON comments(post_id);

-- Comments: Index on author_id for fetching user's comments
CREATE INDEX IF NOT EXISTS idx_comments_author_id ON comments(author_id);

-- Comments: Composite index for sorting comments by date within a post
CREATE INDEX IF NOT EXISTS idx_comments_post_created ON comments(post_id, created_at DESC);

-- Messages: Index on sender_id for outgoing messages
CREATE INDEX IF NOT EXISTS idx_messages_sender_id ON messages(sender_id);

-- Messages: Index on recipient_id for incoming messages
CREATE INDEX IF NOT EXISTS idx_messages_recipient_id ON messages(recipient_id);

-- Messages: Composite index for conversation queries (both participants + date)
CREATE INDEX IF NOT EXISTS idx_messages_conversation ON messages(sender_id, recipient_id, created_at DESC);

-- Messages: Index for unread message counts
CREATE INDEX IF NOT EXISTS idx_messages_unread ON messages(recipient_id, read) WHERE read = false;

-- Incident Reports: Index on reported_by_id for user's reports
CREATE INDEX IF NOT EXISTS idx_incident_reports_reported_by ON incident_reports(reported_by_id);

-- Incident Reports: Index for sorting by date
CREATE INDEX IF NOT EXISTS idx_incident_reports_created_at ON incident_reports(created_at DESC);

-- Jobs: Index on author_id for employer's job listings
CREATE INDEX IF NOT EXISTS idx_jobs_author_id ON jobs(author_id);

-- Jobs: Index for active job listings sorted by date
CREATE INDEX IF NOT EXISTS idx_jobs_status_created ON jobs(status, created_at DESC);

-- Follows: Index for finding followers of a user
CREATE INDEX IF NOT EXISTS idx_follows_following_id ON follows(following_id);

-- Follows: Index for finding who a user follows
CREATE INDEX IF NOT EXISTS idx_follows_follower_id ON follows(follower_id);

-- Post Likes: Index for counting likes on a post
CREATE INDEX IF NOT EXISTS idx_post_likes_post_id ON post_likes(post_id);

-- Post Likes: Index for checking if user liked a post
CREATE INDEX IF NOT EXISTS idx_post_likes_user_post ON post_likes(user_id, post_id);

-- Job Likes: Index for counting likes on a job
CREATE INDEX IF NOT EXISTS idx_job_likes_job_id ON job_likes(job_id);

-- Job Likes: Index for checking if user liked a job
CREATE INDEX IF NOT EXISTS idx_job_likes_user_job ON job_likes(user_id, job_id);

-- Profiles: Index for searching by display_name (for @mentions, search)
CREATE INDEX IF NOT EXISTS idx_profiles_display_name ON profiles(display_name);

-- Profiles: Index for filtering by verification status (admin dashboard)
CREATE INDEX IF NOT EXISTS idx_profiles_verification_status ON profiles(verification_status);

-- Profiles: Index for security professionals listing
CREATE INDEX IF NOT EXISTS idx_profiles_security_pro ON profiles(is_security_professional) WHERE is_security_professional = true;
