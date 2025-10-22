import { useEffect, useState } from 'react';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { dataService } from '../../services/dataService';
import { Library_Item_Type, type CatalogItem } from '../../types';
import { Snackbar, Alert, Chip } from '@mui/material';
import { CatalogItemDetails } from './CatalogItemDetails';
import { blueberryTwilightPalette } from '@mui/x-charts/colorPalettes';

const chip_colors = blueberryTwilightPalette('dark');

const get_color_for_item_type = (item_type: string) => {
  switch (item_type) {
    case Library_Item_Type.Book:
      return chip_colors[0];
    case Library_Item_Type.Magazine:
      return chip_colors[1];
    case Library_Item_Type.Periodical:
      return chip_colors[2];
    case Library_Item_Type.Recording:
      return chip_colors[3];
    case Library_Item_Type.Audiobook:
      return chip_colors[4];
    case Library_Item_Type.Video:
      return chip_colors[5];
    default:
      return 'default';
  }
};

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'title', headerName: 'Title', width: 150, editable: false },
  {
    field: 'item_type',
    headerName: 'Type',
    width: 110,
    editable: false,
    renderCell: (params) => {
      return (
        <Chip
          label={params.value}
          sx={{ backgroundColor: get_color_for_item_type(params.value) }}
        />
      );
    },
  },
  {
    field: 'description',
    headerName: 'Description',
    width: 200,
    editable: false,
    flex: 1,
  },
  {
    field: 'publication_year',
    headerName: 'Publication Year',
    width: 130,
    editable: false,
  },
];

export const CatalogItemGrid = () => {
  const [rows, setRows] = useState<CatalogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>('');

  const [details_open, set_details_open] = useState(false);
  const [selected_item, set_selected_item] = useState<CatalogItem | null>(null);

  useEffect(() => {
    const fetchCatalogItems = async () => {
      try {
        setLoading(true);
        const data = await dataService.get_all_catalog_items();
        setRows(data || []);
      } catch (error) {
        console.error('Error fetching catalog items:', error);
        setRows([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCatalogItems();
  }, []);

  const handle_item_selected = (item: CatalogItem) => {
    set_selected_item(item);
    set_details_open(true);
  };

  return (
    <>
      <DataGrid
        rows={rows}
        columns={columns}
        loading={loading}
        pageSizeOptions={[10, 25, 50]}
        initialState={{
          pagination: { paginationModel: { pageSize: 10 } },
        }}
        onRowDoubleClick={(params) =>
          handle_item_selected(params.row as CatalogItem)
        }
      />
      <CatalogItemDetails
        is_open={details_open}
        item={selected_item}
        onClose={() => set_details_open(false)}
      />
      <Snackbar
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
        open={Boolean(error)}
        onClose={() => setError(null)}
        autoHideDuration={6000}
      >
        <Alert severity="error">{error}</Alert>
      </Snackbar>
    </>
  );
};
