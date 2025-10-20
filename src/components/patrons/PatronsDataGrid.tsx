import { DataGrid, type GridColDef } from '@mui/x-data-grid';

import sb from '../../utils/supabase';
import type { Patron } from '../../types';
import { useEffect, useState, useCallback } from 'react';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID' },
  { field: 'firstName', headerName: 'First', flex: 1 },
  { field: 'lastName', headerName: 'Last', flex: 1 },
  { field: 'balance', headerName: 'Balance' },
  { field: 'birthday', headerName: 'Birthdate', type: 'date' },
];

interface PatronsDataGridProps {
  onError?: (error: string) => void;
  cols?: GridColDef[];
}

export const PatronsDataGrid: React.FC<PatronsDataGridProps> = ({
  onError,
  cols = columns,
}) => {
  const [patrons, setPatrons] = useState<Patron[]>([]);
  const [loading, setLoading] = useState(true);

  const getPatrons = useCallback(async () => {
    try {
      setLoading(true);
      const { data, error } = await sb
        .from('patrons')
        .select('id, firstName, lastName, balance, birthday');

      if (error) {
        onError?.(error.message);
        return;
      }

      if (data) {
        setPatrons(
          data.map(
            (patron) =>
              ({
                id: patron.id,
                firstName: patron.firstName,
                lastName: patron.lastName,
                balance: patron.balance,
                birthday: patron?.birthday
                  ? new Date(patron.birthday + 'T06:00:00Z')
                  : null,
              }) as Patron
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
    getPatrons();
  }, [getPatrons]);

  return (
    <DataGrid
      showToolbar
      disableColumnSelector
      rows={patrons || []}
      columns={cols}
      loading={loading}
      label="Patrons"
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
