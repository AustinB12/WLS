import { useQuery } from '@tanstack/react-query';
import { dataService } from '../services/dataService';

export const useCopies = (item_id: string) => {
  return useQuery({
    queryKey: ['item_copies', item_id],
    queryFn: () => dataService.get_all_copies_by_item_id(item_id),
    enabled: !!item_id,
  });
};
