import { pool } from './db.js';

async function testConnection() {
  try {
    console.log('🔍 Testing database connection...\n');
    
    const client = await pool.connect();
    console.log('✅ Successfully connected to PostgreSQL!\n');
    
    // Test query
    const result = await client.query('SELECT version()');
    console.log('📊 PostgreSQL Version:');
    console.log(result.rows[0].version);
    console.log('\n✨ Database connection test passed!');
    
    client.release();
    await pool.end();
  } catch (error) {
    console.error('❌ Database connection failed:');
    console.error(error.message);
    console.log('\n💡 Tips:');
    console.log('   1. Make sure PostgreSQL is running');
    console.log('   2. Check your .env file credentials');
    console.log('   3. Verify database "learnsphere" exists');
    process.exit(1);
  }
}

testConnection();
