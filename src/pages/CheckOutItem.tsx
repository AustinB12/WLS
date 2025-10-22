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
} from '@mui/material';
import { LibraryAdd } from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import sb from '../utils/supabase';
// import type { Book } from '../types';
import { PatronsDataGrid } from '../components/patrons/PatronsDataGrid';
import type { GridColDef } from '@mui/x-data-grid';
import { BooksDataGrid } from '../components/books/BookDataGrid';

const steps = ['Select Patron', 'Select Book', 'Confirm Details'];

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID' },
  {
    field: 'first_name',
    headerName: 'Name',
    flex: 1,
    valueGetter: (_value, row) => {
      return `${row.first_name[0] || ''}. ${row.last_name || ''}`;
    },
  },
];

// interface CheckOutFormData {
//   patronId: string;
//   bookId: string;
//   dueDate: Date;
// }

export const CheckOutItem: React.FC = () => {
  //   const [formData, setFormData] = useState<CheckOutFormData>({
  //     patronId: '',
  //     bookId: '',
  //     dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // Default 2 weeks from now
  //   });

  //   const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  //   const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set<number>());

  //   const handleCheckOut = useCallback(
  //     async (e: React.FormEvent) => {
  //       e.preventDefault();

  //       if (
  //         !formData.patronId.trim() ||
  //         !formData.bookId.trim() ||
  //         !selectedBook
  //       ) {
  //         setError('Please fill in all required fields and select a valid book');
  //         return;
  //       }

  //       try {
  //         setLoading(true);
  //         setError(null);

  //         // Create transaction record
  //         const transactionData = {
  //           book_id: selectedBook.id,
  //           patron_id: formData.patronId,
  //           transaction_type: 'checkout' as const,
  //           checkout_date: new Date().toISOString(),
  //           due_date: formData.dueDate.toISOString(),
  //           status: 'active' as const,
  //         };

  //         const { error: transactionError } = await sb
  //           .from('transactions')
  //           .insert(transactionData);

  //         if (transactionError) {
  //           setError(
  //             'Failed to create checkout record: ' + transactionError.message
  //           );
  //           return;
  //         }

  //         // Update book availability
  //         const { error: bookUpdateError } = await sb
  //           .from('books')
  //           .update({ available: false })
  //           .eq('id', selectedBook.id);

  //         if (bookUpdateError) {
  //           setError(
  //             'Failed to update book availability: ' + bookUpdateError.message
  //           );
  //           return;
  //         }

  //         setSuccess(
  //           `Successfully checked out "${selectedBook.title}" to patron ${formData.patronId}`
  //         );

  //         // Reset form
  //         setFormData({
  //           patronId: '',
  //           bookId: '',
  //           dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
  //         });
  //         setSelectedBook(null);
  //       } catch (err) {
  //         setError(
  //           err instanceof Error ? err.message : 'An unexpected error occurred'
  //         );
  //       } finally {
  //         setLoading(false);
  //       }
  //     },
  //     [formData, selectedBook]
  //   );

  const handleRetry = useCallback(() => {
    setError(null);
    setSuccess(null);
  }, []);

  //   if (loading) {
  //     return (
  //       <Container maxWidth="lg" sx={{ py: 4, textAlign: 'center' }}>
  //         <Typography>Processing checkout...</Typography>
  //       </Container>
  //     );
  //   }

  //!===

  const isStepOptional = (step: number) => {
    return step === 8881;
  };

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
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

  //!===

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Container
        maxWidth="lg"
        sx={{
          py: 4,
          height: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 0,
        }}
      >
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
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
              }}
            >
              <PatronsDataGrid cols={columns} onError={setError} />
            </Box>
            <Box
              sx={{
                flex: 1,
                display: activeStep === 1 ? 'inherit' : 'none',
                mt: 2,
              }}
            >
              <BooksDataGrid onError={setError} />
            </Box>
            <Box
              sx={{
                flex: 1,
                display: activeStep === 2 ? 'inherit' : 'none',
                mt: 2,
              }}
            >
              <DatePicker label="Due Date" />
              {/* <DatePicker label="Due Date" value={formData.dueDate} /> */}
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
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              {isStepOptional(activeStep) && (
                <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                  Skip
                </Button>
              )}
              <Button onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </Box>
          </>
        )}
      </Container>
    </LocalizationProvider>
  );
};
