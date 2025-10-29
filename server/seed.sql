-- SQLite Seed Data - Star Wars Themed
-- This file populates the database with test data

PRAGMA foreign_keys
= ON;

-- Clear existing data (optional - comment out if you want to preserve data)
DELETE FROM transactions;
DELETE FROM reservations;
DELETE FROM item_copies;
DELETE FROM books;
DELETE FROM catalog_items;
DELETE FROM patrons;
-- Clear all branches except the main one, then re-insert
DELETE FROM branches;

-- Insert branches with specific IDs
INSERT INTO branches
    (id, branch_name, address, phone, is_main)
VALUES
    (1, 'Coruscant Central Library', '1138 Senate District, Coruscant', '555-CORE-001', 1),
    (2, 'Tatooine Branch', '42 Mos Eisley Cantina Way, Tatooine', '555-TATO-002', 0),
    (3, 'Naboo Royal Library', '123 Theed Palace Gardens, Naboo', '555-NABO-003', 0),
    (4, 'Endor Forest Branch', '7 Ewok Village Path, Forest Moon of Endor', '555-ENDO-004', 0);

-- Insert patrons
INSERT INTO patrons
    (first_name, last_name, email, phone, balance, birthday, card_expiration_date, is_active)
VALUES
    ('Luke', 'Skywalker', 'luke.skywalker@rebellion.org', '555-0001', 0.00, '1977-05-25', date('now', '+1 year'), 1),
    ('Leia', 'Organa', 'leia.organa@alderaan.gov', '555-0002', 5.50, '1977-05-25', date('now', '+1 year'), 1),
    ('Han', 'Solo', 'han.solo@falcon.ship', '555-0003', 12.75, '1942-07-13', date('now', '+1 year'), 1),
    ('Darth', 'Vader', 'anakin.skywalker@empire.gov', '555-0004', 0.00, '1941-09-25', date('now', '+1 year'), 1),
    ('Obi-Wan', 'Kenobi', 'ben.kenobi@jedi.org', '555-0005', 0.00, '1914-04-02', date('now', '+1 year'), 1),
    ('Yoda', 'Master', 'yoda@jedi.org', '555-0006', 0.00, '896-05-04', date('now', '+1 year'), 1),
    ('Padmé', 'Amidala', 'padme.amidala@naboo.gov', '555-0007', 3.25, '1979-06-24', date('now', '+1 year'), 1),
    ('Rey', 'Skywalker', 'rey@resistance.org', '555-0008', 0.00, '1992-04-16', date('now', '+1 year'), 1),
    ('Kylo', 'Ren', 'ben.solo@firstorder.gov', '555-0009', 8.00, '1983-09-15', date('now', '+1 year'), 1),
    ('Finn', 'Trooper', 'finn@resistance.org', '555-0010', 0.00, '1992-05-12', date('now', '+1 year'), 1),
    ('Poe', 'Dameron', 'poe.dameron@resistance.org', '555-0011', 0.00, '1979-04-25', date('now', '+1 year'), 1),
    ('Chewbacca', 'Wookiee', 'chewie@kashyyyk.planet', '555-0012', 0.00, '1944-05-19', date('now', '+1 year'), 1),
    ('Lando', 'Calrissian', 'lando@cloudcity.gov', '555-0013', 0.00, '1937-04-24', date('now', '+1 year'), 1),
    ('Ahsoka', 'Tano', 'ahsoka.tano@fulcrum.net', '555-0014', 0.00, '1982-03-07', date('now', '+1 year'), 1),
    ('Mace', 'Windu', 'mace.windu@jedi.org', '555-0015', 2.50, '1948-12-21', date('now', '+1 year'), 1);

-- Insert catalog items (Books)
INSERT INTO catalog_items
    (id, title, item_type, description, publication_year, congress_code)
