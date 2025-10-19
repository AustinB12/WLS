import {
  Container,
  List,
  ListItem,
  Skeleton,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';

import sb from '../utils/supabase';
import type { Patron } from '../types';
import { useEffect, useState } from 'react';
import { ListViewCell } from '../components/common/ListViewCell';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID' },
  { field: 'firstName', headerName: 'First', flex: 1 },
  { field: 'lastName', headerName: 'Last', flex: 1 },
  { field: 'balance', headerName: 'Balance' },
  { field: 'birthday', headerName: 'Birthdate', type: 'date' },
];

export const Patrons = () => {
  const [patrons, setPatrons] = useState<Patron[]>([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const xsUp = useMediaQuery(theme.breakpoints.up('sm'));

  //   const [selectedPatron, setSelectedPatron] = useState<Patron | null>(null);
  //   const [patronDetailsDrawerOpen, setPatronDetailsDrawerOpen] = useState(false);
  //   const [createPatronDrawerOpen, setCreatePatronDrawerOpen] = useState(false);
  //   const [error, setError] = useState<string | null>(null);
  //   const [searchTerm, setSearchTerm] = useState('');

  const getPatrons = async () => {
    try {
      setLoading(true);
      const { data, error } = await sb
        .from('patrons')
        .select('id, firstName, lastName, balance, birthday');
      //.ilike('firstName', `%${searchTerm}%`);
      if (error) {
        // setError(error.message);
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
        // setError(err.message);
      } else {
        // setError('An unknown error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPatrons();
  }, []);

  return (
    <Container sx={{ p: 3, width: 1 }}>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ fontWeight: 'bold', mb: 2, color: 'text.primary' }}
      >
        Patrons
      </Typography>
      {xsUp ? (
        <DataGrid
          showToolbar
          rows={patrons || []}
          columns={columns}
          loading={loading}
          label="Patrons"
        ></DataGrid>
      ) : loading ? (
        <Skeleton variant="rectangular" height={'40vh'} />
      ) : (
        <List
          sx={{
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 1,
            py: 0,
          }}
        >
          {patrons.map((patron, index) => (
            <ListItem
              key={patron.id}
              sx={{
                borderBottom: index < patrons.length - 1 ? '1px solid' : 'none',
                borderColor: 'divider',
                bgcolor: index % 2 === 0 ? 'background.paper' : '#1811d610',
              }}
            >
              <ListViewCell key={patron.id} patron={patron} />
            </ListItem>
          ))}
        </List>
      )}
    </Container>
  );
};
