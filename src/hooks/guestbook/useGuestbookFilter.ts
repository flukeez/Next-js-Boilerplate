import { useDispatch, useSelector } from 'react-redux';

import { resetFilter, setFilter } from '@/stores/guestbook/slice/filterSlice';
import type { AppDispatch, RootState } from '@/stores/guestbook/store';

interface IFilter {
  activePage: number;
}

export const useGuestbookFilter = () => {
  const dispatch = useDispatch<AppDispatch>();
  const filter = useSelector((state: RootState) => state.filter);

  const updateFilter = (newFilter: Partial<IFilter>) => {
    dispatch(setFilter(newFilter));
  };

  const clearFilter = () => {
    dispatch(resetFilter());
  };

  return {
    filter,
    updateFilter,
    clearFilter,
  };
};
