import {
  Container,
  Typography,
  FormControl,
  Box,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import { useState, type FC } from 'react';
import { Library_Item_Type } from '../types';
import { type SelectChangeEvent } from '@mui/material/Select';
import { keyframes } from '@emotion/react';

export const CheckInItem: FC = () => {
  const [value, setValue] = useState<Library_Item_Type>(Library_Item_Type.Book);

  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value as Library_Item_Type);
  };
  return (
    <Container sx={{ pt: 4, maxWidth: '7xl' }}>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{
          fontWeight: 'bold',
          mb: 3,
          fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
        }}
      >
        {'Check In Item(s)'}
      </Typography>
      <Box sx={{ width: { xs: 150, sm: 175, md: 'calc(5rem + 100px)' } }}>
        <FormControl fullWidth size="small">
          <InputLabel id="item-type-select-label">Item Type</InputLabel>
          <Select
            size="small"
            label="Item Type"
            labelId="item-type-select-label"
            id="item-type-select"
            value={value}
            onChange={handleChange}
          >
            {Object.values(Library_Item_Type).map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Typography
        textAlign={'center'}
        variant="body1"
        sx={{ mt: 4, animation: `${kf} 1s infinite alternate` }}
      >
        {'🚧 Feature coming soon! 🚧'}
      </Typography>
    </Container>
  );
};

const kf = keyframes`
          0% { transform: scale(0.8); }
          100% {  transform: scale(1.2); }
        `;
