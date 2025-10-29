const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, 'library.db');
const SCRIPT_FILE = path.join(__dirname, 's.sql');

console.log('🏃 Running the custom script...\n');

// Read the seed SQL file
const script_sql = fs.readFileSync(SCRIPT_FILE, 'utf8');

// Create database connection
const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error('❌ Error connecting to database:', err.message);
    process.exit(1);
  }
  console.log('✅ Connected to database');

  // Enable foreign keys first
  db.run('PRAGMA foreign_keys = ON');

  // db.get('ALTER TABLE patrons ADD COLUMN image_url TEXT;', (err) => {
  db.get('PRAGMA table_info(patrons);', (err, row) => {
    if (err) {
      console.error('❌ Error altering table:', err.message);
      process.exit(1);
    }
    console.log(row);
  });

  db.close((err) => {
    if (err) {
      console.error('❌ Error closing database:', err.message);
    } else {
      console.log(
        '\n✨ Database connection closed. May the Force be with you!'
      );
    }
  });

  // Execute the entire seed file
  // db.exec(script_sql, (err) => {
  //   if (err) {
  //     console.error('❌ Error seeding database:', err.message);
  //     process.exit(1);
  //   }

  //   console.log('✅ Script executed successfully!\n');

  //   // Display summary
  //   db.get('SELECT COUNT(*) as count FROM patrons', (err, row) => {
  //     if (!err && row) console.log(`📊 Patrons: ${row.count}`);
  //   });

  //   db.get('SELECT COUNT(*) as count FROM catalog_items', (err, row) => {
  //     if (!err && row) console.log(`📚 Catalog Items: ${row.count}`);
  //   });

  //   db.get('SELECT COUNT(*) as count FROM books', (err, row) => {
  //     if (!err && row) console.log(`📖 Books: ${row.count}`);
  //   });

  //   db.get('SELECT COUNT(*) as count FROM item_copies', (err, row) => {
  //     if (!err && row) console.log(`📦 Item Copies: ${row.count}`);
  //   });

  //   db.get(
  //     'SELECT COUNT(*) as count FROM transactions WHERE status = "active"',
  //     (err, row) => {
  //       if (!err && row) console.log(`🔄 Active Checkouts: ${row.count}`);
  //     }
  //   );

  //   db.get('SELECT COUNT(*) as count FROM reservations', (err, row) => {
  //     if (!err && row) {
  //       console.log(`🔖 Reservations: ${row.count}`);
  //     }
  //   });

  //   db.get('SELECT * FROM transactions', (err, row) => {
  //     if (!err && row) {
  //       console.log('\n📋 Transactions:', Object.keys(row));
  //       console.log(Object.values(row));

  //       // Close the database
  //       db.close((err) => {
  //         if (err) {
  //           console.error('❌ Error closing database:', err.message);
  //         } else {
  //           console.log(
  //             '\n✨ Database connection closed. May the Force be with you!'
  //           );
  //         }
  //       });
  //     }
  //   });
  // });
});
