import { useQuery } from '@tanstack/react-query';
import { dataService } from '../services/dataService';
import type { Item_Copy } from '../types';

export const useCopies = (item_id: string) => {
  return useQuery({
    queryKey: ['item_copies', item_id],
    queryFn: () => dataService.get_all_copies_by_item_id(item_id),
    enabled: !!item_id,
  });
};

export const useAllCopyIds = () => {
  return useQuery({
    queryKey: ['all_item_copy_ids'],
    queryFn: () => dataService.get_all_copy_ids(),
  });
};

export const useAllCopies = () => {
  return useQuery({
    queryKey: ['all_item_copies'],
    queryFn: (): Promise<Item_Copy[]> => dataService.get_all_copies(),
  });
};

export const useCopyById = (copy_id: string) => {
  return useQuery({
    queryKey: ['item_copy', copy_id],
    queryFn: () => dataService.get_copy_by_id(copy_id),
    enabled: !!copy_id,
  });
};
