-- Set humble organizational as a pending business account so it can self-approve
UPDATE profiles
SET account_type = 'business',
    verification_status = 'pending',
    verification_requested_at = NOW()
WHERE display_name = 'humble organizational';
