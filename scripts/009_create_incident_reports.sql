-- Create incident_reports table
CREATE TABLE IF NOT EXISTS incident_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reported_by_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  incident_date DATE NOT NULL,
  incident_time TIME NOT NULL,
  incident_location TEXT NOT NULL,
  persons_involved TEXT NOT NULL,
  description TEXT NOT NULL,
  prevention_strategy TEXT,
  witness_name TEXT,
  witness_contact TEXT,
  status TEXT DEFAULT 'open',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enable RLS
ALTER TABLE incident_reports ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Allow users to view all incident reports
CREATE POLICY "incident_reports_select_all" ON incident_reports
  FOR SELECT USING (true);

-- Allow users to insert their own incident reports
CREATE POLICY "incident_reports_insert_own" ON incident_reports
  FOR INSERT WITH CHECK (reported_by_id = auth.uid());

-- Allow users to update their own incident reports
CREATE POLICY "incident_reports_update_own" ON incident_reports
  FOR UPDATE USING (reported_by_id = auth.uid()) WITH CHECK (reported_by_id = auth.uid());

-- Allow users to delete their own incident reports
CREATE POLICY "incident_reports_delete_own" ON incident_reports
  FOR DELETE USING (reported_by_id = auth.uid());

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_incident_reports_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER incident_reports_updated_at
BEFORE UPDATE ON incident_reports
FOR EACH ROW
EXECUTE FUNCTION update_incident_reports_updated_at();
