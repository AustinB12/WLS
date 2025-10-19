import { Link } from 'react-router-dom';
import {
  AppBar,
  Box,
  InputLabel,
  IconButton,
  FormControl,
  MenuItem,
  Select,
  Skeleton,
  Toolbar,
  Typography,
  type SelectChangeEvent,
  useMediaQuery,
  useTheme,
  Stack,
} from '@mui/material';
import { Menu } from '@mui/icons-material';
import sb from '../../utils/supabase';
import { useState, useEffect } from 'react';
import type { Branch } from '../../types';
import { LightDarkToggle } from './lightDarkToggle';

export const Header = ({
  sidebarOpen,
  setSidebarOpen,
}: {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}) => {
  const theme = useTheme();
  const xsUp = useMediaQuery(theme.breakpoints.up('sm'));

  const [selectedBranchId, setSelectedBranchId] = useState<string>('');
  const [branches, setBranches] = useState<Branch[]>([]);
  const [loading, setLoading] = useState(true);

  const getBranches = async () => {
    try {
      setLoading(true);
      const { data, error } = await sb
        .from('branches')
        .select('id, branchName, isMain');
      if (error) {
        // setError(error.message);
        return;
      }

      if (data) {
        setBranches(
          data.map(
            (branch) =>
              ({
                id: branch.id,
                branchName: branch.branchName,
                isMain: branch.isMain,
              }) as Branch
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
    getBranches();
  }, []);

  useEffect(() => {
    if (branches && branches.length > 0 && !selectedBranchId) {
      setSelectedBranchId(
        branches.find((branch) => branch.isMain)?.id.toString() ||
          branches[0].id.toString()
      );
    }
  }, [branches, selectedBranchId]);

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedBranchId(event.target.value);
  };

  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar
        sx={{
          mx: 'auto',
          width: '100%',
          px: { xs: 1, sm: 2, lg: 3 },
          height: '64px',
        }}
      >
        <Stack
          sx={{ flexGrow: 1, alignItems: 'center' }}
          direction="row"
          spacing={1}
        >
          {!xsUp && (
            <IconButton onClick={() => setSidebarOpen(!sidebarOpen)}>
              <Menu />
            </IconButton>
          )}
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              textDecoration: 'none',
              fontWeight: 600,
            }}
          >
            {xsUp ? 'Wayback Public Library' : 'WPL'}
          </Typography>
        </Stack>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {loading ? (
            <Skeleton
              variant="rectangular"
              sx={{ width: { xs: 150, sm: 175, md: 'calc(5rem + 100px)' } }}
            />
          ) : (
            <Box sx={{ width: { xs: 150, sm: 175, md: 'calc(5rem + 100px)' } }}>
              <FormControl fullWidth size="small">
                <InputLabel id="branch-select-label">Branch</InputLabel>
                <Select
                  size="small"
                  label="Branch"
                  labelId="branch-select-label"
                  id="branch-select"
                  value={selectedBranchId}
                  onChange={handleChange}
                >
                  {branches &&
                    branches.map((branch) => (
                      <MenuItem key={branch.id} value={branch.id.toString()}>
                        {branch.branchName}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Box>
          )}
          <LightDarkToggle />
        </Box>
      </Toolbar>
    </AppBar>
  );
};
