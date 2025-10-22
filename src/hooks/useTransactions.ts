import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { dataService } from '../services/dataService';

export const useTransactions = () => {
  return useQuery({
    queryKey: ['transactions'],
    queryFn: () => dataService.getAllTransactions(),
  });
};

export const useOverdueTransactions = () => {
  return useQuery({
    queryKey: ['transactions', 'overdue'],
    queryFn: () => dataService.getOverdueTransactions(),
  });
};

// export const useCheckoutBook = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: dataService.checkoutBook,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['books'] });
//       queryClient.invalidateQueries({ queryKey: ['transactions'] });
//     },
//   });
// };

export const useReturnBook = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: dataService.returnBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] });
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
    },
  });
};
