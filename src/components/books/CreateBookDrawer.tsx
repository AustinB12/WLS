import { useState, type FC } from 'react';
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  TextField,
  Button,
  Stack,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Divider,
  Alert,
  Chip,
} from '@mui/material';
import {
  Close as CloseIcon,
  Save as SaveIcon,
  Clear as ClearIcon,
} from '@mui/icons-material';
import { Genre, type BookFormData } from '../../types';

export interface BookFormErrors {
  title: string;
  author: string;
  publisher: string;
  cost: string;
  libraryOfCongressCode?: string;
  yearPublished?: string;
  genre?: Genre;
  description?: string;
}

interface CreateBookDrawerProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (bookData: BookFormData) => void;
}

const CreateBookDrawer: FC<CreateBookDrawerProps> = ({
  open,
  onClose,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<BookFormData>({
    title: '',
    author: '',
    publisher: '',
    cost: 0,
    libraryOfCongressCode: '',
    yearPublished: '2000',
    description: '',
  });

  const [errors, setErrors] = useState<Partial<BookFormErrors>>({});
  const [submitError, setSubmitError] = useState<string>('');

  const validateForm = (): boolean => {
    const newErrors: Partial<BookFormErrors> = {};

    // Required fields validation
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    if (!formData.author.trim()) {
      newErrors.author = 'Author is required';
    }
    if (!formData.publisher.trim()) {
      newErrors.publisher = 'Publisher is required';
    }
    if (!formData.cost) {
      newErrors.cost = 'Cost is required';
    } else if (isNaN(Number(formData.cost)) || Number(formData.cost) < 0) {
      newErrors.cost = 'Cost must be a valid positive number';
    }

    // Optional field validations
    if (
      formData.yearPublished &&
      (isNaN(Number(formData.yearPublished)) ||
        Number(formData.yearPublished) < 1000 ||
        Number(formData.yearPublished) > new Date().getFullYear() + 1)
    ) {
      newErrors.yearPublished = 'Published year must be a valid year';
    }

    if (
      formData.libraryOfCongressCode &&
      formData.libraryOfCongressCode.length > 0 &&
      formData.libraryOfCongressCode.length < 10
    ) {
      newErrors.libraryOfCongressCode =
        'Library of Congress Code should be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    field: keyof BookFormData,
    value: string | number | Genre[]
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: undefined,
      }));
    }

    // Clear submit error
    if (submitError) {
      setSubmitError('');
    }
  };

  const handleSubmit = () => {
    if (validateForm()) {
      try {
        onSubmit(formData);
        handleClear();
      } catch {
        setSubmitError('Failed to create book. Please try again.');
      }
    }
  };

  const handleClear = () => {
    setFormData({
      title: '',
      author: '',
      publisher: '',
      cost: 0,
      libraryOfCongressCode: '',
      yearPublished: '',
      description: '',
    });
    setErrors({});
    setSubmitError('');
  };

  const handleClose = () => {
    handleClear();
    onClose();
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={handleClose}
      slotProps={{
        paper: {
          sx: {
            width: { xs: '100%', sm: '85%' },
            maxWidth: '1200px',
          },
        },
      }}
    >
      <Stack
        sx={{
          height: '100%',
        }}
      >
        {/* Header */}
        <Box
          sx={{
            p: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: 1,
            borderColor: 'divider',
            bgcolor: 'primary.main',
          }}
        >
          <Typography variant="h6" component="h2" sx={{ fontWeight: 600 }}>
            Add New Book
          </Typography>
          <IconButton onClick={handleClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Content */}
        <Box sx={{ flex: 1, p: 3, overflow: 'auto' }}>
          {submitError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {submitError}
            </Alert>
          )}

          <Stack spacing={3}>
            {/* Required Fields */}
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 600, color: 'primary.main' }}
            >
              Required Information
            </Typography>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField
                label="Title"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                error={!!errors.title}
                helperText={errors.title}
                fullWidth
                required
                variant="outlined"
              />

              <TextField
                label="Author"
                value={formData.author}
                onChange={(e) => handleInputChange('author', e.target.value)}
                error={!!errors.author}
                helperText={errors.author}
                fullWidth
                required
                variant="outlined"
              />
            </Stack>

            <TextField
              label="Publisher"
              value={formData.publisher}
              onChange={(e) => handleInputChange('publisher', e.target.value)}
              error={!!errors.publisher}
              helperText={errors.publisher}
              fullWidth
              required
              variant="outlined"
            />

            <TextField
              label="Cost"
              type="number"
              value={formData.cost}
              onChange={(e) =>
                handleInputChange('cost', Number(e.target.value))
              }
              error={!!errors.cost}
              helperText={errors.cost}
              fullWidth
              required
              variant="outlined"
              slotProps={{
                input: {
                  startAdornment: <Typography sx={{ mr: 1 }}>$</Typography>,
                },
              }}
            />

            <Divider />

            {/* Optional Fields */}
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 600, color: 'primary.main' }}
            >
              Additional Information (Optional)
            </Typography>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField
                label="Library of Congress Code"
                value={formData.libraryOfCongressCode}
                onChange={(e) =>
                  handleInputChange('libraryOfCongressCode', e.target.value)
                }
                error={!!errors.libraryOfCongressCode}
                helperText={errors.libraryOfCongressCode}
                fullWidth
                variant="outlined"
              />

              <TextField
                label="Published Year"
                type="number"
                value={formData.yearPublished}
                onChange={(e) =>
                  handleInputChange('yearPublished', Number(e.target.value))
                }
                error={!!errors.yearPublished}
                helperText={errors.yearPublished}
                fullWidth
                variant="outlined"
              />
            </Stack>

            <FormControl fullWidth variant="outlined">
              <InputLabel>Genre</InputLabel>
              <Select
                multiple
                value={formData.genre || []}
                onChange={(e) => handleInputChange('genre', e.target.value)}
                label="Genre"
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
              >
                {Object.values(Genre).map((genre) => (
                  <MenuItem key={genre} value={genre}>
                    {genre}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              label="Description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              fullWidth
              multiline
              rows={4}
              variant="outlined"
              placeholder="Brief description of the book..."
            />
          </Stack>
        </Box>

        {/* Footer */}
        <Box
          sx={{
            p: 2,
            borderTop: 1,
            borderColor: 'divider',
          }}
        >
          <Stack direction="row" spacing={2}>
            <Button
              variant="outlined"
              startIcon={<ClearIcon />}
              onClick={handleClear}
              fullWidth
            >
              Clear Form
            </Button>
            <Button
              variant="contained"
              startIcon={<SaveIcon />}
              onClick={handleSubmit}
              fullWidth
            >
              Add Book
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Drawer>
  );
};

export default CreateBookDrawer;
