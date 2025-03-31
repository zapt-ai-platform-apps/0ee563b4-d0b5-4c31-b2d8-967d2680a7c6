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

export const eventCategories = pgTable('event_categories', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  icon: text('icon')
});

export const events = pgTable('events', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  location: text('location'),
  startDate: timestamp('start_date').notNull(),
  endDate: timestamp('end_date'),
  isPrivate: boolean('is_private').default(false),
  category: text('category').notNull(),
  organizerId: uuid('organizer_id').notNull(),
  organizerName: text('organizer_name').notNull(),
  contactEmail: text('contact_email'),
  contactPhone: text('contact_phone'),
  image: text('image'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow()
});

export const jobCategories = pgTable('job_categories', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  icon: text('icon')
});

export const jobs = pgTable('jobs', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: text('title').notNull(),
  companyName: text('company_name').notNull(),
  description: text('description').notNull(),
  location: text('location').notNull(),
  jobType: text('job_type').notNull(),
  salary: text('salary'),
  isFeatured: boolean('is_featured').default(false),
  contactEmail: text('contact_email').notNull(),
  contactPhone: text('contact_phone'),
  website: text('website'),
  posterId: uuid('poster_id').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow()
});

export const businessCategories = pgTable('business_categories', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  icon: text('icon')
});

export const businesses = pgTable('businesses', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  description: text('description').notNull(),
  category: text('category').notNull(),
  location: text('location').notNull(),
  address: text('address'),
  phone: text('phone'),
  email: text('email'),
  website: text('website'),
  isFeatured: boolean('is_featured').default(false),
  hours: text('hours'),
  logo: text('logo'),
  images: pgArray('images', text()).default('{}'),
  ownerId: uuid('owner_id').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow()
});