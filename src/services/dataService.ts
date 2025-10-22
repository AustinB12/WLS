import type {
  Book,
  Transaction,
  Reservation,
  BookFilters,
  CatalogItem,
  Item_Copy,
  Branch,
} from '../types';
import { Genre } from '../types';
import supabase from '../utils/supabase';

export const dataService = {
  // Book operations
  async getBooks(filters?: BookFilters): Promise<Book[]> {
    let query = supabase.from('books').select('*');

    if (filters?.search) {
      query = query.or(
        `title.ilike.%${filters.search}%,author.ilike.%${filters.search}%,libraryOfCongressCode.ilike.%${filters.search}%`
      );
    }

    if (filters?.genre) {
      query = query.contains('genre', [filters.genre]);
    }

    if (filters?.author) {
      query = query.ilike('author', `%${filters.author}%`);
    }

    if (filters?.availability === 'available') {
      query = query.eq('available', true);
    } else if (filters?.availability === 'unavailable') {
      query = query.eq('available', false);
    }

    const { data, error } = await query;

    if (error) {
      throw new Error(`Failed to fetch books: ${error.message}`);
    }

    return data || [];
  },

  async getBookById(id: string): Promise<Book | null> {
    const { data, error } = await supabase
      .from('books')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null; // No rows found
      throw new Error(`Failed to fetch book: ${error.message}`);
    }

    return data;
  },

  async createBook(book: Omit<Book, 'id'>): Promise<Book> {
    const { data, error } = await supabase
      .from('books')
      .insert([book])
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to create book: ${error.message}`);
    }

    return data;
  },

  async updateBook(id: string, updates: Partial<Book>): Promise<Book | null> {
    const { data, error } = await supabase
      .from('books')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null; // No rows found
      throw new Error(`Failed to update book: ${error.message}`);
    }

    return data;
  },

  async deleteBook(id: string): Promise<boolean> {
    const { error } = await supabase.from('books').delete().eq('id', id);

    if (error) {
      throw new Error(`Failed to delete book: ${error.message}`);
    }

    return true;
  },

  async getGenres(): Promise<Genre[]> {
    const { data, error } = await supabase.from('books').select('genre');

    if (error) {
      throw new Error(`Failed to fetch genres: ${error.message}`);
    }

    const genres = new Set<Genre>();
    data?.forEach((book) => {
      if (book.genre && Array.isArray(book.genre)) {
        book.genre.forEach((g: Genre) => genres.add(g));
      }
    });
    return Array.from(genres).sort();
  },

  // Transaction operations
  async checkoutBook(bookId: string, patronId?: string): Promise<Transaction> {
    // Check if book is available
    const { data: book, error: bookError } = await supabase
      .from('books')
      .select('*')
      .eq('id', bookId)
      .eq('available', true)
      .single();

    if (bookError || !book) {
      throw new Error('Book not available for checkout');
    }

    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 14); // 2 weeks from now

    const transactionData = {
      book_id: bookId,
      patron_id: patronId,
      transaction_type: 'checkout' as const,
      checkout_date: new Date().toISOString(),
      due_date: dueDate.toISOString(),
      status: 'active' as const,
    };

    // Create transaction
    const { data: transaction, error: transactionError } = await supabase
      .from('transactions')
      .insert([transactionData])
      .select('*, books(*)')
      .single();

    if (transactionError) {
      throw new Error(
        `Failed to create checkout transaction: ${transactionError.message}`
      );
    }

    // Update book availability
    const { error: updateError } = await supabase
      .from('books')
      .update({ available: false })
      .eq('id', bookId);

    if (updateError) {
      throw new Error(
        `Failed to update book availability: ${updateError.message}`
      );
    }

    return {
      ...transaction,
      book: transaction.books,
    };
  },

  async returnBook(transactionId: string): Promise<Transaction | null> {
    // Get the transaction
    const { data: transaction, error: transactionError } = await supabase
      .from('transactions')
      .select('*, books(*)')
      .eq('id', transactionId)
      .eq('status', 'active')
      .single();

    if (transactionError || !transaction) {
      return null;
    }

    // Update transaction status
    const { data: updatedTransaction, error: updateError } = await supabase
      .from('transactions')
      .update({
        status: 'returned',
        return_date: new Date().toISOString(),
      })
      .eq('id', transactionId)
      .select('*, books(*)')
      .single();

    if (updateError) {
      throw new Error(`Failed to update transaction: ${updateError.message}`);
    }

    // Update book availability
    const { error: bookUpdateError } = await supabase
      .from('books')
      .update({ available: true })
      .eq('id', transaction.book_id);

    if (bookUpdateError) {
      throw new Error(
        `Failed to update book availability: ${bookUpdateError.message}`
      );
    }

    return {
      ...updatedTransaction,
      book: updatedTransaction.books,
    };
  },

  async getAllTransactions(): Promise<Transaction[]> {
    const { data, error } = await supabase
      .from('transactions')
      .select('*, books(*)')
      .order('checkout_date', { ascending: false });

    if (error) {
      throw new Error(`Failed to fetch transactions: ${error.message}`);
    }

    return (data || []).map((t) => ({
      ...t,
      book: t.books,
    }));
  },

  async getOverdueTransactions(): Promise<Transaction[]> {
    const { data, error } = await supabase
      .from('transactions')
      .select('*, books(*)')
      .eq('status', 'overdue')
      .order('due_date', { ascending: true });

    if (error) {
      throw new Error(`Failed to fetch overdue transactions: ${error.message}`);
    }

    return (data || []).map((t) => ({
      ...t,
      book: t.books,
    }));
  },

  // Reservation operations
  async reserveBook(bookId: string, patronId?: string): Promise<Reservation> {
    // Check if book exists
    const { data: book, error: bookError } = await supabase
      .from('books')
      .select('*')
      .eq('id', bookId)
      .single();

    if (bookError || !book) {
      throw new Error('Book not found');
    }

    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 7); // 1 week from now

    const reservationData = {
      book_id: bookId,
      patron_id: patronId,
      reservation_date: new Date().toISOString(),
      status: 'pending' as const,
      expiry_date: expiryDate.toISOString(),
    };

    const { data: reservation, error } = await supabase
      .from('reservations')
      .insert([reservationData])
      .select('*, books(*)')
      .single();

    if (error) {
      throw new Error(`Failed to create reservation: ${error.message}`);
    }

    return {
      ...reservation,
      book: reservation.books,
    };
  },

  async getAllReservations(): Promise<Reservation[]> {
    const { data, error } = await supabase
      .from('reservations')
      .select('*, books(*)')
      .order('reservation_date', { ascending: false });

    if (error) {
      throw new Error(`Failed to fetch reservations: ${error.message}`);
    }

    return (data || []).map((r) => ({
      ...r,
      book: r.books,
    }));
  },

  async cancelReservation(reservationId: string): Promise<Reservation | null> {
    const { data, error } = await supabase
      .from('reservations')
      .update({ status: 'cancelled' })
      .eq('id', reservationId)
      .select('*, books(*)')
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null; // No rows found
      throw new Error(`Failed to cancel reservation: ${error.message}`);
    }

    return {
      ...data,
      book: data.books,
    };
  },

  async get_all_catalog_items(): Promise<CatalogItem[]> {
    const { data, error } = await supabase
      .from('catalog_items')
      .select('*')
      .order('title', { ascending: true });

    if (error) {
      throw new Error(`Failed to fetch catalog items: ${error.message}`);
    }

    return data || [];
  },

  async get_all_copies_by_item_id(item_id: string): Promise<Item_Copy[]> {
    const { data, error } = await supabase
      .from('item_copies')
      .select('*')
      .eq('catalog_item_id', item_id)
      .order('status', { ascending: true });

    if (error) {
      throw new Error(`Failed to fetch item copies: ${error.message}`);
    }

    return data || [];
  },

  async get_all_branches(): Promise<Branch[]> {
    const { data, error } = await supabase
      .from('branches')
      .select('*')
      .order('is_main', { ascending: true });

    if (error) {
      throw new Error(`Failed to fetch branches: ${error.message}`);
    }

    return data || [];
  },
};
