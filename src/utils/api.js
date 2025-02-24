import axios from "axios";

export const fetchProducts = () => axios.get('https://fakestoreapi.com/products');
export const fetchCategories = () => axios.get('https://fakestoreapi.com/products/categories');