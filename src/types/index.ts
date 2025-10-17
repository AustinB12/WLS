export interface Book {
  id: string;
  title: string;
  author: string;
  publisher: string;
  yearPublished?: number;
  genre?: Genre[];
  description?: string;
  cover_image_url?: string;
  cost: number;
  libraryOfCongressCode?: string;
  available?: boolean;
}

export interface Transaction {
  id: string;
  book_id: string;
  transaction_type: 'checkout' | 'return' | 'renewal';
  checkout_date: string;
  due_date: string;
  return_date?: string;
  fine_amount?: number;
  status: 'active' | 'returned' | 'overdue';
  book?: Book;
}

export interface Reservation {
  id: string;
  book_id: string;
  reservation_date: string;
  status: 'pending' | 'fulfilled' | 'cancelled';
  expiry_date: string;
  book?: Book;
}

export interface Fine {
  id: string;
  transaction_id: string;
  amount: number;
  reason: string;
  is_paid: boolean;
  created_at: string;
  transaction?: Transaction;
}

export interface BookFilters {
  search?: string;
  genre?: Genre;
  author?: string;
  availability?: 'all' | 'available' | 'unavailable';
}

export enum Genre {
  Fiction = 'Fiction',
  NonFiction = 'Non-Fiction',
  Mystery = 'Mystery',
  Romance = 'Romance',
  ScienceFiction = 'Science Fiction',
  Fantasy = 'Fantasy',
  Biography = 'Biography',
  History = 'History',
  SelfHelp = 'Self-Help',
  Technology = 'Technology',
  Business = 'Business',
  Health = 'Health',
  Travel = 'Travel',
  Cooking = 'Cooking',
  Art = 'Art',
  Poetry = 'Poetry',
  Drama = 'Drama',
  Horror = 'Horror',
  Thriller = 'Thriller',
  Children = 'Children',
  YoungAdult = 'Young Adult',
  Academic = 'Academic',
  Reference = 'Reference',
}

export interface BookFormData {
  title: string;
  author: string;
  publisher: string;
  cost: number;
  libraryOfCongressCode?: string;
  yearPublished?: string;
  genre?: Genre[];
  description?: string;
}
