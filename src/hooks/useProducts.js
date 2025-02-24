import { useSelector, useDispatch } from 'react-redux';
import { fetchProductsAsync, fetchCategoriesAsync, setSelectedCategories, setSearchQuery, setSidebarSearchQuery } from '../redux/productsSlice';
import { useCallback } from 'react';

export const useProducts = () => {
  const dispatch = useDispatch();
  const { products, categories, productsLoading, categoriesLoading, error, selectedCategories, searchQuery, sidebarSearchQuery } = useSelector((state) => state.products);

  const loadData = useCallback(async () => {
    try {
      await dispatch(fetchProductsAsync());
      await dispatch(fetchCategoriesAsync());
    } catch (err) {
      console.error('Error loading data:', err);
    }
  }, [dispatch]);

  const filterProductsByCategories = useCallback((category, isChecked) => {
    const newSelectedCategories = isChecked
      ? [...selectedCategories, category]
      : selectedCategories.filter((cat) => cat !== category);
    dispatch(setSelectedCategories(newSelectedCategories));
  }, [dispatch, selectedCategories]);

  const setSearch = useCallback((query) => {
    dispatch(setSearchQuery(query));
  }, [dispatch]);

  const setSidebarSearch = useCallback((query) => {
    dispatch(setSidebarSearchQuery(query));
  }, [dispatch]);

  // Filter products by multiple categories, main search query, and sidebar search query
  const filteredProducts = products.filter((product) => {
    const matchesCategories = selectedCategories.length === 0 || selectedCategories.includes(product.category);
    const matchesMainSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSidebarSearch = product.title.toLowerCase().includes(sidebarSearchQuery.toLowerCase());
    return matchesCategories && matchesMainSearch && matchesSidebarSearch;
  });

  return { products: filteredProducts, categories, loading: productsLoading || categoriesLoading, error, selectedCategories, searchQuery, sidebarSearchQuery, loadData, filterProductsByCategories, setSearch, setSidebarSearch };
};