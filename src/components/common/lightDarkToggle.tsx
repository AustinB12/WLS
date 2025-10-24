import { IconButton, useColorScheme } from '@mui/material';
import { DarkMode, LightMode } from '@mui/icons-material';

export const LightDarkToggle = () => {
  const { mode, setMode } = useColorScheme();

  return (
    <IconButton
      onClick={() => setMode(mode !== 'dark' ? 'dark' : 'light')}
      sx={{
        overflow: 'clip',
        position: 'relative',
        width: 40,
        height: 40,
      }}
    >
      <LightMode
        sx={{
          transform: `translateY(${mode === 'dark' ? '40px' : '0px'})`,
          position: 'absolute',
          transitionProperty: 'transform',
          transitionDuration: '300ms',
          transitionTimingFunction: 'ease-in-out',
        }}
      />
      <DarkMode
        sx={{
          transform: `translateY(${mode === 'dark' ? '0px' : '40px'})`,
          position: 'absolute',
          transitionProperty: 'transform',
          transitionDuration: '300ms',
          transitionTimingFunction: 'ease-in-out',
        }}
      />
    </IconButton>
  );
};
