import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './productsSlice';
import sidebarReducer from './sidebarSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    sidebar: sidebarReducer, 
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;