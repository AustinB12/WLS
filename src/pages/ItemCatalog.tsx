import type { JSX, PropsWithChildren } from 'react';
import {
  Container,
  Typography,
  Grid,
  Alert,
  AlertTitle,
  Button,
  CircularProgress,
  Fab,
} from '@mui/material';
import sb from '../utils/supabase';
import React, { useState } from 'react';
import type { BookFormData } from '../types';
import CreateBookDrawer from '../components/books/CreateBookDrawer';
import { Add, Refresh } from '@mui/icons-material';
import { CatalogItemGrid } from '../components/catalog_items/CatalogItemGrid';
import { useCatalogItems } from '../hooks/useCatalogItems';

export const ItemCatalog = React.memo(({ children }: PropsWithChildren) => {
  return (
    <Container sx={{ p: 3 }}>
      <Typography
        variant="h3"
        component="h1"
        gutterBottom
        sx={{ fontWeight: 'bold', mb: 3 }}
      >
        Catalog
      </Typography>
      {children}
    </Container>
  );
});

export const ItemCatalogContent = (): JSX.Element => {
  const [createBookDrawerOpen, setCreateBookDrawerOpen] = useState(false);

  const {
    data: catalogItems,
    refetch: get_items,
    isLoading: loading,
    error,
  } = useCatalogItems();

  const handle_create_book_clicked = () => {
    setCreateBookDrawerOpen(true);
  };

  const handle_refetch_clicked = () => {
    get_items();
  };

  const handle_create_book_close = () => {
    setCreateBookDrawerOpen(false);
  };

  const create_book = async (bookData: BookFormData) => {
    const { error } = await sb.from('books').insert(bookData);
    if (error) {
      // setError(error.message);
    } else {
      setCreateBookDrawerOpen(false);
      get_items();
    }
  };

  if (error && !loading) {
    return (
      <ErrorState
        error={error.message}
        onRetry={handle_refetch_clicked}
        title={error.name}
      />
    );
  }

  if (loading) {
    return <LoadingState />;
  }

  if (!loading && catalogItems && catalogItems.length === 0 && !error) {
    return <EmptyState message="No items found." />;
  }

  return (
    <>
      <CatalogItemGrid />
      {/* <BookSearchHeader
        searchTerm={searchTerm}
        onSearchChange={handle_search_change}
        onSearchKeyDown={handle_search_key_down}
      />
      <BookGrid
        books={catalogItems}
        onBookDetailsClick={handle_item_details_clicked}
      /> */}
      <CreateBookDrawer
        open={createBookDrawerOpen}
        onClose={handle_create_book_close}
        onSubmit={create_book}
      />
      <Fab
        color="primary"
        onClick={handle_create_book_clicked}
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
