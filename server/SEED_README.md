# Star Wars Library Seed Data

This seed data populates your library management system with Star Wars themed content for testing and demonstration purposes.

## What's Included

### Patrons (15)

Famous Star Wars characters as library patrons:

- **Luke Skywalker** - The legendary Jedi Knight
- **Leia Organa** - Princess and Rebel leader (has fines)
- **Han Solo** - Smuggler extraordinaire (has fines)
- **Darth Vader** - Former Jedi turned Sith Lord
- **Obi-Wan Kenobi** - Wise Jedi Master
- **Yoda** - Ancient Jedi Master
- **Padmé Amidala** - Senator from Naboo (has fines)
- **Rey Skywalker** - Jedi from Jakku
- **Kylo Ren** - Dark side user (has fines)
- **Finn** - Former Stormtrooper
- **Poe Dameron** - Resistance pilot
- **Chewbacca** - Wookiee co-pilot
- **Lando Calrissian** - Cloud City administrator
- **Ahsoka Tano** - Former Jedi Padawan
- **Mace Windu** - Jedi Council member (has fines)

### Branches (4)

Library locations across the galaxy:

1. **Coruscant Central Library** (Main) - 1138 Senate District
2. **Tatooine Branch** - 42 Mos Eisley Cantina Way
3. **Naboo Royal Library** - 123 Theed Palace Gardens
4. **Endor Forest Branch** - 7 Ewok Village Path

### Catalog Items (20)

15 Books + 5 other media types:

#### Books

- The Complete History of the Jedi Order
- Starship Repair Manual: Millennium Falcon Edition
- The Art of Lightsaber Combat
- Politics of the Galactic Senate
- Droid Programming for Beginners
- The Clone Wars: A Military History
- Force Sensitivity: Myth or Reality?
- Cooking Across the Galaxy
- The Rise and Fall of the Empire
- Smuggling Routes of the Outer Rim
- Meditation Techniques of the Force
- The Mandalorian Way
- Bothan SpyNet Chronicles
- Planetary Ecosystems of the Inner Rim
- The Sith Code Unveiled

#### Other Media

- Max Rebo Band Live on Tatooine (Recording)
- Battle of Yavin: The Documentary (Video)
- Galactic Geographic Monthly (Magazine)
- The Jedi Archives Podcast (Audiobook)
- Empire Today: News Network (Periodical)

### Item Copies (45)

Multiple physical copies distributed across branches with various conditions and statuses.

### Active Checkouts (8)

Current borrowed items:

- Luke studying Jedi history
- Han fixing the Millennium Falcon
- Darth Vader reading about lightsaber combat
- Yoda teaching droid programming
- Ahsoka researching Clone Wars
- Kylo Ren studying the Empire's fall
- Lando planning smuggling routes
- Rey learning about the Jedi Archives

### Reservations (4)

Pending reservations for popular items by various patrons.

### Historical Transactions (7)

Completed checkouts showing return patterns and fines for late returns.

## Usage

To seed your database with this data:

```bash
# From the server directory
npm run seed
```

Or run directly:

```bash
node seed.js
```

## Features

- **Realistic data patterns**: Multiple copies, different branches, realistic checkout dates
- **Financial data**: Some patrons have outstanding fines from late returns
- **Status variety**: Items are Available, Checked Out, Reserved, or Damaged
- **Condition tracking**: Items in New, Excellent, Good, Fair, or Poor condition
- **Themed content**: All books, patrons, and locations are Star Wars themed
- **Relational integrity**: Properly linked transactions, reservations, and copies

## Testing Scenarios

This seed data supports testing:

- ✅ Browsing catalog items
- ✅ Checking out available items
- ✅ Viewing patron transaction history
- ✅ Managing reservations
- ✅ Tracking fines and overdue items
- ✅ Multi-branch operations
- ✅ Different item types (books, videos, magazines, etc.)

## Notes

- The seed script will **clear existing data** before inserting
- Foreign keys are properly maintained
- All dates are relative to the current time for realistic testing
- ISBNs are fictional but follow the correct format

**May the Force be with you!** 🌟
