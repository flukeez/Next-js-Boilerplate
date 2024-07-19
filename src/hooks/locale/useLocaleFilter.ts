import { useDispatch, useSelector } from 'react-redux';

import { setLocale } from '@/stores/guestbook/slice/filterSlice';
import type { AppDispatch, RootState } from '@/stores/store';

interface IFilter {
  locale: string;
}
export const useLocaleFilter = () => {
  const dispatch = useDispatch<AppDispatch>();
  const locale = useSelector((state: RootState) => state.filter);

  const updateLocale = (newLocale: Partial<IFilter>) => {
    dispatch(setLocale(newLocale));
  };

  return {
    locale,
    updateLocale,
  };
};
