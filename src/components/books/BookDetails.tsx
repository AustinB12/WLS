import { type FC } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Divider,
  Stack,
  Chip,
} from '@mui/material';
import {
  Close as CloseIcon,
  MenuBook as BookIcon,
  Person as AuthorIcon,
  Business as PublisherIcon,
  AttachMoney as CostIcon,
} from '@mui/icons-material';
import type { Book } from '../../types';

interface BookDetailsProps {
  book: Book | null;
  onClose: () => void;
}

const BookDetails: FC<BookDetailsProps> = ({ book, onClose }) => {
  if (!book) return null;

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        minWidth: '50vw',
      }}
    >
      <Stack
        direction="row"
        sx={{
          p: 2,
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >
        <Typography variant="h6" component="h2" sx={{ fontWeight: 600 }}>
          Book Details
        </Typography>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </Stack>

      {/* Content */}
      <Box sx={{ flex: 1, p: 3, overflow: 'auto' }}>
        <Stack spacing={3}>
          {/* Title */}
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <BookIcon sx={{ mr: 1, color: 'primary.main' }} />
              <Typography variant="subtitle2" color="text.secondary">
                Title
              </Typography>
            </Box>
            <Typography variant="h5" sx={{ fontWeight: 500, mb: 1 }}>
              {book.title}
            </Typography>
            {book.available !== undefined && (
              <Chip
                label={book.available ? 'Available' : 'Checked Out'}
                color={book.available ? 'success' : 'error'}
                size="small"
              />
            )}
          </Box>

          <Divider />

          {/* Author */}
          <Box>
            <Stack flexDirection={'row'} sx={{ alignItems: 'center', mb: 1 }}>
              <AuthorIcon sx={{ mr: 1, color: 'primary.main' }} />
              <Typography variant="subtitle2" color="text.secondary">
                Author
              </Typography>
            </Stack>
            <Typography variant="body1">{book.author}</Typography>
          </Box>

          <Divider />

          {/* Publisher */}
          <Box>
            <Stack flexDirection={'row'} sx={{ alignItems: 'center', mb: 1 }}>
              <PublisherIcon sx={{ mr: 1, color: 'primary.main' }} />
              <Typography variant="subtitle2" color="text.secondary">
                Publisher
              </Typography>
            </Stack>
            <Typography variant="body1">{book.publisher}</Typography>
          </Box>

          <Divider />

          {/* Cost */}
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <CostIcon sx={{ mr: 1, color: 'primary.main' }} />
              <Typography variant="subtitle2" color="text.secondary">
                Cost
              </Typography>
            </Box>
            <Typography
              variant="h6"
              sx={{ fontWeight: 500, color: 'success.main' }}
            >
              ${book?.cost.toFixed(2)}
            </Typography>
          </Box>

          {/* Optional fields */}
          {book?.libraryOfCongressCode && (
            <>
              <Divider />
              <Box>
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  sx={{ mb: 1 }}
                >
                  ISBN
                </Typography>
                <Typography variant="body1">
                  {book.libraryOfCongressCode}
                </Typography>
              </Box>
            </>
          )}

          {book.yearPublished && (
            <>
              <Divider />
              <Box>
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  sx={{ mb: 1 }}
                >
                  Published Year
                </Typography>
                <Typography variant="body1">{book.yearPublished}</Typography>
              </Box>
            </>
          )}

          {book.genre && (
            <>
              <Divider />
              <Box>
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  sx={{ mb: 1 }}
                >
                  Genre
                </Typography>
                <Chip label={book.genre} variant="outlined" />
              </Box>
            </>
          )}

          {book.description && (
            <>
              <Divider />
              <Box>
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  sx={{ mb: 1 }}
                >
                  Description
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ lineHeight: 1.6 }}
                >
                  {book.description}
                </Typography>
              </Box>
            </>
          )}
        </Stack>
      </Box>
    </Box>
  );
};

export default BookDetails;
