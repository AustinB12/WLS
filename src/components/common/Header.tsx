import { Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  useColorScheme,
} from '@mui/material';
import { DarkMode, LightMode } from '@mui/icons-material';

export const Header = () => {
  const { setMode } = useColorScheme();
  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar
        sx={{
          mx: 'auto',
          width: '100%',
          px: { xs: 2, sm: 3, lg: 4 },
        }}
      >
        <Box sx={{ flexGrow: 1 }}>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              textDecoration: 'none',
              fontWeight: 600,
            }}
          >
            Wayback Public Library
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton
            onClick={() => setMode('dark')}
            aria-label="toggle dark mode"
          >
            <DarkMode />
          </IconButton>
          <IconButton
            onClick={() => setMode('light')}
            aria-label="toggle light mode"
          >
            <LightMode />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
