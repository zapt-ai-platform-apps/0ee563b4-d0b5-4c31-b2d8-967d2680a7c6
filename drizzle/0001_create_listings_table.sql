CREATE TABLE IF NOT EXISTS "categories" (
  "id" SERIAL PRIMARY KEY,
  "name" TEXT NOT NULL,
  "slug" TEXT NOT NULL UNIQUE,
  "description" TEXT,
  "icon" TEXT
);

CREATE TABLE IF NOT EXISTS "listings" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "title" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "price" DECIMAL(10, 2),
  "price_text" TEXT,
  "location" TEXT NOT NULL,
  "category_id" INTEGER REFERENCES "categories"("id"),
  "images" TEXT[] DEFAULT '{}',
  "is_shabbat_restricted" BOOLEAN DEFAULT FALSE,
  "contact_email" TEXT,
  "contact_phone" TEXT,
  "user_id" UUID NOT NULL,
  "created_at" TIMESTAMP DEFAULT NOW(),
  "updated_at" TIMESTAMP DEFAULT NOW()
);

-- Insert default categories
INSERT INTO "categories" ("name", "slug", "description", "icon")
VALUES 
  ('Judaica', 'judaica', 'Torah scrolls, menorahs, mezuzahs, and other religious items', '✡️'),
  ('Kosher Food', 'kosher-food', 'Kosher food products, ingredients, and specialty items', '🍽️'),
  ('Holiday Items', 'holiday-items', 'Items related to Jewish holidays like Passover, Hanukkah, and Rosh Hashanah', '🕎'),
  ('Books & Media', 'books-media', 'Books, music, films, and educational materials related to Judaism', '📚'),
  ('Clothing', 'clothing', 'Traditional and modern Jewish clothing items', '👕'),
  ('Home & Furniture', 'home-furniture', 'Household items and furniture with Jewish themes or for Jewish homes', '🏠'),
  ('Services', 'services', 'Services offered within the Jewish community', '🔧'),
  ('Electronics', 'electronics', 'Electronics and gadgets', '💻'),
  ('Community Events', 'community-events', 'Listings for community events, classes, and gatherings', '🎭'),
  ('Jobs', 'jobs', 'Job opportunities in Jewish organizations or businesses', '💼'),
  ('Other', 'other', 'Miscellaneous items not fitting in other categories', '🔍')
ON CONFLICT (slug) DO NOTHING;