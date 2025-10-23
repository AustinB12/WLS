import { useQuery } from '@tanstack/react-query';
import { dataService } from '../services/dataService';

export const useAllPatrons = () => {
  return useQuery({
    queryKey: ['all_patrons'],
    queryFn: () => dataService.get_all_patrons(),
  });
};