VALUES
    ('cat-00001', 'The Complete History of the Jedi Order', 'Book', 'A comprehensive guide to the ancient Jedi Order, their teachings, and their fall.', 2020, 'BT-1234'),
    ('cat-00002', 'Starship Repair Manual: Millennium Falcon Edition', 'Book', 'Everything you need to know about maintaining and repairing a YT-1300 light freighter.', 2018, 'TL-7890'),
    ('cat-00003', 'The Art of Lightsaber Combat', 'Book', 'Master the seven forms of lightsaber combat with this illustrated guide.', 2019, 'GV-4567'),
    ('cat-00004', 'Politics of the Galactic Senate', 'Book', 'An insider look at the political machinations that brought down the Republic.', 2017, 'JK-2345'),
    ('cat-00005', 'Droid Programming for Beginners', 'Book', 'Learn to program astromech and protocol droids with this beginner-friendly guide.', 2021, 'QA-6789'),
    ('cat-00006', 'The Clone Wars: A Military History', 'Book', 'A detailed account of the Clone Wars and the battles that shaped the galaxy.', 2019, 'D-8901'),
    ('cat-00007', 'Force Sensitivity: Myth or Reality?', 'Book', 'A scientific exploration of the Force and Force-sensitive beings.', 2020, 'BF-3456'),
    ('cat-00008', 'Cooking Across the Galaxy', 'Book', 'Recipes from Coruscant to Tatooine featuring exotic ingredients and traditional dishes.', 2022, 'TX-7123'),
    ('cat-00009', 'The Rise and Fall of the Empire', 'Book', 'How Emperor Palpatine rose to power and the events leading to his downfall.', 2018, 'DC-4892'),
    ('cat-00010', 'Smuggling Routes of the Outer Rim', 'Book', 'A guide to the lesser-known hyperspace lanes used by smugglers and pirates.', 2019, 'HE-5678'),
    ('cat-00011', 'Meditation Techniques of the Force', 'Book', 'Ancient Jedi meditation practices for achieving balance and clarity.', 2021, 'BL-9012'),
    ('cat-00012', 'The Mandalorian Way', 'Book', 'An exploration of Mandalorian culture, armor, and their code of honor.', 2020, 'GT-3210'),
    ('cat-00013', 'Bothan SpyNet Chronicles', 'Book', 'Declassified intelligence reports from the legendary Bothan spy network.', 2017, 'JX-7654'),
    ('cat-00014', 'Planetary Ecosystems of the Inner Rim', 'Book', 'A biological survey of unique flora and fauna found throughout the Inner Rim.', 2022, 'QH-8901'),
    ('cat-00015', 'The Sith Code Unveiled', 'Book', 'A controversial examination of Sith philosophy and their rule of two.', 2018, 'BL-4567');

-- Insert catalog items (Other media types)
INSERT INTO catalog_items
    (id, title, item_type, description, publication_year, congress_code)
VALUES
    ('cat-00016', 'Max Rebo Band Live on Tatooine', 'Recording', 'Classic jizz music performance from the legendary Max Rebo Band.', 2019, 'M-7890'),
    ('cat-00017', 'Battle of Yavin: The Documentary', 'Video', 'A comprehensive documentary about the battle that destroyed the first Death Star.', 2020, 'PN-1234'),
    ('cat-00018', 'Galactic Geographic Monthly', 'Magazine', 'Exploring planets, cultures, and wildlife across the galaxy.', 2023, 'G-5678'),
    ('cat-00019', 'The Jedi Archives Podcast', 'Audiobook', 'Narrated recordings from the ancient Jedi Archives before their destruction.', 2021, 'BT-9012'),
    ('cat-00020', 'Empire Today: News Network', 'Periodical', 'Official Imperial news and propaganda (historical archive).', 2020, 'PN-3456');

-- Insert books (detailed book records)
INSERT INTO books
    (catalog_id, publisher, author, genre, cover_img_url, number_of_pages, isbn)
