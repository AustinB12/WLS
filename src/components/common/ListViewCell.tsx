import { Avatar, Stack, Typography } from '@mui/material';
import type { Patron } from '../../types';

export function ListViewCell({ patron }: { patron: Patron }) {
  return (
    <Stack
      direction="row"
      sx={{
        alignItems: 'center',
        height: '100%',
        gap: 2,
      }}
    >
      <Avatar sx={{ width: 32, height: 32, backgroundColor: 'teal' }} />
      <Stack sx={{ flexGrow: 1 }}>
        <Typography variant="body2" fontWeight={500}>
          {patron.firstName} {patron.lastName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {patron?.birthday ? `${patron.birthday.toLocaleDateString()}` : ''}
        </Typography>
      </Stack>
      {/* <Stack direction="row" sx={{ gap: 0.5 }}>
        <EditAction {...props} />
        <DeleteAction {...props} />
      </Stack> */}
    </Stack>
  );
}
