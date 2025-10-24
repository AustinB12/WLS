import {
  useMediaQuery,
  Container,
  Typography,
  useTheme,
  Box,
} from '@mui/material';
import { useState } from 'react';
import { PatronsDataGrid } from '../components/patrons/PatronsDataGrid';
import PatronsList from '../components/patrons/PatronsList';

export const Patrons = () => {
  const theme = useTheme();
  const xsUp = useMediaQuery(theme.breakpoints.up('sm'));
  const [error, setError] = useState<string | null>(null);

  const handleError = (errorMessage: string) => {
    setError(errorMessage);
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        p: 3,
        overflow: 'hidden',
        height: 1,
        maxHeight: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ fontWeight: 'bold', mb: 2, color: 'text.primary' }}
      >
        Patrons
      </Typography>
      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          Error: {error}
        </Typography>
      )}
      <Box sx={{ flex: 1, overflow: 'hidden' }}>
        {xsUp ? <PatronsDataGrid onError={handleError} /> : <PatronsList />}
      </Box>
    </Container>
  );
};
