import { useState } from 'react';
import axios from '../utils/axiosConfig';

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    total: 0
  });

  const fetchProducts = async (filters = {}) => {
    try {
      setLoading(true);
      setError(null);

      console.log('Fetching with filters:', filters);

      const response = await axios.get('/products', {
        params: {
          page: filters.page || 1,
          limit: filters.limit || 16,
          sort: filters.sort || '',
          category: filters.category || '',
          search: filters.search || ''
        }
      });

      console.log('API Response:', response.data);

      if (response.data.success) {
        setProducts(response.data.products);
        setPagination({
          currentPage: response.data.page,
          totalPages: response.data.pages,
          total: response.data.total
        });
      }
    } catch (err) {
      console.error('Failed to fetch products:', err);
      setError(err.message || 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  return { products, loading, error, pagination, fetchProducts };
};
