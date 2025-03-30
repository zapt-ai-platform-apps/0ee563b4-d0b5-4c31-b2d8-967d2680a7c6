import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { listings, categories } from '../drizzle/schema.js';
import { eq, and, like, gte, lte, desc } from 'drizzle-orm';
import { authenticateUser } from './_apiUtils.js';
import Sentry from './_sentry.js';

export default async function handler(req, res) {
  console.log('Request to /api/listings endpoint:', req.method);
  
  if (req.method === 'GET') {
    try {
      const client = postgres(process.env.COCKROACH_DB_URL);
      const db = drizzle(client);
      
      const { 
        categoryId, 
        search, 
        minPrice, 
        maxPrice, 
        location, 
        isShabbatRestricted 
      } = req.query;
      
      console.log('Listings query params:', req.query);
      
      let query = db.select().from(listings);
      
      // Build filters
      const filters = [];
      
      if (categoryId) {
        filters.push(eq(listings.categoryId, parseInt(categoryId)));
      }
      
      if (search) {
        filters.push(
          or(
            like(listings.title, `%${search}%`),
            like(listings.description, `%${search}%`)
          )
        );
      }
      
      if (minPrice) {
        filters.push(gte(listings.price, parseFloat(minPrice)));
      }
      
      if (maxPrice) {
        filters.push(lte(listings.price, parseFloat(maxPrice)));
      }
      
      if (location) {
        filters.push(like(listings.location, `%${location}%`));
      }
      
      if (isShabbatRestricted === 'true') {
        filters.push(eq(listings.isShabbatRestricted, true));
      }
      
      // Apply filters
      if (filters.length > 0) {
        query = query.where(and(...filters));
      }
      
      // Order by most recent
      query = query.orderBy(desc(listings.createdAt));
      
      // Execute query
      const results = await query;
      console.log(`Retrieved ${results.length} listings`);
      
      res.status(200).json(results);
    } catch (error) {
      console.error('Error fetching listings:', error);
      Sentry.captureException(error);
      res.status(500).json({ error: 'Failed to fetch listings' });
    }
  } else if (req.method === 'POST') {
    try {
      // Authenticate the user
      const user = await authenticateUser(req);
      
      const client = postgres(process.env.COCKROACH_DB_URL);
      const db = drizzle(client);
      
      const listingData = req.body;
      console.log('Creating new listing:', listingData);
      
      // Add user ID to listing data
      listingData.userId = user.id;
      
      // Insert the new listing
      const result = await db.insert(listings).values(listingData).returning();
      console.log('Listing created:', result[0]);
      
      res.status(201).json(result[0]);
    } catch (error) {
      console.error('Error creating listing:', error);
      Sentry.captureException(error);
      
      if (error.message === 'Missing Authorization header' || error.message === 'Invalid token') {
        res.status(401).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Failed to create listing' });
      }
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}