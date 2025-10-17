import { createTheme } from '@mui/material';

const theme = createTheme({
  //   palette: { mode: 'dark' },
  colorSchemes: { dark: true, light: true },
  components: {
    // Name of the component
    MuiTypography: {
      defaultProps: {
        color: 'textPrimary',
      },
    },
    MuiButtonBase: {
      defaultProps: {
        // The props to change the default for.
        disableRipple: true, // No more ripple, on the whole application 💣!
      },
    },
  },
});

export default theme;
