-- Create Events table
CREATE TABLE IF NOT EXISTS "events" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "title" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "location" TEXT,
  "start_date" TIMESTAMP NOT NULL,
  "end_date" TIMESTAMP,
  "is_private" BOOLEAN DEFAULT FALSE,
  "category" TEXT NOT NULL,
  "organizer_id" UUID NOT NULL,
  "organizer_name" TEXT NOT NULL,
  "contact_email" TEXT,
  "contact_phone" TEXT,
  "image" TEXT,
  "created_at" TIMESTAMP DEFAULT NOW(),
  "updated_at" TIMESTAMP DEFAULT NOW()
);

-- Create Jobs table
CREATE TABLE IF NOT EXISTS "jobs" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "title" TEXT NOT NULL,
  "company_name" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "location" TEXT NOT NULL,
  "job_type" TEXT NOT NULL,
  "salary" TEXT,
  "is_featured" BOOLEAN DEFAULT FALSE,
  "contact_email" TEXT NOT NULL,
  "contact_phone" TEXT,
  "website" TEXT,
  "poster_id" UUID NOT NULL,
  "created_at" TIMESTAMP DEFAULT NOW(),
  "updated_at" TIMESTAMP DEFAULT NOW()
);

-- Create Businesses table
CREATE TABLE IF NOT EXISTS "businesses" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "name" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "category" TEXT NOT NULL,
  "location" TEXT NOT NULL,
  "address" TEXT,
  "phone" TEXT,
  "email" TEXT,
  "website" TEXT,
  "is_featured" BOOLEAN DEFAULT FALSE,
  "hours" TEXT,
  "logo" TEXT,
  "images" TEXT[] DEFAULT '{}',
  "owner_id" UUID NOT NULL,
  "created_at" TIMESTAMP DEFAULT NOW(),
  "updated_at" TIMESTAMP DEFAULT NOW()
);

-- Add event categories
CREATE TABLE IF NOT EXISTS "event_categories" (
  "id" SERIAL PRIMARY KEY,
  "name" TEXT NOT NULL,
  "slug" TEXT NOT NULL UNIQUE,
  "icon" TEXT
);

-- Insert default event categories
INSERT INTO "event_categories" ("name", "slug", "icon")
VALUES 
  ('Simchas', 'simchas', '🎉'),
  ('Business Events', 'business-events', '💼'),
  ('School Calendars', 'school-calendars', '🏫'),
  ('Organizational Events', 'organizational-events', '🏢'),
  ('Charity Campaigns', 'charity-campaigns', '🤲'),
  ('Shul Schedules', 'shul-schedules', '🕍'),
  ('Hall Availability', 'hall-availability', '🏛️'),
  ('Classes & Workshops', 'classes-workshops', '📚'),
  ('Community Gatherings', 'community-gatherings', '👪')
ON CONFLICT (slug) DO NOTHING;

-- Add job categories
CREATE TABLE IF NOT EXISTS "job_categories" (
  "id" SERIAL PRIMARY KEY,
  "name" TEXT NOT NULL,
  "slug" TEXT NOT NULL UNIQUE,
  "icon" TEXT
);

-- Insert default job categories
INSERT INTO "job_categories" ("name", "slug", "icon")
VALUES 
  ('Education', 'education', '🎓'),
  ('Healthcare', 'healthcare', '⚕️'),
  ('Technology', 'technology', '💻'),
  ('Finance', 'finance', '💰'),
  ('Hospitality', 'hospitality', '🍽️'),
  ('Retail', 'retail', '🛍️'),
  ('Religious Services', 'religious-services', '✡️'),
  ('Community Services', 'community-services', '🤝'),
  ('Administrative', 'administrative', '📋'),
  ('Other', 'other', '🔍')
ON CONFLICT (slug) DO NOTHING;

-- Add business categories
CREATE TABLE IF NOT EXISTS "business_categories" (
  "id" SERIAL PRIMARY KEY,
  "name" TEXT NOT NULL,
  "slug" TEXT NOT NULL UNIQUE,
  "icon" TEXT
);

-- Insert default business categories
INSERT INTO "business_categories" ("name", "slug", "icon")
VALUES 
  ('Kosher Food & Restaurants', 'kosher-food', '🍽️'),
  ('Judaica & Gift Shops', 'judaica-shops', '🎁'),
  ('Educational Services', 'educational-services', '📚'),
  ('Event Venues & Services', 'event-services', '🎊'),
  ('Religious Services', 'religious-services', '✡️'),
  ('Health & Wellness', 'health-wellness', '💆'),
  ('Professional Services', 'professional-services', '👔'),
  ('Home & Family', 'home-family', '🏠'),
  ('Technology & Media', 'technology-media', '💻'),
  ('Community Organizations', 'community-organizations', '🤝')
ON CONFLICT (slug) DO NOTHING;