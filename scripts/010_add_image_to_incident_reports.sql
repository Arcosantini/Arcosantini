-- Add image_url column to incident_reports table
ALTER TABLE incident_reports
ADD COLUMN image_url TEXT;

-- Add comment for the new column
COMMENT ON COLUMN incident_reports.image_url IS 'URL to the uploaded incident image/evidence';
