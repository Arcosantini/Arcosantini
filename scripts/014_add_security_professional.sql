-- Add security professional badge field to profiles
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS is_security_professional boolean DEFAULT false;
