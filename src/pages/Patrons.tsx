import { Container, Typography } from '@mui/material';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';

import sb from '../utils/supabase';
import type { Patron } from '../types';
import { useEffect, useState } from 'react';

const columns: GridColDef[] = [
  { field: 'firstName', headerName: 'First Name', width: 150 },
  { field: 'lastName', headerName: 'Last Name', width: 150 },
  { field: 'balance', headerName: 'Balance', width: 150 },
  { field: 'birthday', headerName: 'Birthdate', width: 150, type: 'date' },
];

export const Patrons = () => {
  const [patrons, setPatrons] = useState<Patron[]>([]);
  //   const [selectedPatron, setSelectedPatron] = useState<Patron | null>(null);
  //   const [patronDetailsDrawerOpen, setPatronDetailsDrawerOpen] = useState(false);
  //   const [createPatronDrawerOpen, setCreatePatronDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(true);
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
    <Container sx={{ p: 3 }}>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ fontWeight: 'bold', mb: 2, color: 'text.primary' }}
      >
        Patrons
      </Typography>
      <DataGrid
        rows={patrons || []}
        columns={columns}
        loading={loading}
      ></DataGrid>
    </Container>
  );
};
