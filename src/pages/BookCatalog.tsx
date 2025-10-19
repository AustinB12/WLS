import type { JSX, PropsWithChildren } from 'react';
import {
  Container,
  Typography,
  Drawer,
  Grid,
  Box,
  InputAdornment,
  Stack,
  TextField,
  Alert,
  AlertTitle,
  Button,
  CircularProgress,
  Fab,
} from '@mui/material';
import sb from '../utils/supabase';
import React, { useEffect, useState } from 'react';
import BookDetails from '../components/books/BookDetails';
import type { Book, BookFormData } from '../types';
import CreateBookDrawer from '../components/books/CreateBookDrawer';
import { BookCatalogCard } from '../components/books/BookCatalogCard';
import { Search, Add, Refresh } from '@mui/icons-material';

export const BookCatalog = React.memo(({ children }: PropsWithChildren) => {
  return (
    <Container sx={{ p: 3 }}>
      <Typography
        variant="h3"
        component="h1"
        gutterBottom
        sx={{ fontWeight: 'bold', mb: 3 }}
      >
        Book Catalog
      </Typography>

      {children}
    </Container>
  );
});

export const BookCatalogContent = (): JSX.Element => {
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [bookDetailsDrawerOpen, setBookDetailsDrawerOpen] = useState(false);
  const [createBookDrawerOpen, setCreateBookDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const getBooks = async () => {
    try {
      setLoading(true);
      const { data, error } = await sb
        .from('books')
        .select(
          'id, title, description, author, cost, publisher, yearPublished, genre, coverImageUrl, copies'
        )
        .ilike('title', `%${searchTerm}%`);

      if (error) {
        setError(error.message);
        return;
      }

      if (data) {
        setBooks(
          data.map(
            (book) =>
              ({
                id: book.id,
                title: book.title,
                cost: book.cost,
                author: book.author,
                description: book.description,
                publisher: book.publisher,
                yearPublished: book.yearPublished,
                genre: book.genre,
                coverImageUrl: book?.coverImageUrl,
                copies: book?.copies,
              }) as Book
          )
        );
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleBookDetailsClicked = (book: Book) => {
    setSelectedBook(book);
    setBookDetailsDrawerOpen(true);
  };

  const handleCreateBookClicked = () => {
    setCreateBookDrawerOpen(true);
  };

  const handleRefetchClicked = () => {
    setError(null);
    getBooks();
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      getBooks();
    }
  };

  const handleBookDetailsClose = () => {
    setBookDetailsDrawerOpen(false);
  };

  const handleCreateBookClose = () => {
    setCreateBookDrawerOpen(false);
  };

  const createBook = async (bookData: BookFormData) => {
    const { error } = await sb.from('books').insert(bookData);
    if (error) {
      setError(error.message);
    } else {
      setCreateBookDrawerOpen(false);
      getBooks();
    }
  };
  const renderDrawers = () => (
    <>
      <Drawer
        anchor="right"
        open={bookDetailsDrawerOpen}
        onClose={handleBookDetailsClose}
      >
        <BookDetails book={selectedBook} onClose={handleBookDetailsClose} />
      </Drawer>
      <CreateBookDrawer
        open={createBookDrawerOpen}
        onClose={handleCreateBookClose}
        onSubmit={createBook}
      />
    </>
  );

  useEffect(() => {
    getBooks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error && !loading) {
    return (
      <ErrorState
        error={error}
        onRetry={handleRefetchClicked}
        title="Error loading books"
      />
    );
  }

  if (loading) {
    return <LoadingState />;
  }

  if (!loading && books && books.length === 0 && !error) {
    return <EmptyState message="No books found matching your search." />;
  }

  return (
    <>
      <BookSearchHeader
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        onSearchKeyDown={handleSearchKeyDown}
      />
      <BookGrid books={books} onBookDetailsClick={handleBookDetailsClicked} />
      {renderDrawers()}
      <Fab
        color="primary"
        onClick={handleCreateBookClicked}
        aria-label="Add book"
        title="Add book"
        sx={{
          position: 'fixed',
          bottom: '3vh',
          right: '3vh',
        }}
      >
        <Add />
      </Fab>
    </>
  );
};

interface BookGridProps {
  books: Book[];
  onBookDetailsClick: (book: Book) => void;
}

const BookGrid: React.FC<BookGridProps> = ({ books, onBookDetailsClick }) => {
  return (
    <Grid container spacing={3}>
      {books.map((book) => (
        <Grid size={{ xs: 6, sm: 6, md: 4, lg: 4, xl: 3 }} key={book.id}>
          <BookCatalogCard book={book} onDetailsClick={onBookDetailsClick} />
        </Grid>
      ))}
    </Grid>
  );
};

interface BookSearchHeaderProps {
  searchTerm: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchKeyDown: (e: React.KeyboardEvent) => void;
}

const BookSearchHeader: React.FC<BookSearchHeaderProps> = ({
  searchTerm,
  onSearchChange,
  onSearchKeyDown,
}) => {
  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{ mb: 4, alignItems: 'center', justifyContent: 'space-between' }}
    >
      <Box sx={{ mb: 4, width: '40%' }}>
        <TextField
          fullWidth
          placeholder="Search books..."
          variant="outlined"
          value={searchTerm}
          onChange={onSearchChange}
          onKeyDown={onSearchKeyDown}
          sx={{ maxWidth: 500 }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            },
          }}
        />
      </Box>
    </Stack>
  );
};

interface EmptyStateProps {
  message: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ message }) => {
  return (
    <Typography sx={{ color: 'text.secondary', fontStyle: 'italic', ml: 2 }}>
      {message}
    </Typography>
  );
};

interface ErrorStateProps {
  error: string;
  onRetry: () => void;
  title?: string;
}

const ErrorState: React.FC<ErrorStateProps> = ({
  error,
  onRetry,
  title = 'Error loading data',
}) => {
  return (
    <Container sx={{ p: 2, textAlign: 'center' }}>
      <Alert severity="error">
        <AlertTitle sx={{ textAlign: 'left' }}>{title}</AlertTitle>
        {error}
      </Alert>
      <Button
        title="Retry"
        variant="contained"
        startIcon={<Refresh />}
        onClick={onRetry}
        sx={{ m: 2 }}
      >
        Retry
      </Button>
    </Container>
  );
};

interface LoadingStateProps {
  size?: string;
  height?: string;
}

const LoadingState: React.FC<LoadingStateProps> = ({
  size = 'calc(32px + 5vw)',
  height = '40vh',
}) => {
  return (
    <Grid
      sx={{
        display: 'flex',
        justifyContent: 'center',
        height,
        alignItems: 'center',
      }}
      size={12}
    >
      <CircularProgress size={size} />
    </Grid>
  );
};
