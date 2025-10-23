import {
  DataGrid,
  type GridColDef,
  type GridRenderCellParams,
} from '@mui/x-data-grid';

import { useEffect } from 'react';
import { useAllPatrons } from '../../hooks/usePatrons';
import { formatDate, isOverdue } from '../../utils/dateUtils';
import { Box } from '@mui/material';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID' },
  { field: 'first_name', headerName: 'First', flex: 1 },
  { field: 'last_name', headerName: 'Last', flex: 2 },
  { field: 'balance', headerName: 'Balance', flex: 1 },
  {
    field: 'birthday',
    headerName: 'Birthday',
    valueGetter: (value) => {
      if (!value) return;
      return formatDate(value);
    },
    flex: 3,
    renderCell: (params: GridRenderCellParams) => <Box>{params.value}</Box>,
  },
  {
    field: 'card_expiration_date',
    headerName: 'Card Expiration',
    valueGetter: (value) => {
      if (!value) return;
      return formatDate(value);
    },
    flex: 3,
    renderCell: (params: GridRenderCellParams) => (
      <Box
        sx={{
          color: !isOverdue(params.value) ? 'inherit' : 'error.main',
        }}
      >
        {params.value}
      </Box>
    ),
  },
];

interface PatronsDataGridProps {
  onError?: (error: string) => void;
  cols?: GridColDef[];
}

export const PatronsDataGrid: React.FC<PatronsDataGridProps> = ({
  onError,
  cols = columns,
}) => {
  const { data: patrons, isLoading: loading, error } = useAllPatrons();

  useEffect(() => {
    if (error && onError) {
      onError(error.message);
    }
  }, [error, onError]);

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
          paginationModel: { pageSize: 10, page: 0 },
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
