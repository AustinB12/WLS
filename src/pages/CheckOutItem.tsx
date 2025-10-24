import React, { useState, useCallback } from 'react';
import {
  Container,
  Typography,
  Button,
  Box,
  Alert,
  AlertTitle,
  Step,
  StepLabel,
  Stepper,
  Paper,
} from '@mui/material';
import { LibraryAdd } from '@mui/icons-material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { PatronsDataGrid } from '../components/patrons/PatronsDataGrid';
import type { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { CopiesDataGrid } from '../components/copies/CopiesDataGrid';
import { format_date, is_overdue } from '../utils/dateUtils';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

const two_weeks_from_now = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000); // Default 2 weeks from now

const steps = ['Select Patron', 'Select Item', 'Confirm Details'];

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 50 },
  {
    field: 'first_name',
    headerName: 'First Name',
    flex: 1,
  },
  { field: 'last_name', headerName: 'Last Name', flex: 1 },
  {
    field: 'card_expiration_date',
    headerName: 'Card Expiration',
    valueGetter: (value) => {
      if (!value) return;
      return format_date(value);
    },
    flex: 3,
    renderCell: (params: GridRenderCellParams) => (
      <Box
        sx={{
          color: !is_overdue(params.value) ? 'inherit' : 'error.main',
        }}
      >
        {params.value}
      </Box>
    ),
  },
];

interface CheckOutFormData {
  patron_id: string;
  item_id: string;
  due_date: Date;
}

export const CheckOutItem: React.FC = () => {
  const [formData, setFormData] = useState<CheckOutFormData>({
    patron_id: '',
    item_id: '',
    due_date: two_weeks_from_now,
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set<number>());

  const handleRetry = useCallback(() => {
    setError(null);
    setSuccess(null);
  }, []);

  const isStepOptional = (step: number) => {
    return step === 8881;
  };

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handle_next = () => {
    let new_skipped = skipped;
    if (isStepSkipped(activeStep)) {
      new_skipped = new Set(new_skipped.values());
      new_skipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(new_skipped);
  };

  const handle_back = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handle_skip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const is_next_disabled = () => {
    if (activeStep === 0 && !formData.patron_id) return true;

    if (activeStep === 1 && !formData.item_id) return true;

    if (activeStep === 2 && !formData.due_date) return true;
    return false;
  };

  const handle_patron_selected = (patron_id: string) => {
    setFormData((prev) => ({ ...prev, patron_id: patron_id }));
  };

  const handle_copy_selected = (copy_id: string) => {
    setFormData((prev) => ({ ...prev, item_id: copy_id }));
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Container
        maxWidth="lg"
        sx={{
          py: 2,
          height: 1,
          maxHeight: 1,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          gap: 0,
        }}
      >
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          title={formData.patron_id + ' - ' + formData.item_id}
          sx={{
            fontWeight: 'bold',
            mb: 4,
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
          }}
        >
          <LibraryAdd color="primary" fontSize="large" />
          Check Out Item
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            <AlertTitle>Check-out Error</AlertTitle>
            {error}
            <Button
              size="small"
              onClick={handleRetry}
              sx={{ mt: 1, display: 'block' }}
            >
              Try Again
            </Button>
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ mb: 3 }}>
            <AlertTitle>Success!</AlertTitle>
            {success}
          </Alert>
        )}

        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps: { completed?: boolean } = {};
            const labelProps: {
              optional?: React.ReactNode;
            } = {};
            if (isStepOptional(index)) {
              labelProps.optional = (
                <Typography variant="caption">Optional</Typography>
              );
            }
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === steps.length ? (
          <>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </>
        ) : (
          <>
            {/* <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography> */}
            <Box
              sx={{
                flex: 1,
                display: activeStep === 0 ? 'inherit' : 'none',
                mt: 2,
                overflow: 'hidden',
              }}
            >
              <PatronsDataGrid
                cols={columns}
                onError={setError}
                onPatronSelected={handle_patron_selected}
                check_overdue={true}
              />
            </Box>
            <Box
              sx={{
                flex: 1,
                display: activeStep === 1 ? 'inherit' : 'none',
                mt: 2,
                overflow: 'hidden',
              }}
            >
              <CopiesDataGrid on_copy_selected={handle_copy_selected} />
            </Box>
            <Box
              sx={{
                flex: 1,
                display: activeStep === 2 ? 'inherit' : 'none',
                mt: 2,
              }}
            >
              <Paper
                elevation={4}
                sx={{
                  height: 'min-content',
                  mx: 'auto',
                  mt: 2,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ p: 2, pb: 0 }}
                  color="text.secondary"
                  fontSize={{ xs: '0.9rem', sm: '1rem', md: '1.2rem' }}
                >
                  Select Due Date
                </Typography>
                <DateCalendar
                  value={formData.due_date}
                  onChange={(new_value) =>
                    setFormData((prev) => ({
                      ...prev,
                      due_date: new_value || two_weeks_from_now,
                    }))
                  }
                />
              </Paper>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                pt: 2,
              }}
            >
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handle_back}
                sx={{ mr: 1 }}
                variant="outlined"
              >
                Back
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              {isStepOptional(activeStep) && (
                <Button color="inherit" onClick={handle_skip} sx={{ mr: 1 }}>
                  Skip
                </Button>
              )}
              <Button
                variant="outlined"
                onClick={handle_next}
                disabled={is_next_disabled()}
              >
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </Box>
          </>
        )}
      </Container>
    </LocalizationProvider>
  );
};