VALUES
    ('cat-00001', 'Jedi Press', 'Master Yoda', '["History","Academic","Reference"]', 'https://example.com/jedi-history.jpg', 542, '978-0-123-45678-9'),
    ('cat-00002', 'Corellian Engineering Publishing', 'Han Solo', '["Technology","Self-Help"]', 'https://example.com/falcon-repair.jpg', 328, '978-0-234-56789-0'),
    ('cat-00003', 'Temple Archives Press', 'Mace Windu', '["Academic","Self-Help"]', 'https://example.com/lightsaber-combat.jpg', 445, '978-0-345-67890-1'),
    ('cat-00004', 'Senate Publications', 'Padmé Amidala', '["Political","History"]', 'https://example.com/senate-politics.jpg', 612, '978-0-456-78901-2'),
    ('cat-00005', 'Binary Publishers', 'C-3PO', '["Technology","Academic"]', 'https://example.com/droid-programming.jpg', 289, '978-0-567-89012-3'),
    ('cat-00006', 'Republic Military Press', 'Captain Rex', '["History","Reference"]', 'https://example.com/clone-wars.jpg', 728, '978-0-678-90123-4'),
    ('cat-00007', 'Force Research Institute', 'Qui-Gon Jinn', '["Science Fiction","Academic"]', 'https://example.com/force-sensitivity.jpg', 396, '978-0-789-01234-5'),
    ('cat-00008', 'Galactic Culinary Guild', 'Dexter Jettster', '["Cooking"]', 'https://example.com/cooking-galaxy.jpg', 254, '978-0-890-12345-6'),
    ('cat-00009', 'New Republic Archives', 'Mon Mothma', '["History","Political"]', 'https://example.com/empire-fall.jpg', 687, '978-0-901-23456-7'),
    ('cat-00010', 'Smugglers Guide Publishing', 'Lando Calrissian', '["Travel","Reference"]', 'https://example.com/smuggling-routes.jpg', 312, '978-0-012-34567-8'),
    ('cat-00011', 'Temple Meditation Press', 'Luminara Unduli', '["Self-Help","Academic"]', 'https://example.com/meditation.jpg', 221, '978-0-123-45670-1'),
    ('cat-00012', 'Mandalore Publishing', 'Din Djarin', '["History","Art"]', 'https://example.com/mandalorian-way.jpg', 378, '978-0-234-56781-2'),
    ('cat-00013', 'Bothan Intelligence Press', 'Classified', '["Mystery","History"]', 'https://example.com/spynet.jpg', 502, '978-0-345-67892-3'),
    ('cat-00014', 'Galactic Science Foundation', 'Dr. Nuvo Vindi', '["Science Fiction","Academic"]', 'https://example.com/ecosystems.jpg', 456, '978-0-456-78903-4'),
    ('cat-00015', 'Dark Side Press', 'Darth Bane', '["Political","Academic"]', 'https://example.com/sith-code.jpg', 389, '978-0-567-89014-5');

-- Insert item copies (multiple copies at different branches)
INSERT INTO item_copies
    (id, catalog_item_id, branch_id, condition, status, cost, notes, location)
