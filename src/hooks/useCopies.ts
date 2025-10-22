import { useQuery } from '@tanstack/react-query';
import { dataService } from '../services/dataService';

export const useCopies = (item_id: string) => {
  return useQuery({
    queryKey: ['item_copies', item_id],
    queryFn: () => dataService.get_all_copies_by_item_id(item_id),
    enabled: !!item_id,
  });
};

export const useAllCopies = () => {
  return useQuery({
    queryKey: ['all_item_copies'],
    queryFn: () => dataService.get_all_copy_ids(),
  });
};

export const useCopyById = (copy_id: string) => {
  return useQuery({
    queryKey: ['item_copy', copy_id],
    queryFn: () => dataService.get_copy_by_id(copy_id),
    enabled: !!copy_id,
  });
};
