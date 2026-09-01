const fs = require("fs");
const path = require("path");
const mysql = require("mysql2/promise");

function loadEnv() {
  const envPath = path.join(__dirname, "..", ".env");
  if (!fs.existsSync(envPath)) return;
  for (const line of fs.readFileSync(envPath, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("=")) continue;
    const idx = trimmed.indexOf("=");
    const key = trimmed.slice(0, idx).trim();
    const value = trimmed.slice(idx + 1).trim();
    if (!process.env[key]) process.env[key] = value;
  }
}

loadEnv();

async function updateDb(database) {
  const host = process.env.DB_HOST || "127.0.0.1";
  const port = Number(process.env.DB_PORT || 3306);
  const user = process.env.DB_USER || "root";
  const password = process.env.DB_PASSWORD || "";

  try {
    const conn = await mysql.createConnection({ host, port, user, password, database });
    console.log(`Updating business info in database: \`${database}\`...`);

    const updates = {
      "business.name": "Adarsh LED TV Repair",
      "business.logo": "/images/logo.png",
      "business.favicon": "/images/logo.png",
      "business.phone": "9990113545",
      "business.whatsapp": "919990113545",
      "business.email": "service@adarshledtvrepair.com",
      "business.address": "Flat No 1, Ananta Complex, Salarpur Khadar, Bhangel, Noida-201304, Uttar Pradesh",
      "business.city": "Noida",
      "business.pincode": "201304",
      "business.maps_url": "https://maps.google.com/?q=Flat+No+1,+Ananta+Complex,+Salarpur+Khadar,+Bhangel,+Noida+201304",
      "business.working_hours": "Open 24 Hours · 7 Days a Week",
      "contact.emergency": "9990113545",
      "seo.default_title": "Adarsh LED TV Repair | Best TV Repair in Noida",
      "seo.default_description": "Professional TV repair in Noida, Bhangel, Salarpur Khadar with warranty for LED, OLED, 4K and Smart TVs by Adarsh LED TV Repair. Call 9990113545.",
      "footer.copyright": `© ${new Date().getFullYear()} Adarsh LED TV Repair. All rights reserved.`,
    };

    for (const [key, value] of Object.entries(updates)) {
      const group = key.split(".")[0];
      const [rows] = await conn.execute("SELECT id FROM settings WHERE setting_key = ?", [key]);
      if (rows.length > 0) {
        await conn.execute("UPDATE settings SET setting_value = ? WHERE setting_key = ?", [value, key]);
      } else {
        await conn.execute("INSERT INTO settings (setting_key, setting_value, group_name) VALUES (?,?,?)", [key, value, group]);
      }
    }

    // Also update any text in homepage hero if present
    const [pages] = await conn.execute("SELECT id FROM pages WHERE is_homepage = 1");
    if (pages.length > 0) {
      const pageId = pages[0].id;
      const [sections] = await conn.execute("SELECT id, content FROM page_sections WHERE page_id = ? AND type = 'hero'", [pageId]);
      if (sections.length > 0) {
        let content = typeof sections[0].content === "string" ? JSON.parse(sections[0].content) : sections[0].content;
        content.availabilityText = "Call 9990113545 · Expert technicians available for all major brands in Noida";
        content.eyebrow = "Noida · Bhangel · Doorstep Service · 90-Day Warranty";
        content.heading = "Expert TV Repair, Right at Your Doorstep";
        content.description = "Fast, certified and affordable repair for LED, OLED, QLED, Smart and Android TVs across Noida, Bhangel, Salarpur Khadar and Delhi NCR.";
        content.secondaryHref = "tel:9990113545";
        await conn.execute("UPDATE page_sections SET content = ? WHERE id = ?", [JSON.stringify(content), sections[0].id]);
      }
    }

    await conn.end();
    console.log(`Successfully updated business settings in \`${database}\`!`);
  } catch (err) {
    console.error(`Database update error for \`${database}\`:` , err.message);
  }
}

async function main() {
  const configuredDb = process.env.DB_NAME || "tvrepair";
  const targets = Array.from(new Set([configuredDb, "adarshtv", "abhishek tv"]));
  for (const db of targets) {
    await updateDb(db);
  }
}

main();
