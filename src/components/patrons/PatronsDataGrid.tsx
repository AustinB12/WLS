import {
  DataGrid,
  type GridColDef,
  type GridRenderCellParams,
  type GridRowSelectionModel,
} from '@mui/x-data-grid';

import { useEffect } from 'react';
import { useAllPatrons } from '../../hooks/usePatrons';
import { format_date, is_overdue } from '../../utils/dateUtils';
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
      return format_date(value);
    },
    flex: 3,
    renderCell: (params: GridRenderCellParams) => <Box>{params.value}</Box>,
  },
  {
    field: 'card_expiration_date',
    headerName: 'Card Expiration',
    valueGetter: (value) => {
      if (!value) return;
      return format_date(value);
    },
    flex: 3,
    renderCell: (params: GridRenderCellParams) => (
      <Box
        sx={{
          color: !is_overdue(params.value) ? 'inherit' : 'error.main',
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
  onPatronSelected?: (patronId: string) => void;
  check_overdue?: boolean;
}

export const PatronsDataGrid: React.FC<PatronsDataGridProps> = ({
  onError,
  cols = columns,
  onPatronSelected = undefined,
  check_overdue = false,
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
      pageSizeOptions={[50, 20, 15, 10, 5]}
      initialState={{
        pagination: {
          paginationModel: { pageSize: 20, page: 0 },
        },
      }}
      slotProps={{
        toolbar: {
          printOptions: { disableToolbarButton: true },
          csvOptions: { disableToolbarButton: true },
        },
      }}
      onRowSelectionModelChange={(x) => {
        const selected_id =
          Array.from((x as GridRowSelectionModel).ids)[0]?.toString() || '';
        if (onPatronSelected) {
          onPatronSelected(selected_id);
        }
      }}
      isRowSelectable={(params) =>
        check_overdue && !is_overdue(params.row.card_expiration_date)
      }
    />
  );
};
