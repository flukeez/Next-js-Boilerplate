import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { storeKeys } from '@/stores/storeKeys';

interface IFilter {
  activePage: number;
  locale: string;
}

const initialState: IFilter = {
  activePage: 1,
  locale: 'en',
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<Partial<IFilter>>) => {
      return { ...state, ...action.payload };
    },
    resetFilter: (state) => {
      return { ...initialState };
    },
    setLocale: (state, action: PayloadAction<string>) => {
      return { ...state, locale: action.payload };
    },
  },
});

export const { setFilter, resetFilter, setLocale } = filterSlice.actions;

const persistConfig = {
  key: storeKeys.guestbook,
  storage,
  version: storeKeys.version,
};

const persistedReducer = persistReducer(persistConfig, filterSlice.reducer);

export default persistedReducer;
