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

async function cleanSections() {
  const databases = [process.env.DB_NAME || 'adarshtv', 'adarshtv', 'abhishek tv'];
  for (const db of Array.from(new Set(databases))) {
    try {
      const conn = await mysql.createConnection({
        host: process.env.DB_HOST || 'localhost',
        port: Number(process.env.DB_PORT || 3306),
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: db,
      });

      const [res] = await conn.query(`
        DELETE ps FROM page_sections ps
        JOIN pages p ON ps.page_id = p.id
        WHERE p.is_homepage = 1 AND ps.type = 'features'
      `);
      console.log(`Deleted ${res.affectedRows} feature section(s) from homepage in database \`${db}\``);

      // Verify remaining sections on homepage
      const [rows] = await conn.query(`
        SELECT ps.id, ps.type, ps.title FROM page_sections ps
        JOIN pages p ON ps.page_id = p.id
        WHERE p.is_homepage = 1
        ORDER BY ps.sort_order ASC
      `);
      console.log(`Remaining homepage sections in \`${db}\`:`, rows);

      await conn.end();
    } catch (e) {
      console.error(`Error in \`${db}\`:`, e.message);
    }
  }
}

cleanSections();
