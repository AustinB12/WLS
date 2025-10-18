import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Stack,
  Button,
} from '@mui/material';
import {
  Assessment,
  History,
  LibraryAdd,
  LibraryAddCheck,
  TrendingUp,
} from '@mui/icons-material';

export const Home = () => {
  return (
    <Container sx={{ p: 3 }}>
      <Typography
        variant="h3"
        component="h1"
        gutterBottom
        sx={{ fontWeight: 'bold', mb: 3, color: 'text.primary' }}
      >
        Welcome to the WPL Management System
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Stack sx={{ flexDirection: 'row', alignItems: 'center', mb: 2 }}>
                <Assessment sx={{ mr: 1, color: 'primary.main' }} />
                <Typography
                  variant="h6"
                  component="h2"
                  sx={{ fontWeight: 600 }}
                >
                  Quick Stats
                </Typography>
              </Stack>
              <List dense>
                <ListItem disablePadding>
                  <ListItemText primary="Books Available: 1,250" />
                </ListItem>
                <ListItem disablePadding>
                  <ListItemText primary="Books Checked Out: 95" />
                </ListItem>
                <ListItem disablePadding>
                  <ListItemText primary="Active Members: 340" />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Stack sx={{ flexDirection: 'row', alignItems: 'center', mb: 2 }}>
                <History sx={{ mr: 1 }} />
                <Typography
                  variant="h6"
                  component="h2"
                  sx={{ fontWeight: 600 }}
                >
                  Recent Activity
                </Typography>
              </Stack>
              <List dense>
                <ListItem disablePadding>
                  <ListItemText
                    primary='• "The Great Gatsby" returned'
                    sx={{ variant: 'body2' }}
                  />
                </ListItem>
                <ListItem disablePadding>
                  <ListItemText
                    primary="• New member registered"
                    sx={{ variant: 'body2' }}
                  />
                </ListItem>
                <ListItem disablePadding>
                  <ListItemText
                    primary='• "1984" checked out'
                    sx={{ variant: 'body2' }}
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Stack sx={{ flexDirection: 'row', alignItems: 'center', mb: 2 }}>
                <TrendingUp sx={{ mr: 1, color: 'success.main' }} />
                <Typography
                  variant="h6"
                  component="h2"
                  sx={{ fontWeight: 600 }}
                >
                  Popular Books
                </Typography>
              </Stack>
              <List dense>
                <ListItem disablePadding>
                  <ListItemText
                    primary='1. "To Kill a Mockingbird"'
                    sx={{ variant: 'body2' }}
                  />
                </ListItem>
                <ListItem disablePadding>
                  <ListItemText
                    primary='2. "Pride and Prejudice"'
                    sx={{ variant: 'body2' }}
                  />
                </ListItem>
                <ListItem disablePadding>
                  <ListItemText
                    primary='3. "The Catcher in the Rye"'
                    sx={{ variant: 'body2' }}
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Grid container sx={{ mt: 4 }} spacing={2}>
        <Grid
          size={{ xs: 12, sm: 6 }}
          sx={{ height: { xs: '4rem', sm: '8rem' } }}
        >
          <Button
            fullWidth
            variant="contained"
            color="primary"
            startIcon={<LibraryAddCheck />}
            sx={{
              height: '100%',
              fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' },
            }}
          >
            Check In
          </Button>
        </Grid>
        <Grid
          size={{ xs: 12, sm: 6 }}
          sx={{ height: { xs: '4rem', sm: '8rem' } }}
        >
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            startIcon={<LibraryAdd />}
            sx={{
              height: '100%',
              fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' },
            }}
          >
            Check Out
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};
