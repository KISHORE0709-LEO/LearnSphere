import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { pool } from './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function setupDatabase() {
  const client = await pool.connect();
  
  try {
    console.log('🚀 Starting database setup...\n');
    
    // Read and execute schema
    console.log('📋 Creating tables and schema...');
    const schemaSQL = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
    await client.query(schemaSQL);
    console.log('✅ Schema created successfully\n');
    
    // Read and execute seed data
    console.log('🌱 Inserting seed data...');
    const seedSQL = fs.readFileSync(path.join(__dirname, 'seed_data.sql'), 'utf8');
    await client.query(seedSQL);
    console.log('✅ Seed data inserted successfully\n');
    
    // Verify data
    const userCount = await client.query('SELECT COUNT(*) FROM users');
    const courseCount = await client.query('SELECT COUNT(*) FROM courses');
    const lessonCount = await client.query('SELECT COUNT(*) FROM lessons');
    const reviewCount = await client.query('SELECT COUNT(*) FROM reviews');
    
    console.log('📊 Database Statistics:');
    console.log(`   Users: ${userCount.rows[0].count}`);
    console.log(`   Courses: ${courseCount.rows[0].count}`);
    console.log(`   Lessons: ${lessonCount.rows[0].count}`);
    console.log(`   Reviews: ${reviewCount.rows[0].count}`);
    console.log('\n✨ Database setup completed successfully!');
    
  } catch (error) {
    console.error('❌ Error setting up database:', error.message);
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

setupDatabase().catch(console.error);
