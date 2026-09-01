const fs = require("fs");
const path = require("path");
const mysql = require("mysql2/promise");
const bcrypt = require("bcryptjs");
const { downloadAll, upsertMedia, localUrl, SERVICE_FILES } = require("./local-images");

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

const IMG = {
  tv: localUrl("tv-hero.jpg"),
  tech: localUrl("tv-soldering.jpg"),
  living: localUrl("tv-living.jpg"),
};

async function seedDatabase(database) {
  const host = process.env.DB_HOST || "127.0.0.1";
  const port = Number(process.env.DB_PORT || 3306);
  const user = process.env.DB_USER || "root";
  const password = process.env.DB_PASSWORD || "";

  console.log(`\n========================================`);
  console.log(`Setting up database: \`${database}\` on ${host}:${port}`);
  console.log(`========================================`);

  const root = await mysql.createConnection({ host, port, user, password, multipleStatements: true });
  await root.query(`CREATE DATABASE IF NOT EXISTS \`${database}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
  await root.end();

  const schema = fs
    .readFileSync(path.join(__dirname, "schema.sql"), "utf8")
    .replace(/CREATE DATABASE IF NOT EXISTS tvrepair[\s\S]*?;\s*USE tvrepair;\s*/i, "");
  const conn = await mysql.createConnection({ host, port, user, password, database, multipleStatements: true });
  await conn.query(schema);

  const files = await downloadAll();
  const mediaIds = {};
  for (const file of Object.values(files)) {
    mediaIds[file.filename] = await upsertMedia(conn, file, file.filename.replace(".jpg", "").replace(/-/g, " "));
  }

  const hash = await bcrypt.hash("Admin@12345", 12);
  const [userRes] = await conn.execute(
    "INSERT INTO users (name, email, password_hash, role, status) VALUES (?,?,?,?,?)",
    ["Adarsh Admin", "admin@adarshledtvrepair.com", hash, "admin", "active"],
  );
  const adminId = userRes.insertId;

  const settings = {
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
    "social.facebook": "https://facebook.com",
    "social.instagram": "https://instagram.com",
    "social.youtube": "https://youtube.com",
    "social.linkedin": "https://linkedin.com",
    "social.twitter": "https://x.com",
    "seo.default_title": "Adarsh LED TV Repair | Best Doorstep TV Repair in Noida",
    "seo.default_description": "Adarsh LED TV Repair provides trusted doorstep TV repair in Noida, Bhangel, Salarpur Khadar & Delhi NCR with warranty for LED, OLED, Smart & 4K TVs. Call 9990113545.",
    "seo.default_og_image": IMG.tv,
    "seo.ga": "",
    "seo.gtm": "",
    "seo.gsc": "",
    "footer.copyright": `© ${new Date().getFullYear()} Adarsh LED TV Repair. All rights reserved.`,
  };

  for (const [key, value] of Object.entries(settings)) {
    const group = key.split(".")[0];
    await conn.execute(
      "INSERT INTO settings (setting_key, setting_value, group_name) VALUES (?,?,?)",
      [key, value, group],
    );
  }

  async function addPage(title, slug, isHome, excerpt, sections, seo) {
    const [res] = await conn.execute(
      "INSERT INTO pages (title, slug, template, status, is_homepage, excerpt, published_at) VALUES (?,?,?,?,?,?,NOW())",
      [title, slug, "default", "published", isHome ? 1 : 0, excerpt],
    );
    const pageId = res.insertId;
    for (const [i, section] of sections.entries()) {
      await conn.execute(
        "INSERT INTO page_sections (page_id, type, title, content, settings, sort_order, is_visible) VALUES (?,?,?,?,?,?,1)",
        [pageId, section.type, section.title || null, JSON.stringify(section.content || {}), JSON.stringify(section.settings || { padding: "lg" }), i],
      );
    }
    await conn.execute(
      "INSERT INTO seo_metadata (entity_type, entity_id, seo_title, meta_description, focus_keyword, canonical_url, robots_index, robots_follow, schema_type) VALUES (?,?,?,?,?,?,1,1,?)",
      [isHome ? "homepage" : "page", pageId, seo.title, seo.desc, seo.kw, `/${isHome ? "" : slug}`, seo.schema || "WebPage"],
    );
    return pageId;
  }

  await addPage(
    "Home",
    "home",
    true,
    "Professional doorstep TV repair across Noida, Bhangel, Salarpur and Delhi NCR by Adarsh LED TV Repair.",
    [
      {
        type: "hero",
        title: "Hero",
        content: {
          eyebrow: "Noida · Bhangel · Doorstep Service · 90-Day Warranty",
          heading: "Expert TV Repair, Right at Your Doorstep",
          description: "Fast, certified and affordable repair for LED, OLED, QLED, Smart and Android TVs across Noida, Bhangel, Salarpur Khadar and Delhi NCR.",
          primaryLabel: "Book a Repair",
          primaryHref: "/book-service",
          secondaryLabel: "Call Now",
          secondaryHref: "tel:9990113545",
          image: IMG.tv,
          availabilityText: "Call 9990113545 · Expert technicians available for all major brands in Noida",
          badges: ["Doorstep in 60-90 Mins", "90-Day Repair Warranty", "Transparent Estimate", "All Major Brands"],
          showBookingForm: true,
        },
      },
      { type: "trust_badges", content: { items: ["Samsung", "LG", "Sony", "Mi", "TCL", "Panasonic", "OnePlus", "Vu", "Realme"] } },
      { type: "services_grid", content: { heading: "Comprehensive TV Repair Services", limit: 8 } },
      { type: "statistics", content: { items: [{ value: "15,000+", label: "TVs Repaired" }, { value: "4.9/5", label: "Customer Rating" }, { value: "60-90 min", label: "Doorstep Arrival" }, { value: "7 Days", label: "Open Every Day" }] } },
      {
        type: "image_text",
        content: {
          heading: "Specialized Board & Panel TV Repair",
          body: "Most no-power, no-display, lines on screen, and sound faults are completely recoverable. Our expert technicians carry genuine parts, LED backlight strips, and diagnostic equipment so most repairs finish in a single visit at your home.",
          image: IMG.tech,
          buttonLabel: "Learn About Us",
          buttonHref: "/about",
        },
      },
      { type: "testimonials", content: { heading: "What Our Customers in Noida Say", featuredOnly: true } },
      { type: "faq", content: { heading: "Frequently Asked Questions", category: "general" } },
      {
        type: "cta",
        content: {
          heading: "Need an Expert TV Technician Today?",
          body: "Share your TV brand, screen size and the issue. We will schedule a fast doorstep visit at your preferred time.",
          primaryLabel: "Book a Repair",
          primaryHref: "/book-service",
          secondaryLabel: "WhatsApp Us",
          secondaryHref: "https://wa.me/919990113545",
        },
      },
    ],
    { title: "Adarsh LED TV Repair | Best TV Repair in Noida", desc: "Expert LED, Smart, OLED and Android TV repair at home across Noida, Bhangel, Salarpur Khadar and Delhi NCR. Call 9990113545.", kw: "adarsh led tv repair noida", schema: "LocalBusiness" },
  );

  await addPage("About", "about", false, "About Adarsh LED TV Repair", [
    { type: "text", content: { heading: "A trusted TV repair center in Noida, dedicated to quality workmanship.", body: "Adarsh LED TV Repair is based in Flat No 1, Ananta Complex, Salarpur Khadar, Bhangel, Noida. We specialize in component-level LED, OLED, 4K, and Smart TV repairs across Noida and Delhi NCR with genuine spare parts and dedicated customer support." } },
    { type: "image_text", content: { heading: "Certified diagnostic tools and genuine spares", body: "Whether it's an intricate panel issue or power board fault, our skilled technicians solve it at your doorstep or in our specialized workshop with full warranty coverage.", image: IMG.living, buttonLabel: "Book Service", buttonHref: "/book-service" } },
    { type: "features", content: { heading: "Our 3-Step Repair Process", items: [{ title: "1. Inspection", body: "Precise electrical and visual checkup at your doorstep." }, { title: "2. Cost Confirmation", body: "Transparent quote provided before starting any repair work." }, { title: "3. Guaranteed Fix", body: "Fast on-site repair tested thoroughly with a 90-day warranty." }] } },
  ], { title: "About Adarsh LED TV Repair | Noida", desc: "Meet the expert technicians behind Adarsh LED TV Repair in Noida, Bhangel & Salarpur Khadar.", kw: "about adarsh led tv repair" });

  await addPage("Services", "services", false, "All TV Repair Services", [
    { type: "text", content: { heading: "Complete TV Repair Solutions with Doorstep Service.", body: "Explore our specialized TV repair services for LED, LCD, OLED, QLED, Android and 4K Smart TVs." } },
  ], { title: "TV Repair Services | Adarsh LED TV Repair", desc: "LED, LCD, OLED, QLED, Smart TV screen, backlight, power, sound and motherboard repair in Noida.", kw: "tv repair services noida" });

  await addPage("TV Repair", "tv-repair", false, "TV Repair Specialists in Noida", [
    { type: "text", content: { heading: "Expert TV Repair for All Major Panel Types and Brands.", body: "From standard LED TVs to premium 4K OLED and QLED displays, we provide accurate diagnosis and high-grade repairs at competitive rates." } },
  ], { title: "TV Repair in Noida | Adarsh LED TV Repair", desc: "Doorstep LED, LCD, OLED, Smart TV repair in Noida & Delhi NCR.", kw: "tv repair noida" });

  await addPage("Contact", "contact", false, "Contact Adarsh LED TV Repair", [
    { type: "text", content: { heading: "Get in Touch with Our Service Desk", body: "Call, WhatsApp or submit a request for prompt TV repair service across Noida and NCR." } },
  ], { title: "Contact Us | Adarsh LED TV Repair Noida", desc: "Call 9990113545 for fast doorstep TV repair in Bhangel, Salarpur Khadar, Noida.", kw: "contact adarsh led tv repair" });

  await addPage("Book Service", "book-service", false, "Book a TV Repair Technician", [
    { type: "text", content: { heading: "Schedule Doorstep TV Repair in Noida", body: "Choose your TV brand, select your convenient date & time slot, and our certified technician will arrive at your home." } },
  ], { title: "Book TV Repair | Adarsh LED TV Repair", desc: "Schedule doorstep TV repair in Noida, Bhangel, Salarpur Khadar. Call 9990113545.", kw: "book tv repair noida" });

  for (const [slug, title, body] of [
    ["privacy-policy", "Privacy Policy", "Adarsh LED TV Repair values your privacy. We collect customer contact details solely to fulfill repair bookings and provide service updates. Data is securely protected and never sold."],
    ["terms-and-conditions", "Terms and Conditions", "Repair estimates are provided after physical inspection. Workmanship carries a 90-day warranty unless specified otherwise on the invoice."],
  ]) {
    await addPage(title, slug, false, title, [{ type: "text", content: { heading: title, body } }], { title: `${title} | Adarsh LED TV Repair`, desc: body, kw: slug });
  }

  const services = [
    ["LED TV Repair", "led-tv-repair", "Backlight, power supply, and mainboard repairs for all LED televisions."],
    ["LCD TV Repair", "lcd-tv-repair", "Display, inverter, CCFL, and mainboard repair for LCD TVs."],
    ["Smart TV Repair", "smart-tv-repair", "Software, Wi-Fi connectivity, app crashing, and mainboard faults on Smart TVs."],
    ["OLED TV Repair", "oled-tv-repair", "Specialist repair for premium OLED panels, power boards, and pixel issues."],
    ["QLED TV Repair", "qled-tv-repair", "Quantum dot display, backlight, T-con, and smart board repair."],
    ["Screen Repair", "screen-repair", "Screen flickering, color patches, lines on screen, and panel repair."],
    ["Display Problem Repair", "display-problem-repair", "No picture with sound, horizontal/vertical lines, dim display, and ghosting."],
    ["No Power Repair", "no-power-repair", "Dead TV, red standby light blinking, power surge repair, and SMPS supply fix."],
    ["Sound Problem Repair", "sound-problem-repair", "No audio, distorted/crackling sound, speaker replacement, and audio IC repair."],
    ["HDMI Problem Repair", "hdmi-problem-repair", "HDMI ports not working, no signal input, and switching chip replacement."],
    ["Motherboard Repair", "motherboard-repair", "Micro-soldering, processor IC repair, RAM issues, and motherboard replacement."],
    ["Backlight Repair", "backlight-repair", "Dark screen with sound, dim display, LED strip replacement with 100% original parts."],
    ["Panel Repair", "panel-repair", "COF bonding, glass level repair, and accurate panel fault restoration."],
    ["Software Problem Repair", "software-problem-repair", "Android TV bootloop fix, firmware update, logo stuck issue, and smart OS recovery."],
    ["Remote Problem", "remote-problem", "IR receiver repair, bluetooth sensor troubleshooting, and replacement smart remotes."],
    ["Installation & Setup", "installation-setup", "Professional wall mounting, swivel mount setup, cable management, and home theater sync."],
  ];

  const serviceIds = [];
  for (const [i, [name, slug, desc]] of services.entries()) {
    const [res] = await conn.execute(
      "INSERT INTO services (name, slug, short_description, description, image_id, benefits, symptoms, is_featured, status, sort_order) VALUES (?,?,?,?,?,?,?,?,?,?)",
      [
        name,
        slug,
        desc,
        `${desc} Adarsh LED TV Repair technicians inspect the TV at your doorstep in Noida, explain the issue clearly, and complete the repair using certified tools and original spare parts.`,
        mediaIds[SERVICE_FILES[slug]] || null,
        JSON.stringify(["Doorstep diagnosis in 60-90 mins", "Transparent quote before repair", "90-Day warranty on workmanship & parts"]),
        JSON.stringify(["No display / Blank screen", "No power / Standby light blinking", "No sound or audio distortion", "Smart TV hanging / Wi-Fi disconnected"]),
        i < 6 ? 1 : 0,
        "published",
        i,
      ],
    );
    serviceIds.push(res.insertId);
    await conn.execute(
      "INSERT INTO service_faqs (service_id, question, answer, sort_order) VALUES (?,?,?,0), (?,?,?,1)",
      [
        res.insertId,
        `How quickly can Adarsh LED TV Repair attend a ${name.toLowerCase()} request?`,
        "In Noida, Bhangel, Salarpur, and NCR, our technicians typically arrive within 60 to 90 minutes of your booking.",
        res.insertId,
        `Do you repair all brands for ${name.toLowerCase()}?`,
        "Yes, we service Samsung, LG, Sony, Mi, TCL, Panasonic, OnePlus, Vu, Realme, Thomson, and all other brands.",
      ],
    );
    await conn.execute(
      "INSERT INTO seo_metadata (entity_type, entity_id, seo_title, meta_description, focus_keyword, robots_index, robots_follow, schema_type) VALUES ('service',?,?,?,?,1,1,'Service')",
      [res.insertId, `${name} in Noida | Doorstep Service | Adarsh LED TV Repair`, `Professional ${name.toLowerCase()} at your doorstep in Noida & NCR with warranty. Call 9990113545.`, name.toLowerCase()],
    );
  }

  const [catRes] = await conn.execute(
    "INSERT INTO blog_categories (name, slug, description) VALUES ('TV Repair Guides','repair-guides','Expert diagnostic and maintenance guides by Adarsh LED TV Repair')",
  );
  const posts = [
    ["TV has sound but no picture? Here is what is happening", "tv-sound-no-picture", "When your TV plays audio but shows a dark or black screen, it is usually a backlight LED strip or T-con board fault. Here is how our Noida technicians diagnose and fix it."],
    ["LED vs OLED TV repair: Common issues and cost factors", "oled-panel-replacement", "Understanding the difference between LED backlight faults and OLED panel restoration, with honest repair guidance."],
    ["Smart TV boot loop and Android logo stuck: Quick fixes", "smart-tv-software-faults", "Why Smart TVs get stuck on the brand logo or restart continuously, and how firmware reprogramming resolves it."],
  ];
  for (const [title, slug, excerpt] of posts) {
    const [res] = await conn.execute(
      "INSERT INTO blogs (title, slug, excerpt, content, author_id, category_id, status, published_at) VALUES (?,?,?,?,?,?, 'published', NOW())",
      [title, slug, excerpt, `<p>${excerpt}</p><p>For professional doorstep inspection in Noida, Bhangel, Salarpur and Delhi NCR, call Adarsh LED TV Repair at <strong>9990113545</strong>.</p>`, adminId, catRes.insertId],
    );
    await conn.execute(
      "INSERT INTO seo_metadata (entity_type, entity_id, seo_title, meta_description, robots_index, robots_follow, schema_type) VALUES ('blog',?,?,?,1,1,'Article')",
      [res.insertId, `${title} | Adarsh LED TV Repair`, excerpt],
    );
  }

  const faqs = [
    ["Do you provide doorstep TV repair in Noida?", "Yes! Adarsh LED TV Repair provides fast doorstep service across all sectors of Noida, Bhangel, Salarpur Khadar, Noida Extension, and Greater Noida within 60-90 minutes.", "general"],
    ["Which TV brands and models do you service?", "We repair all brands including Sony Bravia, Samsung, LG, Mi / Xiaomi, OnePlus, TCL, Panasonic, Vu, Realme, Sansui, Toshiba, and Lloyd.", "general"],
    ["Is there a warranty on your repair work?", "Yes, all our repairs come with up to 90 days of workmanship and parts warranty. Details are clearly documented on your invoice.", "general"],
    ["What are your working hours and contact number?", "We are available 24 Hours, 7 Days a week. You can call or WhatsApp us anytime at 9990113545.", "general"],
  ];
  for (const [i, [q, a, cat]] of faqs.entries()) {
    await conn.execute("INSERT INTO faqs (question, answer, category, sort_order, status) VALUES (?,?,?,?,'active')", [q, a, cat, i]);
  }

  const reviews = [
    ["Rohit Verma", 5, "My 55-inch Sony TV had backlight failure. The technician from Adarsh LED TV Repair arrived in Bhangel within 1 hour and fixed it on-site. Very reasonable price!", "Bhangel, Noida"],
    ["Pooja Sharma", 5, "Excellent service! My Samsung LED TV power supply board was fixed at home in Salarpur. Very professional and polite technician.", "Salarpur Khadar, Noida"],
    ["Amitabh Sengupta", 5, "Motherboard issue on Mi Smart TV solved same day in Sector 62. Transparent estimate before starting the work. Highly recommended!", "Sector 62, Noida"],
    ["Deepak Chauhan", 5, "Prompt doorstep response in Noida Extension. LG 4K OLED sound fault was fixed quickly with genuine components.", "Noida Extension"],
  ];
  for (const [name, rating, review, loc] of reviews) {
    await conn.execute(
      "INSERT INTO testimonials (customer_name, rating, review, location, review_date, is_featured, status) VALUES (?,?,?,?,CURDATE(),1,'active')",
      [name, rating, review, loc],
    );
  }

  const [header] = await conn.execute("INSERT INTO menus (name, location) VALUES ('Header','header')");
  const [footer] = await conn.execute("INSERT INTO menus (name, location) VALUES ('Footer','footer')");
  const [legal] = await conn.execute("INSERT INTO menus (name, location) VALUES ('Legal','footer_legal')");
  const headerItems = [
    ["Home", "/"],
    ["TV Repair", "/tv-repair"],
    ["Services", "/services"],
    ["About", "/about"],
    ["Blog", "/blog"],
    ["Contact", "/contact"],
  ];
  for (const [i, [label, url]] of headerItems.entries()) {
    await conn.execute("INSERT INTO menu_items (menu_id, label, url, sort_order, is_enabled) VALUES (?,?,?,?,1)", [header.insertId, label, url, i]);
  }
  for (const [i, [label, url]] of headerItems.entries()) {
    await conn.execute("INSERT INTO menu_items (menu_id, label, url, sort_order, is_enabled) VALUES (?,?,?,?,1)", [footer.insertId, label, url, i]);
  }
  const legalItems = [["Privacy Policy", "/privacy-policy"], ["Terms", "/terms-and-conditions"]];
  for (const [i, [label, url]] of legalItems.entries()) {
    await conn.execute("INSERT INTO menu_items (menu_id, label, url, sort_order, is_enabled) VALUES (?,?,?,?,1)", [legal.insertId, label, url, i]);
  }

  await conn.end();
  console.log(`Database \`${database}\` successfully seeded!`);
}

async function main() {
  const configuredDb = process.env.DB_NAME || "tvrepair";
  const targets = Array.from(new Set([configuredDb, "adarshtv", "abhishek tv"]));

  for (const db of targets) {
    try {
      await seedDatabase(db);
    } catch (err) {
      console.error(`Error seeding database \`${db}\`:`, err.message);
    }
  }

  console.log("\n========================================");
  console.log("All target databases ready for Adarsh LED TV Repair!");
  console.log("Admin login: admin@adarshledtvrepair.com / Admin@12345");
  console.log("Phone: 9990113545");
  console.log("Address: Flat No 1, Ananta Complex, Salarpur Khadar, Bhangel, Noida-201304, Uttar Pradesh");
  console.log("========================================\n");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