VALUES
    -- The Complete History of the Jedi Order (4 copies)
    ('copy-00001', 'cat-00001', 1, 'Excellent', 'Available', 45.99, 'First edition with gilded pages', 1),
    ('copy-00002', 'cat-00001', 2, 'Good', 'Available', 45.99, NULL, 2),
    ('copy-00003', 'cat-00001', 3, 'New', 'Available', 45.99, 'Recently acquired', 3),
    ('copy-00004', 'cat-00001', 1, 'Fair', 'Checked Out', 45.99, 'Some wear on spine', 1),

    -- Starship Repair Manual (3 copies)
    ('copy-00005', 'cat-00002', 1, 'Good', 'Available', 32.50, NULL, 1),
    ('copy-00006', 'cat-00002', 2, 'Excellent', 'Checked Out', 32.50, 'Includes fold-out schematics', 2),
    ('copy-00007', 'cat-00002', 4, 'Good', 'Available', 32.50, NULL, 4),

    -- The Art of Lightsaber Combat (3 copies)
    ('copy-00008', 'cat-00003', 1, 'New', 'Reserved', 38.75, NULL, 1),
    ('copy-00009', 'cat-00003', 3, 'Excellent', 'Available', 38.75, NULL, 3),
    ('copy-00010', 'cat-00003', 1, 'Good', 'Checked Out', 38.75, NULL, 1),

    -- Politics of the Galactic Senate (2 copies)
    ('copy-00011', 'cat-00004', 1, 'Excellent', 'Available', 52.00, 'Signed by the author', 1),
    ('copy-00012', 'cat-00004', 3, 'Good', 'Available', 52.00, NULL, 3),

    -- Droid Programming for Beginners (4 copies)
    ('copy-00013', 'cat-00005', 1, 'New', 'Available', 28.99, NULL, 1),
    ('copy-00014', 'cat-00005', 2, 'Good', 'Checked Out', 28.99, NULL, 2),
    ('copy-00015', 'cat-00005', 3, 'Good', 'Available', 28.99, NULL, 3),
    ('copy-00016', 'cat-00005', 4, 'Fair', 'Available', 28.99, 'Some highlighting', 4),

    -- The Clone Wars: A Military History (3 copies)
    ('copy-00017', 'cat-00006', 1, 'Excellent', 'Available', 48.50, 'Includes maps', 1),
    ('copy-00018', 'cat-00006', 2, 'Good', 'Available', 48.50, NULL, 2),
    ('copy-00019', 'cat-00006', 1, 'Good', 'Checked Out', 48.50, NULL, 1),

    -- Force Sensitivity: Myth or Reality? (2 copies)
    ('copy-00020', 'cat-00007', 1, 'New', 'Available', 41.25, NULL, 1),
    ('copy-00021', 'cat-00007', 3, 'Excellent', 'Reserved', 41.25, NULL, 3),

    -- Cooking Across the Galaxy (3 copies)
    ('copy-00022', 'cat-00008', 1, 'Good', 'Available', 24.99, 'Some stains on pages', 1),
    ('copy-00023', 'cat-00008', 2, 'New', 'Available', 24.99, NULL, 2),
    ('copy-00024', 'cat-00008', 4, 'Good', 'Available', 24.99, NULL, 4),

    -- The Rise and Fall of the Empire (3 copies)
    ('copy-00025', 'cat-00009', 1, 'Excellent', 'Available', 55.00, NULL, 1),
    ('copy-00026', 'cat-00009', 3, 'Good', 'Checked Out', 55.00, NULL, 3),
    ('copy-00027', 'cat-00009', 1, 'Good', 'Available', 55.00, NULL, 1),

    -- Smuggling Routes of the Outer Rim (2 copies)
    ('copy-00028', 'cat-00010', 2, 'Fair', 'Available', 36.75, 'Well-used reference copy', 2),
    ('copy-00029', 'cat-00010', 1, 'Good', 'Checked Out', 36.75, NULL, 1),

    -- Meditation Techniques of the Force (3 copies)
    ('copy-00030', 'cat-00011', 1, 'New', 'Available', 29.99, NULL, 1),
    ('copy-00031', 'cat-00011', 3, 'Excellent', 'Available', 29.99, NULL, 3),
    ('copy-00032', 'cat-00011', 4, 'Good', 'Available', 29.99, NULL, 4),

    -- The Mandalorian Way (2 copies)
    ('copy-00033', 'cat-00012', 1, 'Excellent', 'Reserved', 44.50, 'Limited edition', 1),
    ('copy-00034', 'cat-00012', 2, 'Good', 'Available', 44.50, NULL, 2),

    -- Bothan SpyNet Chronicles (2 copies)
    ('copy-00035', 'cat-00013', 1, 'Good', 'Available', 39.99, 'Redacted sections', 1),
    ('copy-00036', 'cat-00013', 3, 'Excellent', 'Available', 39.99, NULL, 3),

    -- Planetary Ecosystems (2 copies)
    ('copy-00037', 'cat-00014', 1, 'New', 'Available', 51.25, 'Full color illustrations', 1),
    ('copy-00038', 'cat-00014', 4, 'Good', 'Available', 51.25, NULL, 4),

    -- The Sith Code Unveiled (2 copies)
    ('copy-00039', 'cat-00015', 1, 'Good', 'Available', 47.99, 'Restricted section', 1),
    ('copy-00040', 'cat-00015', 3, 'Fair', 'Damaged', 47.99, 'Water damage on cover', 3),

    -- Media items
    ('copy-00041', 'cat-00016', 2, 'Good', 'Available', 15.99, 'Holodisk recording', 2),
    ('copy-00042', 'cat-00017', 1, 'Excellent', 'Available', 22.50, 'Blu-ray quality', 1),
    ('copy-00043', 'cat-00018', 1, 'New', 'Available', 8.99, 'Current issue', 1),
    ('copy-00044', 'cat-00019', 1, 'Good', 'Checked Out', 31.99, NULL, 1),
    ('copy-00045', 'cat-00020', 1, 'Good', 'Available', 12.50, 'Historical archive', 1);

-- Insert active transactions (checked out items)
INSERT INTO transactions
    (id, copy_id, patron_id, transaction_type, checkout_date, due_date, status, notes)
VALUES
    ('trans-00001', 'copy-00004', 1, 'checkout', datetime('now', '-5 days'), datetime('now', '+9 days'), 'active', 'Luke is studying Jedi history'),
    ('trans-00002', 'copy-00006', 3, 'checkout', datetime('now', '-2 days'), datetime('now', '+12 days'), 'active', 'Han needs to fix the Falcon again'),
    ('trans-00003', 'copy-00010', 4, 'checkout', datetime('now', '-7 days'), datetime('now', '+7 days'), 'active', NULL),
    ('trans-00004', 'copy-00014', 6, 'checkout', datetime('now', '-10 days'), datetime('now', '+4 days'), 'active', 'Yoda teaching droid programming to younglings'),
    ('trans-00005', 'copy-00019', 14, 'checkout', datetime('now', '-3 days'), datetime('now', '+11 days'), 'active', 'Ahsoka researching Clone Wars'),
    ('trans-00006', 'copy-00026', 9, 'checkout', datetime('now', '-1 days'), datetime('now', '+13 days'), 'active', NULL),
    ('trans-00007', 'copy-00029', 13, 'checkout', datetime('now', '-4 days'), datetime('now', '+10 days'), 'active', 'Lando planning new routes'),
    ('trans-00008', 'copy-00044', 8, 'checkout', datetime('now', '-6 days'), datetime('now', '+8 days'), 'active', 'Rey learning about the Jedi Archives');

