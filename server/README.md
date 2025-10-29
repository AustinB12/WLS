# Library Management System API Server

A Node.js Express server for the Library Management System, providing RESTful APIs for managing catalog items, patrons, transactions, reservations, and branches.

## Features

- **RESTful API** with comprehensive endpoints
- **SQLite Database Integration** with connection management
- **Input Validation** using express-validator
- **Security** with Helmet and CORS
- **Rate Limiting** to prevent abuse
- **Logging** with Morgan
- **Error Handling** with detailed error responses
- **Environment Configuration** with dotenv

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Navigate to the server directory:

   ```bash
   cd server
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create environment file:

   ```bash
   cp .env.example .env
   ```

4. Configure your environment variables in `.env`:

   ```env
   NODE_ENV=development
   PORT=3001
   DB_PATH=./library.db
   ```

5. The SQLite database will be created automatically when the server starts. You can optionally run the SQL schema from `../db_schema.sql` to create the tables if needed.

6. Start the server:

   ```bash
   # Development mode with auto-restart
   npm run dev

   # Production mode
   npm start
   ```

## API Endpoints

### Catalog Items

- `GET /api/v1/catalog-items` - Get all catalog items
- `GET /api/v1/catalog-items/:id` - Get single catalog item
- `POST /api/v1/catalog-items` - Create new catalog item
- `PUT /api/v1/catalog-items/:id` - Update catalog item
- `DELETE /api/v1/catalog-items/:id` - Delete catalog item

### Patrons

- `GET /api/v1/patrons` - Get all patrons
- `GET /api/v1/patrons/:id` - Get single patron
- `GET /api/v1/patrons/:id/transactions` - Get patron's transactions
- `POST /api/v1/patrons` - Create new patron
- `PUT /api/v1/patrons/:id` - Update patron
- `DELETE /api/v1/patrons/:id` - Deactivate patron

### Transactions

- `GET /api/v1/transactions` - Get all transactions
- `GET /api/v1/transactions/:id` - Get single transaction
- `POST /api/v1/transactions/checkout` - Checkout item
- `POST /api/v1/transactions/checkin` - Checkin item
- `PUT /api/v1/transactions/:id/renew` - Renew transaction

### Reservations

- `GET /api/v1/reservations` - Get all reservations
- `GET /api/v1/reservations/:id` - Get single reservation
- `POST /api/v1/reservations` - Create new reservation
- `PUT /api/v1/reservations/:id/fulfill` - Fulfill reservation
- `DELETE /api/v1/reservations/:id` - Cancel reservation

### Branches

- `GET /api/v1/branches` - Get all branches
- `GET /api/v1/branches/:id` - Get single branch
- `GET /api/v1/branches/:id/inventory` - Get branch inventory
- `POST /api/v1/branches` - Create new branch
- `PUT /api/v1/branches/:id` - Update branch
- `DELETE /api/v1/branches/:id` - Delete branch

### Item Copies

- `GET /api/v1/item-copies` - Get all item copies
- `GET /api/v1/item-copies/:id` - Get single item copy
- `GET /api/v1/item-copies/catalog/:catalog_item_id` - Get copies of catalog item
- `POST /api/v1/item-copies` - Create new item copy
- `PUT /api/v1/item-copies/:id` - Update item copy
- `DELETE /api/v1/item-copies/:id` - Delete item copy

### Utility

- `GET /health` - Health check endpoint
- `GET /` - API information

## Database Schema

The server expects a SQLite database with the following main tables:

- `catalog_items` - Library catalog items
- `item_copies` - Physical copies of items
- `patrons` - Library patrons
- `branches` - Library branches
- `transactions` - Checkout/checkin transactions
- `reservations` - Item reservations

## Error Handling

The API returns consistent error responses:

```json
{
  "error": "Error message",
  "message": "Detailed error description"
}
```

## Security Features

- **Helmet** for security headers
- **CORS** for cross-origin resource sharing
- **Rate limiting** to prevent abuse
- **Input validation** for all endpoints
- **SQL injection protection** with parameterized queries

## Development

```bash
# Install dependencies
npm install

# Start development server with auto-restart
npm run dev

# Run tests
npm test
```

## Production Deployment

1. Set `NODE_ENV=production` in your environment
2. Configure production database settings
3. Use a process manager like PM2:
   ```bash
   npm install -g pm2
   pm2 start server.js --name "library-api"
   ```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request
