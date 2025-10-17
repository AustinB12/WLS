import {
  Container,
  Typography,
  TextField,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Box,
  InputAdornment,
  Drawer,
  Alert,
  AlertTitle,
  CircularProgress,
  Stack,
  IconButton,
  Chip,
} from '@mui/material';
import { Search, BookmarkAdd, Info, Refresh, Add } from '@mui/icons-material';
import sb from '../utils/supabase';
import { useEffect, useState } from 'react';
import BookDetails from '../components/books/BookDetails';
import type { Book, BookFormData } from '../types';
import CreateBookDrawer from '../components/books/CreateBookDrawer';

export const BookCatalog = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [bookDetailsDrawerOpen, setBookDetailsDrawerOpen] = useState(false);
  const [createBookDrawerOpen, setCreateBookDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  function handleBookDetailsClicked(book: Book) {
    setSelectedBook(book);
    setBookDetailsDrawerOpen(true);
  }

  function handleCreateBookClicked() {
    setCreateBookDrawerOpen(true);
  }

  function handleRefetchClicked() {
    setError(null);
    getBooks();
  }

  async function createBook(bookData: BookFormData) {
    sb.from('books')
      .insert(bookData)
      .then(({ error }) => {
        if (error) {
          setError(error.message);
        } else {
          setCreateBookDrawerOpen(false);
          getBooks();
        }
      });
  }

  async function getBooks() {
    try {
      setLoading(true);
      const { data, error } = await sb
        .from('books')
        .select(
          'id, title, description, author, cost, publisher, yearPublished, genre'
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
  }

  useEffect(() => {
    getBooks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container sx={{ p: 3 }}>
      <Typography
        variant="h3"
        component="h1"
        gutterBottom
        sx={{ fontWeight: 'bold', mb: 3 }}
        onClick={() => console.log(books)}
      >
        Book Catalog
      </Typography>

      <Stack
        direction="row"
        spacing={2}
        sx={{ mb: 4, alignItems: 'center', justifyContent: 'space-between' }}
      >
        <Box sx={{ mb: 4 }}>
          <TextField
            fullWidth
            placeholder="Search books..."
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && getBooks()}
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
        <Box>
          <IconButton onClick={handleCreateBookClicked}>
            <Add />
          </IconButton>
        </Box>
      </Stack>

      <Grid container spacing={3}>
        {error && !loading && (
          <Container sx={{ p: 2, textAlign: 'center' }}>
            <Alert severity="error">
              <AlertTitle sx={{ textAlign: 'left' }}>
                Error loading books
              </AlertTitle>
              {error}
            </Alert>
            <Button
              title="Refetch Books"
              variant="contained"
              startIcon={<Refresh />}
              onClick={handleRefetchClicked}
              sx={{ m: 2 }}
            >
              Retry
            </Button>
          </Container>
        )}
        {loading && (
          <Grid
            sx={{
              display: 'flex',
              justifyContent: 'center',
              height: '40vh',
              alignItems: 'center',
            }}
            size={12}
          >
            <CircularProgress size={'calc(36px + 6vw)'} />
          </Grid>
        )}
        {!loading && books && books.length === 0 && !error && (
          <Typography
            sx={{ color: 'text.secondary', fontStyle: 'italic', ml: 2 }}
          >
            {'No books found matching your search.'}
          </Typography>
        )}
        {books &&
          !error &&
          books.length > 0 &&
          books.map((book) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={book.id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <CardMedia
                  onClick={() => handleBookDetailsClicked(book)}
                  sx={{
                    height: 200,
                    backgroundColor: 'grey.200',
                    cursor: 'pointer',
                  }}
                  title={`${book.title}`}
                />
                <CardContent
                  sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}
                >
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="h2"
                    onClick={() => handleBookDetailsClicked(book)}
                    sx={{ cursor: 'pointer' }}
                  >
                    {book.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                  >
                    {'By: ' + book.author}
                  </Typography>
                  {(book.publisher || book.yearPublished) && (
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 2 }}
                    >
                      {book.publisher && `Published By: ${book.publisher}`}
                      {book.yearPublished && book.publisher && ' in '}
                      {book.yearPublished && book.yearPublished?.toString()}
                    </Typography>
                  )}
                  {book?.genre && book.genre.length > 0 && (
                    <Stack direction={'row'} sx={{ mb: 1 }}>
                      {book.genre.map((g) => (
                        <Chip key={g} label={g} sx={{ mr: 0.5, mb: 0.5 }} />
                      ))}
                    </Stack>
                  )}
                  <Box sx={{ display: 'flex', gap: 1, mt: 'auto' }}>
                    <Button
                      variant="contained"
                      startIcon={<BookmarkAdd />}
                      size="small"
                      sx={{ flex: 1 }}
                    >
                      Reserve
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<Info />}
                      size="small"
                      sx={{ flex: 1 }}
                      onClick={() => handleBookDetailsClicked(book)}
                    >
                      Details
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>
      <Drawer
        anchor="right"
        open={bookDetailsDrawerOpen}
        onClose={() => setBookDetailsDrawerOpen(false)}
      >
        <BookDetails
          book={selectedBook}
          onClose={() => setBookDetailsDrawerOpen(false)}
        />
      </Drawer>
      <CreateBookDrawer
        open={createBookDrawerOpen}
        onClose={() => setCreateBookDrawerOpen(false)}
        onSubmit={createBook}
      />
    </Container>
  );
};
