import type { Book, Transaction, Reservation, BookFilters } from '../types';

// Mock data for development
const mockBooks: Book[] = [
  {
    id: '1',
    isbn: '978-0-06-112008-4',
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    publisher: 'HarperCollins',
    yearPublished: 1960,
    genre: 'Fiction',
    total_copies: 5,
    available_copies: 3,
    description:
      'A classic American novel about racial injustice and childhood innocence.',
    cover_image_url:
      'https://covers.openlibrary.org/b/isbn/9780061120084-L.jpg',
  },
  {
    id: '2',
    isbn: '978-0-7432-7356-5',
    title: '1984',
    author: 'George Orwell',
    publisher: 'Secker & Warburg',
    yearPublished: 1949,
    genre: 'Dystopian Fiction',
    total_copies: 4,
    available_copies: 2,
    description:
      'A dystopian social science fiction novel about totalitarian control.',
  },
  {
    id: '3',
    isbn: '978-0-14-143951-8',
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    publisher: 'Penguin Classics',
    yearPublished: 1813,
    genre: 'Romance',
    total_copies: 3,
    available_copies: 0,
    description: 'A romantic novel of manners set in Georgian England.',
  },
];

const mockTransactions: Transaction[] = [
  {
    id: 't1',
    book_id: '1',
    transaction_type: 'checkout',
    checkout_date: '2025-10-01',
    due_date: '2025-10-15',
    status: 'active',
    book: mockBooks[0],
  },
  {
    id: 't2',
    book_id: '2',
    transaction_type: 'checkout',
    checkout_date: '2025-10-05',
    due_date: '2025-10-19',
    status: 'overdue',
    book: mockBooks[1],
  },
];

const mockReservations: Reservation[] = [
  {
    id: 'r1',
    book_id: '3',
    reservation_date: '2025-10-10',
    status: 'pending',
    expiry_date: '2025-10-17',
    book: mockBooks[2],
  },
];

export const dataService = {
  // Book operations
  async getBooks(filters?: BookFilters): Promise<Book[]> {
    let books = [...mockBooks];

    if (filters?.search) {
      const searchLower = filters.search.toLowerCase();
      books = books.filter(
        (book) =>
          book.title.toLowerCase().includes(searchLower) ||
          book.author.toLowerCase().includes(searchLower) ||
          book.isbn.toLowerCase().includes(searchLower)
      );
    }

    if (filters?.genre) {
      books = books.filter((book) => book.genre === filters.genre);
    }

    if (filters?.author) {
      const authorLower = filters.author.toLowerCase();
      books = books.filter((book) =>
        book.author.toLowerCase().includes(authorLower)
      );
    }

    if (filters?.availability === 'available') {
      books = books.filter((book) => book.available_copies > 0);
    } else if (filters?.availability === 'unavailable') {
      books = books.filter((book) => book.available_copies === 0);
    }

    return books;
  },

  async getBookById(id: string): Promise<Book | null> {
    return mockBooks.find((book) => book.id === id) || null;
  },

  async createBook(book: Omit<Book, 'id'>): Promise<Book> {
    const newBook: Book = {
      ...book,
      id: `book_${Date.now()}`,
    };
    mockBooks.push(newBook);
    return newBook;
  },

  async updateBook(id: string, updates: Partial<Book>): Promise<Book | null> {
    const bookIndex = mockBooks.findIndex((book) => book.id === id);
    if (bookIndex === -1) return null;

    mockBooks[bookIndex] = { ...mockBooks[bookIndex], ...updates };
    return mockBooks[bookIndex];
  },

  async deleteBook(id: string): Promise<boolean> {
    const bookIndex = mockBooks.findIndex((book) => book.id === id);
    if (bookIndex === -1) return false;

    mockBooks.splice(bookIndex, 1);
    return true;
  },

  async getGenres(): Promise<string[]> {
    const genres = [...new Set(mockBooks.map((book) => book.genre))];
    return genres.sort();
  },

  // Transaction operations
  async checkoutBook(bookId: string): Promise<Transaction> {
    const book = mockBooks.find((b) => b.id === bookId);
    if (!book || book.available_copies <= 0) {
      throw new Error('Book not available for checkout');
    }

    book.available_copies -= 1;

    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 14); // 2 weeks from now

    const transaction: Transaction = {
      id: `t${Date.now()}`,
      book_id: bookId,
      transaction_type: 'checkout',
      checkout_date: new Date().toISOString().split('T')[0],
      due_date: dueDate.toISOString().split('T')[0],
      status: 'active',
      book,
    };

    mockTransactions.push(transaction);
    return transaction;
  },

  async returnBook(transactionId: string): Promise<Transaction | null> {
    const transaction = mockTransactions.find((t) => t.id === transactionId);
    if (!transaction) return null;

    const book = mockBooks.find((b) => b.id === transaction.book_id);
    if (book) {
      book.available_copies += 1;
    }

    transaction.status = 'returned';
    transaction.return_date = new Date().toISOString().split('T')[0];

    return transaction;
  },

  async getAllTransactions(): Promise<Transaction[]> {
    return mockTransactions.map((t) => ({
      ...t,
      book: mockBooks.find((b) => b.id === t.book_id),
    }));
  },

  async getOverdueTransactions(): Promise<Transaction[]> {
    return mockTransactions
      .filter((t) => t.status === 'overdue')
      .map((t) => ({
        ...t,
        book: mockBooks.find((b) => b.id === t.book_id),
      }));
  },

  // Reservation operations
  async reserveBook(bookId: string): Promise<Reservation> {
    const book = mockBooks.find((b) => b.id === bookId);
    if (!book) {
      throw new Error('Book not found');
    }

    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 7); // 1 week from now

    const reservation: Reservation = {
      id: `r${Date.now()}`,
      book_id: bookId,
      reservation_date: new Date().toISOString().split('T')[0],
      status: 'pending',
      expiry_date: expiryDate.toISOString().split('T')[0],
      book,
    };

    mockReservations.push(reservation);
    return reservation;
  },

  async getAllReservations(): Promise<Reservation[]> {
    return mockReservations.map((r) => ({
      ...r,
      book: mockBooks.find((b) => b.id === r.book_id),
    }));
  },

  async cancelReservation(reservationId: string): Promise<Reservation | null> {
    const reservation = mockReservations.find((r) => r.id === reservationId);
    if (!reservation) return null;

    reservation.status = 'cancelled';
    return reservation;
  },
};
