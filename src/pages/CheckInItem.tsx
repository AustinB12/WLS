import {
  Container,
  Typography,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Autocomplete,
  TextField,
  Grid,
} from '@mui/material';
import { useState, type FC } from 'react';
import { type SelectChangeEvent } from '@mui/material/Select';
import { useAllCopies, useCopyById } from '../hooks/useCopies';

const conditions: string[] = ['New', 'Good', 'Fair', 'Poor'];

export const CheckInItem: FC = () => {
  const [value, setValue] = useState<string | null>('');
  const [inputValue, setInputValue] = useState('');

  const { data: copies } = useAllCopies();

  const { data: copy } = useCopyById(value || '');

  const [condition, setCondition] = useState('');

  const handle_condition_change = (event: SelectChangeEvent) => {
    setCondition(event.target.value as string);
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
        {'Check In Item'}
      </Typography>
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, sm: 12, md: 6 }}>
          <Autocomplete
            style={{ width: '100%' }}
            value={value}
            onChange={(_: unknown, newValue: string | null) => {
              setValue(newValue || '');
            }}
            inputValue={inputValue}
            onInputChange={(_, newInputValue) => {
              setInputValue(newInputValue);
            }}
            id="copies-lookup-autocomplete"
            options={copies || []}
            sx={{ width: 300 }}
            renderInput={(params) => (
              <TextField {...params} fullWidth label="ID" />
            )}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 6 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">{'Condition'}</InputLabel>
            <Select
              disabled={!copy}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={condition || copy?.condition}
              label="Condition"
              onChange={handle_condition_change}
            >
              {conditions.map((condition) => (
                <MenuItem key={condition} value={condition}>
                  {condition}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid size={{ xs: 12 }}>
          <TextField
            disabled={!copy}
            fullWidth
            label="Notes"
            multiline
            rows={4}
            value={copy?.notes || ''}
          />
        </Grid>
      </Grid>
    </Container>
  );
};
