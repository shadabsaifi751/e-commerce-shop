import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchProducts, fetchCategories } from '../utils/api';

const initialState = {
  products: [],
  categories: [],
  productsLoading: false,
  categoriesLoading: false,
  error: null,
  selectedCategories: [],
  searchQuery: '',
  sidebarSearchQuery: '',
};

export const fetchCategoriesAsync = createAsyncThunk(
  'products/fetchCategories',
  async () => {
    const response = await fetchCategories();
    return response.data; 
  }
);

export const fetchProductsAsync = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await fetchProducts();
    return response.data; 
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSelectedCategories: (state, action) => {
      state.selectedCategories = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setSidebarSearchQuery: (state, action) => {
      state.sidebarSearchQuery = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle products
      .addCase(fetchProductsAsync.pending, (state) => {
        state.productsLoading = true;
        state.error = null;
      })
      .addCase(fetchProductsAsync.fulfilled, (state, action) => {
        state.productsLoading = false;
        state.products = action.payload;
      })
      .addCase(fetchProductsAsync.rejected, (state, action) => {
        state.productsLoading = false;
        state.error = action.error.message || 'Failed to fetch products';
      })
      // Handle categories
      .addCase(fetchCategoriesAsync.pending, (state) => {
        state.categoriesLoading = true;
        state.error = null;
      })
      .addCase(fetchCategoriesAsync.fulfilled, (state, action) => {
        state.categoriesLoading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategoriesAsync.rejected, (state, action) => {
        state.categoriesLoading = false;
        state.error = action.error.message || 'Failed to fetch categories';
      });
  },
});

export const { setSelectedCategories, setSearchQuery, setSidebarSearchQuery } = productsSlice.actions;
export default productsSlice.reducer;