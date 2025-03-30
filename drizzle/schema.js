import { pgTable, serial, text, uuid, decimal, boolean, timestamp, pgArray } from 'drizzle-orm/pg-core';

export const categories = pgTable('categories', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  description: text('description'),
  icon: text('icon')
});

export const listings = pgTable('listings', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  price: decimal('price', { precision: 10, scale: 2 }),
  priceText: text('price_text'),
  location: text('location').notNull(),
  categoryId: serial('category_id').references(() => categories.id),
  images: pgArray('images', text()).default('{}'),
  isShabbatRestricted: boolean('is_shabbat_restricted').default(false),
  contactEmail: text('contact_email'),
  contactPhone: text('contact_phone'),
  userId: uuid('user_id').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow()
});