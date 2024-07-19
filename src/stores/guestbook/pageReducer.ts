import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import { storeKeys } from '../storeKeys';

interface PageState {
  currentPage: number;
}

const initialState: PageState = {
  currentPage: parseInt(localStorage.getItem(storeKeys.guestbook) || '1', 10),
};

const pageSlice = createSlice({
  name: 'page',
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      localStorage.setItem(storeKeys.guestbook, action.payload.toString());
    },
  },
});

export const { setPage } = pageSlice.actions;
export default pageSlice.reducer;
