import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { dataService } from '../services/dataService';

export const useReservations = () => {
  return useQuery({
    queryKey: ['reservations'],
    queryFn: () => dataService.getAllReservations(),
  });
};

export const useReserveBook = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: dataService.reserveBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reservations'] });
    },
  });
};

export const useCancelReservation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: dataService.cancelReservation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reservations'] });
    },
  });
};
