-- Add ON DELETE CASCADE to all foreign keys referencing profiles
-- This ensures that when a user deletes their account, all their data is cleaned up

-- Posts: When author is deleted, delete their posts
ALTER TABLE posts
DROP CONSTRAINT IF EXISTS posts_author_id_fkey,
ADD CONSTRAINT posts_author_id_fkey
  FOREIGN KEY (author_id) REFERENCES profiles(id) ON DELETE CASCADE;

-- Comments: When author is deleted, delete their comments
ALTER TABLE comments
DROP CONSTRAINT IF EXISTS comments_author_id_fkey,
ADD CONSTRAINT comments_author_id_fkey
  FOREIGN KEY (author_id) REFERENCES profiles(id) ON DELETE CASCADE;

-- Comments: When post is deleted, delete its comments
ALTER TABLE comments
DROP CONSTRAINT IF EXISTS comments_post_id_fkey,
ADD CONSTRAINT comments_post_id_fkey
  FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE;

-- Jobs: When author is deleted, delete their job listings
ALTER TABLE jobs
DROP CONSTRAINT IF EXISTS jobs_author_id_fkey,
ADD CONSTRAINT jobs_author_id_fkey
  FOREIGN KEY (author_id) REFERENCES profiles(id) ON DELETE CASCADE;

-- Messages: When sender is deleted, delete their sent messages
ALTER TABLE messages
DROP CONSTRAINT IF EXISTS messages_sender_id_fkey,
ADD CONSTRAINT messages_sender_id_fkey
  FOREIGN KEY (sender_id) REFERENCES profiles(id) ON DELETE CASCADE;

-- Messages: When recipient is deleted, delete messages sent to them
ALTER TABLE messages
DROP CONSTRAINT IF EXISTS messages_recipient_id_fkey,
ADD CONSTRAINT messages_recipient_id_fkey
  FOREIGN KEY (recipient_id) REFERENCES profiles(id) ON DELETE CASCADE;

-- Incident Reports: When reporter is deleted, delete their reports
ALTER TABLE incident_reports
DROP CONSTRAINT IF EXISTS incident_reports_reported_by_id_fkey,
ADD CONSTRAINT incident_reports_reported_by_id_fkey
  FOREIGN KEY (reported_by_id) REFERENCES profiles(id) ON DELETE CASCADE;

-- Follows: When follower is deleted, delete the follow relationship
ALTER TABLE follows
DROP CONSTRAINT IF EXISTS follows_follower_id_fkey,
ADD CONSTRAINT follows_follower_id_fkey
  FOREIGN KEY (follower_id) REFERENCES profiles(id) ON DELETE CASCADE;

-- Follows: When followed user is deleted, delete the follow relationship
ALTER TABLE follows
DROP CONSTRAINT IF EXISTS follows_following_id_fkey,
ADD CONSTRAINT follows_following_id_fkey
  FOREIGN KEY (following_id) REFERENCES profiles(id) ON DELETE CASCADE;

-- Post Likes: When user is deleted, delete their likes
ALTER TABLE post_likes
DROP CONSTRAINT IF EXISTS post_likes_user_id_fkey,
ADD CONSTRAINT post_likes_user_id_fkey
  FOREIGN KEY (user_id) REFERENCES profiles(id) ON DELETE CASCADE;

-- Post Likes: When post is deleted, delete its likes
ALTER TABLE post_likes
DROP CONSTRAINT IF EXISTS post_likes_post_id_fkey,
ADD CONSTRAINT post_likes_post_id_fkey
  FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE;

-- Job Likes: When user is deleted, delete their likes
ALTER TABLE job_likes
DROP CONSTRAINT IF EXISTS job_likes_user_id_fkey,
ADD CONSTRAINT job_likes_user_id_fkey
  FOREIGN KEY (user_id) REFERENCES profiles(id) ON DELETE CASCADE;

-- Job Likes: When job is deleted, delete its likes
ALTER TABLE job_likes
DROP CONSTRAINT IF EXISTS job_likes_job_id_fkey,
ADD CONSTRAINT job_likes_job_id_fkey
  FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE;
