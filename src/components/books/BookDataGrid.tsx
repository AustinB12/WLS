import { DataGrid, type GridColDef } from '@mui/x-data-grid';

import sb from '../../utils/supabase';
import type { Book } from '../../types';
import { useEffect, useState, useCallback } from 'react';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID' },
  { field: 'title', headerName: 'Title', flex: 1 },
  { field: 'author', headerName: 'Author', flex: 1 },
];

interface BooksDataGridProps {
  onError?: (error: string) => void;
  cols?: GridColDef[];
}

export const BooksDataGrid: React.FC<BooksDataGridProps> = ({
  onError,
  cols = columns,
}) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  const getBooks = useCallback(async () => {
    try {
      setLoading(true);
      const { data, error } = await sb
        .from('books')
        .select('id, title, author');

      if (error) {
        onError?.(error.message);
        return;
      }

      if (data) {
        setBooks(
          data.map(
            (book) =>
              ({
                id: book.id,
                title: book.title,
                author: book.author,
              }) as Book
          )
        );
      }
    } catch (err) {
      if (err instanceof Error) {
        onError?.(err.message);
      } else {
        onError?.('An unknown error occurred');
      }
    } finally {
      setLoading(false);
    }
  }, [onError]);

  useEffect(() => {
    getBooks();
  }, [getBooks]);

  return (
    <DataGrid
      showToolbar
      disableColumnSelector
      rows={books || []}
      columns={cols}
      loading={loading}
      label="Books"
      pageSizeOptions={[15, 10, 5]}
      initialState={{
        pagination: {
          paginationModel: { pageSize: 5, page: 0 },
        },
      }}
      slotProps={{
        toolbar: {
          printOptions: { disableToolbarButton: true },
          csvOptions: { disableToolbarButton: true },
        },
      }}
    />
  );
};