-- Update item_copies with checkout information
UPDATE item_copies SET checked_out_by = 1, due_date = datetime('now', '+9 days') WHERE id = 'copy-00004';
UPDATE item_copies SET checked_out_by = 3, due_date = datetime('now', '+12 days') WHERE id = 'copy-00006';
UPDATE item_copies SET checked_out_by = 4, due_date = datetime('now', '+7 days') WHERE id = 'copy-00010';
UPDATE item_copies SET checked_out_by = 6, due_date = datetime('now', '+4 days') WHERE id = 'copy-00014';
UPDATE item_copies SET checked_out_by = 14, due_date = datetime('now', '+11 days') WHERE id = 'copy-00019';
UPDATE item_copies SET checked_out_by = 9, due_date = datetime('now', '+13 days') WHERE id = 'copy-00026';
UPDATE item_copies SET checked_out_by = 13, due_date = datetime('now', '+10 days') WHERE id = 'copy-00029';
UPDATE item_copies SET checked_out_by = 8, due_date = datetime('now', '+8 days') WHERE id = 'copy-00044';

-- Insert some historical transactions (returned items)
INSERT INTO transactions
    (id, copy_id, patron_id, transaction_type, checkout_date, due_date, return_date, status, fine_amount, notes)
VALUES
    ('trans-00009', 'copy-00005', 2, 'checkout', datetime('now', '-30 days'), datetime('now', '-16 days'), datetime('now', '-15 days'), 'returned', 0.00, 'Returned on time'),
    ('trans-00010', 'copy-00011', 7, 'checkout', datetime('now', '-25 days'), datetime('now', '-11 days'), datetime('now', '-8 days'), 'returned', 5.50, 'Returned 3 days late'),
    ('trans-00011', 'copy-00020', 5, 'checkout', datetime('now', '-20 days'), datetime('now', '-6 days'), datetime('now', '-5 days'), 'returned', 0.00, 'Obi-Wan never returns late'),
    ('trans-00012', 'copy-00028', 3, 'checkout', datetime('now', '-45 days'), datetime('now', '-31 days'), datetime('now', '-24 days'), 'returned', 12.75, 'Returned 7 days late'),
    ('trans-00013', 'copy-00033', 15, 'checkout', datetime('now', '-15 days'), datetime('now', '-1 days'), datetime('now'), 'returned', 2.50, 'Returned 1 day late'),
    ('trans-00014', 'copy-00022', 10, 'checkout', datetime('now', '-35 days'), datetime('now', '-21 days'), datetime('now', '-21 days'), 'returned', 0.00, 'Returned on time'),
    ('trans-00015', 'copy-00037', 11, 'checkout', datetime('now', '-40 days'), datetime('now', '-26 days'), datetime('now', '-25 days'), 'returned', 0.00, 'Poe returned early');

-- Insert reservations
INSERT INTO reservations
    (id, catalog_item_id, patron_id, reservation_date, expiry_date, status, queue_position)
VALUES
    ('resv-00001', 'cat-00003', 2, datetime('now', '-2 days'), datetime('now', '+5 days'), 'pending', 1),
    ('resv-00002', 'cat-00007', 5, datetime('now', '-1 days'), datetime('now', '+6 days'), 'pending', 1),
    ('resv-00003', 'cat-00012', 12, datetime('now', '-3 days'), datetime('now', '+4 days'), 'pending', 1),
    ('resv-00004', 'cat-00002', 10, datetime('now', '-4 days'), datetime('now', '+3 days'), 'pending', 2);

-- Summary statistics
SELECT 'Database seeded successfully!' as message;
SELECT COUNT(*) as total_patrons
FROM patrons;
SELECT COUNT(*) as total_catalog_items
FROM catalog_items;
SELECT COUNT(*) as total_books
FROM books;
SELECT COUNT(*) as total_copies
FROM item_copies;
SELECT COUNT(*) as total_transactions
FROM transactions;
SELECT COUNT(*) as total_active_checkouts
FROM transactions
WHERE status = 'active';
SELECT COUNT(*) as total_reservations
FROM reservations;
