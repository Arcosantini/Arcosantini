-- Add business verification fields to profiles
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS account_type text DEFAULT 'professional';
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS verification_status text DEFAULT 'none';
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS verification_requested_at timestamptz;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS verified_at timestamptz;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS is_admin boolean DEFAULT false;

-- Set the "humble organizational" account as admin
UPDATE profiles SET is_admin = true WHERE display_name = 'humble organizational';
