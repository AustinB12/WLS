const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const DB_PATH = path.join(__dirname, '../library.db');

console.log('🔄 Running migration: Add location_id to transactions table...\n');

const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error('❌ Error connecting to database:', err.message);
    process.exit(1);
  }
  console.log('✅ Connected to database');
});

// Enable foreign keys
db.run('PRAGMA foreign_keys = ON');

// Check if column already exists
db.get('PRAGMA table_info(transactions)', (err, row) => {
  if (err) {
    console.error('❌ Error checking table structure:', err.message);
    db.close();
    process.exit(1);
  }
});

db.all('PRAGMA table_info(transactions)', (err, columns) => {
  if (err) {
    console.error('❌ Error checking table structure:', err.message);
    db.close();
    process.exit(1);
  }

  const hasLocationId = columns.some((col) => col.name === 'location_id');

  if (hasLocationId) {
    console.log('ℹ️  Column location_id already exists in transactions table');
    console.log('✅ Migration already applied');
    db.close();
    return;
  }

  console.log('📝 Adding location_id column to transactions table...');

  // Add the new column
  db.run(
    `ALTER TABLE transactions ADD COLUMN location_id INTEGER REFERENCES branches(id) ON DELETE SET NULL`,
    (err) => {
      if (err) {
        console.error('❌ Error adding column:', err.message);
        db.close();
        process.exit(1);
      }

      console.log('✅ Column location_id added successfully');

      // Optional: Update existing transactions with location_id from item_copies
      db.run(
        `UPDATE transactions 
         SET location_id = (
           SELECT ic.branch_id 
           FROM item_copies ic 
           WHERE ic.id = transactions.copy_id
         )
         WHERE copy_id IS NOT NULL`,
        (err) => {
          if (err) {
            console.error(
              '⚠️  Warning: Could not update existing records:',
              err.message
            );
          } else {
            console.log(
              '✅ Updated existing transactions with branch locations'
            );
          }

          console.log('\n✨ Migration completed successfully!');
          db.close();
        }
      );
    }
  );
});
