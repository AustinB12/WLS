const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, 'library.db');
const SEED_FILE = path.join(__dirname, 'seed.sql');

console.log('🌱 Seeding database with Star Wars themed data...\n');

// Read the seed SQL file
const seedSQL = fs.readFileSync(SEED_FILE, 'utf8');

// Create database connection
const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error('❌ Error connecting to database:', err.message);
    process.exit(1);
  }
  console.log('✅ Connected to database');

  // Enable foreign keys first
  db.run('PRAGMA foreign_keys = ON');

  // Execute the entire seed file
  db.exec(seedSQL, (err) => {
    if (err) {
      console.error('❌ Error seeding database:', err.message);
      process.exit(1);
    }

    console.log('✅ Seed completed successfully!\n');

    // Display summary
    db.get('SELECT COUNT(*) as count FROM patrons', (err, row) => {
      if (!err && row) console.log(`📊 Patrons: ${row.count}`);
    });

    db.get('SELECT COUNT(*) as count FROM catalog_items', (err, row) => {
      if (!err && row) console.log(`📚 Catalog Items: ${row.count}`);
    });

    db.get('SELECT COUNT(*) as count FROM books', (err, row) => {
      if (!err && row) console.log(`📖 Books: ${row.count}`);
    });

    db.get('SELECT COUNT(*) as count FROM item_copies', (err, row) => {
      if (!err && row) console.log(`📦 Item Copies: ${row.count}`);
    });

    db.get(
      'SELECT COUNT(*) as count FROM transactions WHERE status = "active"',
      (err, row) => {
        if (!err && row) console.log(`🔄 Active Checkouts: ${row.count}`);
      }
    );

    db.get('SELECT COUNT(*) as count FROM reservations', (err, row) => {
      if (!err && row) {
        console.log(`🔖 Reservations: ${row.count}`);

        // Close the database
        db.close((err) => {
          if (err) {
            console.error('❌ Error closing database:', err.message);
          } else {
            console.log(
              '\n✨ Database connection closed. May the Force be with you!'
            );
          }
        });
      }
    });
  });
});
