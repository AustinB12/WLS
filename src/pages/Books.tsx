import React, { useState } from 'react';
import { Header } from '../components/common/Header';
import { Sidebar } from '../components/common/Sidebar';
import { BookCard } from '../components/books/BookCard';
import { useBooks } from '../hooks/useBooks';
import { useCheckoutBook } from '../hooks/useTransactions';
import { useReserveBook } from '../hooks/useReservations';
import type { BookFilters } from '../types';
import {
  CircularProgress,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Alert,
  Stack,
} from '@mui/material';

export const Books: React.FC = () => {
  const [filters, setFilters] = useState<BookFilters>({});
  const { data: books, isLoading, error } = useBooks(filters);
  const checkoutMutation = useCheckoutBook();
  const reserveMutation = useReserveBook();

  const handleCheckout = async (bookId: string) => {
    try {
      await checkoutMutation.mutateAsync(bookId);
      alert('Book checked out successfully!');
    } catch (error) {
      alert('Failed to checkout book: ' + (error as Error).message);
    }
  };

  const handleReserve = async (bookId: string) => {
    try {
      await reserveMutation.mutateAsync(bookId);
      alert('Book reserved successfully!');
    } catch (error) {
      alert('Failed to reserve book: ' + (error as Error).message);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, search: e.target.value });
  };

  const handleAvailabilityChange = (value: string) => {
    setFilters({
      ...filters,
      availability: value as BookFilters['availability'],
    });
  };

  if (error) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="error">
          Error loading books: {(error as Error).message}
        </Alert>
      </Container>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'grey.50',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Header />
      <Stack direction="row" sx={{ flexGrow: 1 }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Container maxWidth="xl">
            <Typography
              variant="h4"
              component="h1"
              gutterBottom
              sx={{ fontWeight: 'bold', mb: 3 }}
            >
              Book Catalog
            </Typography>

            {/* Filters */}
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Grid container spacing={3}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                      fullWidth
                      label="Search Books"
                      placeholder="Search by title, author, or ISBN..."
                      value={filters.search || ''}
                      onChange={handleSearchChange}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel>Availability</InputLabel>
                      <Select
                        value={filters.availability || 'all'}
                        onChange={(e) =>
                          handleAvailabilityChange(e.target.value)
                        }
                        label="Availability"
                      >
                        <MenuItem value="all">All Books</MenuItem>
                        <MenuItem value="available">Available Only</MenuItem>
                        <MenuItem value="unavailable">
                          Unavailable Only
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            {/* Books Grid */}
            {isLoading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <CircularProgress size={60} />
              </Box>
            ) : (
              <Grid container spacing={3}>
                {books?.map((book) => (
                  <Grid size={{ xs: 12, sm: 6, md: 4 }} key={book.id}>
                    <BookCard
                      book={book}
                      onCheckout={handleCheckout}
                      onReserve={handleReserve}
                    />
                  </Grid>
                ))}
              </Grid>
            )}

            {books && books.length === 0 && (
              <Box sx={{ textAlign: 'center', py: 8 }}>
                <Typography variant="h6" color="text.secondary">
                  No books found matching your criteria.
                </Typography>
              </Box>
            )}
          </Container>
        </Box>
      </Stack>
    </Box>
  );
};
