import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Typography,
  Box,
} from '@mui/material';
import type { Item_Copy, Branch } from '../../types';

interface CopiesTableProps {
  copies: Item_Copy[];
  branches: Branch[];
}

export const CopiesTable = ({ copies, branches }: CopiesTableProps) => {
  const getStatusColor = (
    status: string
  ):
    | 'default'
    | 'primary'
    | 'secondary'
    | 'error'
    | 'info'
    | 'success'
    | 'warning' => {
    switch (status) {
      case 'Available':
        return 'success';
      case 'Checked Out':
        return 'warning';
      case 'Reserved':
        return 'info';
      case 'Processing':
        return 'secondary';
      case 'Damaged':
      case 'Lost':
        return 'error';
      default:
        return 'default';
    }
  };

  const getConditionColor = (
    condition?: string
  ):
    | 'default'
    | 'primary'
    | 'secondary'
    | 'error'
    | 'info'
    | 'success'
    | 'warning' => {
    switch (condition) {
      case 'New':
      case 'Good':
      case 'Excellent':
        return 'success';
      case 'Fair':
        return 'primary';
      case 'Poor':
        return 'warning';
      default:
        return 'default';
    }
  };

  const getBranchName = (branchId: number): string => {
    return (
      branches.find((branch) => branch.id === branchId)?.branch_name ||
      'Unknown'
    );
  };

  if (copies.length === 0) {
    return (
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          No copies available
        </Typography>
      </Box>
    );
  }

  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="copies table">
        <TableHead>
          <TableRow>
            <TableCell>Copy ID</TableCell>
            <TableCell>Branch</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Condition</TableCell>
            <TableCell align="right">Cost</TableCell>
            <TableCell>Notes</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {copies.map((copy) => (
            <TableRow
              key={copy.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Typography
                  title={copy.id}
                  variant="body2"
                  sx={{
                    fontFamily: 'monospace',
                    maxWidth: 200,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {copy.id}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2" noWrap>
                  {getBranchName(copy.branch_id)}
                </Typography>
              </TableCell>
              <TableCell>
                <Chip
                  label={copy.status}
                  color={getStatusColor(copy.status)}
                  size="small"
                />
              </TableCell>
              <TableCell>
                {copy.condition ? (
                  <Chip
                    label={copy.condition}
                    color={getConditionColor(copy.condition)}
                    variant="outlined"
                    size="small"
                  />
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    N/A
                  </Typography>
                )}
              </TableCell>
              <TableCell align="right">
                <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                  ${copy.cost.toFixed(2)}
                </Typography>
              </TableCell>
              <TableCell>
                {copy.notes ? (
                  <Typography
                    variant="body2"
                    sx={{
                      maxWidth: 200,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                    title={copy.notes}
                  >
                    {copy.notes}
                  </Typography>
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    No notes
                  </Typography>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
