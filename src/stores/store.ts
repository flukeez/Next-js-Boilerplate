import { configureStore } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';

import persistedReducer from './guestbook/slice/filterSlice';

export const store = configureStore({
  reducer: {
    filter: persistedReducer,
  },
});

export const persistor = persistStore(store);

export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
