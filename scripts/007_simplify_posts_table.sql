-- Remove event-related columns from posts table since we simplified to just text and images
ALTER TABLE posts DROP COLUMN IF EXISTS event_name;
ALTER TABLE posts DROP COLUMN IF EXISTS event_date;
ALTER TABLE posts DROP COLUMN IF EXISTS event_location;
