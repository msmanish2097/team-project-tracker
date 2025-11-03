-- =============================================
-- ProjectHub Database Schema for Supabase
-- =============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- TABLES
-- =============================================

-- Team Members Table
CREATE TABLE team_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  avatar TEXT,
  role TEXT DEFAULT 'member',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Projects Table
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL CHECK (status IN ('planning', 'active', 'completed', 'on-hold')),
  deadline TIMESTAMP WITH TIME ZONE NOT NULL,
  progress INTEGER DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Project Assignments (Many-to-Many)
CREATE TABLE project_assignments (
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  member_id UUID REFERENCES team_members(id) ON DELETE CASCADE,
  assigned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (project_id, member_id)
);

-- Leave Requests Table
CREATE TABLE leave_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  employee_id UUID REFERENCES team_members(id) ON DELETE CASCADE,
  leave_type TEXT NOT NULL CHECK (leave_type IN ('vacation', 'sick', 'personal', 'unpaid')),
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  reason TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  days INTEGER NOT NULL,
  applied_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  approved_by TEXT,
  approved_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Activity Log Table
CREATE TABLE activity_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  user_id UUID REFERENCES team_members(id) ON DELETE SET NULL,
  type TEXT NOT NULL CHECK (type IN ('created', 'updated', 'completed', 'comment')),
  message TEXT NOT NULL,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- INDEXES for better performance
-- =============================================

CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_projects_deadline ON projects(deadline);
CREATE INDEX idx_leave_requests_status ON leave_requests(status);
CREATE INDEX idx_leave_requests_employee ON leave_requests(employee_id);
CREATE INDEX idx_activity_log_project ON activity_log(project_id);
CREATE INDEX idx_activity_log_timestamp ON activity_log(timestamp DESC);

-- =============================================
-- ROW LEVEL SECURITY (RLS)
-- =============================================

-- Enable RLS on all tables
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE leave_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_log ENABLE ROW LEVEL SECURITY;

-- Policies (Allow all for authenticated users - adjust based on your needs)
CREATE POLICY "Allow all for authenticated users" ON team_members
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Allow all for authenticated users" ON projects
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Allow all for authenticated users" ON project_assignments
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Allow all for authenticated users" ON leave_requests
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Allow all for authenticated users" ON activity_log
  FOR ALL USING (auth.role() = 'authenticated');

-- =============================================
-- FUNCTIONS & TRIGGERS
-- =============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_team_members_updated_at
  BEFORE UPDATE ON team_members
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- =============================================
-- SAMPLE DATA (Optional - for testing)
-- =============================================

-- Insert sample team members
INSERT INTO team_members (name, email, avatar, role) VALUES
  ('Sarah Johnson', 'sarah@example.com', 'SJ', 'manager'),
  ('Michael Chen', 'michael@example.com', 'MC', 'member'),
  ('Emily Rodriguez', 'emily@example.com', 'ER', 'member'),
  ('David Kim', 'david@example.com', 'DK', 'member'),
  ('Jessica Taylor', 'jessica@example.com', 'JT', 'member');

-- Insert sample projects
INSERT INTO projects (name, description, status, deadline, progress) VALUES
  ('Website Redesign', 'Complete overhaul of company website with modern UI/UX', 'active', '2024-03-15', 65),
  ('Mobile App Development', 'Native iOS and Android app for customer engagement', 'active', '2024-04-30', 40),
  ('Marketing Campaign Q1', 'Launch comprehensive marketing campaign for Q1 2024', 'planning', '2024-03-01', 20);

-- =============================================
-- VIEWS (Optional - for easier queries)
-- =============================================

-- View for projects with team member count
CREATE VIEW projects_with_team_count AS
SELECT 
  p.*,
  COUNT(pa.member_id) as team_size
FROM projects p
LEFT JOIN project_assignments pa ON p.id = pa.project_id
GROUP BY p.id;

-- View for leave statistics
CREATE VIEW leave_statistics AS
SELECT 
  employee_id,
  COUNT(*) as total_requests,
  SUM(CASE WHEN status = 'approved' THEN days ELSE 0 END) as total_days_off,
  COUNT(CASE WHEN status = 'pending' THEN 1 END) as pending_requests
FROM leave_requests
GROUP BY employee_id;
