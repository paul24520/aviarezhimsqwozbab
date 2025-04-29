import { configureStore } from '@reduxjs/toolkit';
import filterReducer from '../reducers/filtersReducer';

export const store = configureStore({
    reducer: {
      filters: filterReducer,
      
    },
  });

