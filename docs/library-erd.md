# Library Information System - Entity Relationship Diagram

```mermaid
erDiagram
    PATRONS {
        string id PK
        string firstName
        string lastName
        string email UK
        string phone
        date birthday
        decimal balance
        boolean isActive
        date createdAt
    }

    BOOKS {
        string id PK
        string title
        string author
        string publisher
        int yearPublished
        string genre
        text description
        string coverImageUrl
        decimal cost
        string libraryOfCongressCode
        boolean available
        string location
        string condition
        date dateAcquired
        date createdAt
    }

    TRANSACTIONS {
        string id PK
        string bookId FK
        string patronId FK
        string transactionType
        date checkoutDate
        date dueDate
        date returnDate
        decimal fineAmount
        string status
        string notes
        date createdAt
        date updatedAt
    }

    RESERVATIONS {
        string id PK
        string bookId FK
        string patronId FK
        date reservationDate
        date expiryDate
        string status
        int queuePosition
        date notificationSent
        date createdAt
        date updatedAt
    }

    FINES {
        string id PK
        string transactionId FK
        string patronId FK
        decimal amount
        string reason
        boolean isPaid
        date paidDate
        string paymentMethod
        string notes
        date createdAt
    }

    RENEWAL_HISTORY {
        string id PK
        string transactionId FK
        string patronId FK
        date renewalDate
        date newDueDate
        string reason
        string staffId FK
        date createdAt
    }

    %% Relationships
    PATRONS ||--o{ TRANSACTIONS : "borrows"
    BOOKS ||--o{ TRANSACTIONS : "is borrowed in"
    PATRONS ||--o{ RESERVATIONS : "makes"
    BOOKS ||--o{ RESERVATIONS : "is reserved for"
    TRANSACTIONS ||--o{ FINES : "may incur"
    PATRONS ||--o{ FINES : "owes"
    TRANSACTIONS ||--o{ RENEWAL_HISTORY : "can be renewed"
    PATRONS ||--o{ RENEWAL_HISTORY : "requests renewal"
```

## Entity Descriptions

### Core Entities

**PATRONS**

- Library members who can borrow books
- Includes contact information, membership details, and account balance

**BOOKS**

- Physical and digital items in the library collection
- Includes bibliographic information, availability status, and physical condition

**TRANSACTIONS**

- Records of all checkout, return, and renewal activities
- Tracks dates, status, and any associated fines

**RESERVATIONS**

- Queue system for patrons to reserve books that are currently unavailable
- Includes expiry dates and notification tracking

### Supporting Entities

**FINES**

- Financial penalties for late returns or damaged items
- Links to transactions and tracks payment status

### Operational Entities

**RENEWAL_HISTORY**

- Historical record of all renewal requests
- Supports renewal limits and approval workflows

## Key Relationships

3. **One-to-Many**: Patrons → Transactions, Reservations, Fines
4. **One-to-Many**: Books → Transactions, Reservations

## Business Rules Enforced

- A book can only have one active checkout transaction
- Patrons can have multiple reservations but limited active checkouts
- Fines are automatically calculated based on transaction data
- Reservation queue position is maintained automatically
