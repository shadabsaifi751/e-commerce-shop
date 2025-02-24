import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isNavSidebarOpen: false, // State for navigation sidebar 
  isFilterSidebarOpen: false, // State for filter sidebar 
};

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    setNavSidebarOpen: (state, action) => {
      state.isNavSidebarOpen = action.payload;
    },
    setFilterSidebarOpen: (state, action) => {
      state.isFilterSidebarOpen = action.payload;
    },
  },
});

export const { setNavSidebarOpen, setFilterSidebarOpen } = sidebarSlice.actions;
export default sidebarSlice.reducer;