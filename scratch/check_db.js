const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

function loadEnv() {
  const envPath = path.join(process.cwd(), '.env');
  if (!fs.existsSync(envPath)) return;
  for (const line of fs.readFileSync(envPath, 'utf8').split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#') || !trimmed.includes('=')) continue;
    const idx = trimmed.indexOf('=');
    const key = trimmed.slice(0, idx).trim();
    const value = trimmed.slice(idx + 1).trim();
    if (!process.env[key]) process.env[key] = value;
  }
}
loadEnv();

async function check() {
  console.log('Current .env DB_NAME:', process.env.DB_NAME);
  const conn = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
  });

  const databases = ['abhishek tv', 'adarshtv', 'tvrepair'];
  for (const db of databases) {
    console.log('\n--- Checking DB:', db, '---');
    try {
      await conn.query('USE `' + db + '`');
      const [tables] = await conn.query('SHOW TABLES');
      console.log('Tables count:', tables.length);
      if (tables.length > 0) {
        console.log('Tables:', tables.map(t => Object.values(t)[0]));
        try {
          const [settings] = await conn.query('SELECT setting_key, setting_value FROM settings LIMIT 10');
          console.log('Settings in', db, ':', settings);
        } catch (e) {
          console.log('No settings table or error:', e.message);
        }
      }
    } catch (err) {
      console.log('Error with DB', db, ':', err.message);
    }
  }
  await conn.end();
}

check().catch(console.error);
