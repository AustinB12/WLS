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
  Button,
  Chip,
} from '@mui/material';
import { useEffect, useState, type FC } from 'react';
import { type SelectChangeEvent } from '@mui/material/Select';
import { useAllCopyIds, useCopyById } from '../hooks/useCopies';
import { useBranchesContext } from '../hooks/useBranchHooks';
import { get_condition_color } from '../utils/colors';

const conditions: string[] = ['New', 'Excellent', 'Good', 'Fair', 'Poor'];

export const CheckInItem: FC = () => {
  const [value, setValue] = useState<string | null>('');
  const [inputValue, setInputValue] = useState('');
  const [new_note, set_new_note] = useState('');
  const [selected_branch_id, set_selected_branch_id] = useState<string>('');

  const { branches, loading } = useBranchesContext();

  const { data: copies } = useAllCopyIds();

  const { data: copy } = useCopyById(value || '');

  const [condition, set_condition] = useState('');

  const handle_condition_change = (event: SelectChangeEvent) => {
    set_condition(event.target.value as string);
  };

  const handle_notes_change = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (copy) {
      set_new_note(event.target.value);
    }
  };

  const handle_change_branch = (event: SelectChangeEvent) => {
    set_selected_branch_id(event.target.value);
  };

  useEffect(() => {
    if (copy) {
      set_new_note(copy?.notes || '');
      set_condition(copy?.condition || '');
      set_selected_branch_id(copy?.branch_id ? copy.branch_id.toString() : '');
    }
  }, [copy?.notes, copy?.condition, copy?.branch_id, copy]);

  return (
    <Container sx={{ pt: 4, maxWidth: '7xl', height: '100%' }}>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        title={copy?.condition}
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
              title="The condition of the library item"
              disabled={!copy}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={condition || copy?.condition || ''}
              label="Condition"
              onChange={handle_condition_change}
            >
              {conditions.map((c) => (
                <MenuItem key={c} value={c}>
                  <Chip label={c} color={get_condition_color(c)} />
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
            value={new_note}
            onChange={handle_notes_change}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 6 }}>
          <FormControl fullWidth>
            <InputLabel id="branch-select-label">{'New Location?'}</InputLabel>
            <Select
              disabled={!copy || loading}
              label={'New Location?'}
              labelId="branch-select-label"
              id="branch-select"
              value={selected_branch_id}
              onChange={handle_change_branch}
            >
              {branches &&
                branches.map((branch) => (
                  <MenuItem key={branch.id} value={branch.id.toString()}>
                    {branch.branch_name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Button
        size="large"
        onClick={() => alert('Check in item: ' + value)}
        disabled={!value}
        variant="contained"
        sx={(theme) => ({ position: 'absolute', bottom: theme.spacing(4) })}
      >
        {'Check In'}
      </Button>
    </Container>
  );
};
