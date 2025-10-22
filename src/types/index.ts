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
  Academic = 'Academic',
  Art = 'Art',
  Biography = 'Biography',
  Business = 'Business',
  Children = 'Children',
  Cooking = 'Cooking',
  Drama = 'Drama',
  Fantasy = 'Fantasy',
  Fiction = 'Fiction',
  Health = 'Health',
  History = 'History',
  Horror = 'Horror',
  Mystery = 'Mystery',
  NonFiction = 'Non-Fiction',
  Poetry = 'Poetry',
  Political = 'Political',
  Reference = 'Reference',
  Romance = 'Romance',
  ScienceFiction = 'Science Fiction',
  SelfHelp = 'Self-Help',
  Technology = 'Technology',
  Thriller = 'Thriller',
  Travel = 'Travel',
  YoungAdult = 'Young Adult',
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

export interface Patron {
  id: number;
  first_name: string;
  last_name: string;
  balance: number;
  birthday?: Date;
}

export interface Branch {
  id: number;
  branch_name: string;
  is_main: boolean;
}

export enum Library_Item_Type {
  Book = 'Book',
  Periodical = 'Periodical',
  Recording = 'Recording',
  Video = 'Video',
  Magazine = 'Magazine',
  Audiobook = 'Audiobook',
}

export interface CatalogItem {
  id: string;
  title: string;
  item_type: Library_Item_Type;
  description?: string;
  publication_year?: number;
}

export type Condition = 'New' | 'Good' | 'Fair' | 'Poor';
export type AvailabilityStatus =
  | 'Available'
  | 'Checked Out'
  | 'Reserved'
  | 'Processing'
  | 'Damaged'
  | 'Lost';

export interface Item_Copy {
  id: string;
  catalog_item_id: string;
  branch_id: number;
  status: AvailabilityStatus;
  condition?: Condition;
  cost: number;
  notes?: string;
}

export interface Book {
  id: string;
  title: string;
  description?: string;
  publisher: string;
  author: string;
  year_published?: number;
  genre?: Genre[];
  cover_image_url?: string;
  cost: number;
  congress_code?: string;
}

export interface Recording {
  id: string;
  title: string;
  description?: string;
  artist: string;
  label: string;
  publication_year?: number;
  duration_seconds?: number;
  congress_code?: string;
}

export interface Video {
  id: string;
  title: string;
  description?: string;
  director: string;
  producer: string;
  publication_year?: number;
  duration_minutes?: number;
  congress_code?: string;
}

export interface Periodical {
  id: string;
  title: string;
  description?: string;
  issue_number: string;
  publication_year?: number;
  publisher: string;
  congress_code?: string;
}

export interface Magazine {
  id: string;
  title: string;
  description?: string;
  issue_number: string;
  publication_year?: number;
  publisher: string;
  congress_code?: string;
}

export interface Audiobook {
  id: string;
  title: string;
  description?: string;
  narrator: string;
  publication_year?: number;
  duration_hours?: number;
  congress_code?: string;
}
