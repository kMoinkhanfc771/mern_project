import React, { useState, useEffect } from 'react';
import { useProducts } from '../hooks/useProducts';
import { useDispatch, useSelector } from "react-redux";
import bgImage from "../assets/heroimg.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSliders, faTh, faBars } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';
import { addToCart, toggleCart, closeCart } from '../redux/slices/cartSlice'; // Isko sahi file path se import karein

const ShopPage = () => {
  const [filters, setFilters] = useState({
    page: 1,
    limit: 16,
    category: '',
    sort: '',
    search: ''
  });

  const { products, loading, error, pagination, fetchProducts } = useProducts();

  useEffect(() => {
    fetchProducts(filters);
  }, [filters]);

  const handleLimitChange = (e) => {
    const newLimit = Number(e.target.value);
    setFilters(prev => ({
      ...prev,
      limit: newLimit,
      page: 1
    }));
  };

  const handleSortChange = (e) => {
    const sortValue = e.target.value;
    const sortMapping = {
      'price_asc': 'price_low',
      'price_desc': 'price_high',
      'name_asc': 'name_asc',
      'newest': 'newest',
      '': ''
    };

    setFilters(prev => ({
      ...prev,
      sort: sortMapping[sortValue] || '',
      page: 1
    }));
  };

  const [hovered, setHovered] = useState(null);
  const [viewType, setViewType] = useState('grid'); // 'grid' or 'list'

  // Hooks
  const dispatch = useDispatch();
  const { isCartOpen } = useSelector(state => state.cart);

  // Handler functions

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= (pagination?.totalPages || 1)) {
      setFilters(prev => ({ 
        ...prev, 
        page: newPage
      }));
      window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top on page change
    }
  };

  const handleAddToCart = (e, product) => {
    e.preventDefault(); // Prevent navigation
    try {
      dispatch(addToCart({
        product: {
          _id: product._id,
          name: product.name,
          price: product.price,
          imageUrl: product.imageUrl || product.images?.[0]
        },
        quantity: 1
      }));
      dispatch(toggleCart()); // Open cart sidebar after adding item
      // Show success message or notification here
    } catch (error) {
      console.error('Failed to add to cart:', error);
    }
  };

  // Calculate showing results range
  const startRange = products.length ? (pagination.currentPage - 1) * filters.limit + 1 : 0;
  const endRange = Math.min(pagination.currentPage * filters.limit, pagination.total);

  // Loading and error states
  if (loading) return <div className="text-center py-12">Loading products...</div>;
  if (error) return <div className="text-center py-12 text-red-600">Error: {error}</div>;

  return (
    <div className="bg-[#f9f5f0] font-sans">
      {/* Hero Section */}
      <div
        className="relative text-center h-[330px] flex justify-center items-center"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute w-full h-full bg-white bg-opacity-60 backdrop-blur-md"></div>
        <div className="relative z-10">
          <h1 className="text-4xl font-bold">Shop</h1>
          <p className="text-2xl text-gray-800">
            <strong>Home</strong> &gt; Shop
          </p>
        </div>
      </div>

      {/* Controls Section */}
      <div className="flex flex-wrap items-center justify-between p-5 pl-14 bg-[#f5ede5]">
        {/* Filter Toggle */}
        <button className="flex items-center gap-2 text-lg">
          <FontAwesomeIcon icon={faSliders} /> Filter
        </button>

        {/* View Type Toggle */}
        <div className="flex gap-2">
          <button 
            onClick={() => setViewType('grid')}
            className={`text-2xl ${viewType === 'grid' ? 'text-blue-600' : ''}`}
          >
            <FontAwesomeIcon icon={faTh} className="p-2 rounded bg-white" />
          </button>
          <button 
            onClick={() => setViewType('list')}
            className={`text-2xl ${viewType === 'list' ? 'text-blue-600' : ''}`}
          >
            <FontAwesomeIcon icon={faBars} className="p-2 rounded bg-white" />
          </button>
        </div>

        {/* Results Count */}
        <span className="text-lg">
          {products.length ? (
            `Showing ${startRange}–${endRange} of ${pagination.total} results`
          ) : (
            'No results found'
          )}
        </span>

        {/* Items per page */}
        <div className="flex items-center gap-2">
          <label htmlFor="limit" className="text-lg font-bold">Show</label>
          <select
            id="limit"
            value={filters.limit}
            onChange={handleLimitChange}
            className="p-4 bg-white rounded outline-none cursor-pointer"
          >
            <option value={16}>16</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
          </select>
        </div>

        {/* Sort */}
        <div className="flex items-center gap-2">
          <label htmlFor="sort" className="text-lg font-bold">Sort by</label>
          <select
            id="sort"
            value={filters.sort}
            onChange={handleSortChange}
            className="p-4 bg-white rounded outline-none cursor-pointer"
          >
            <option value="">Default</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="newest">Newest First</option>
            <option value="name_asc">Name (A-Z)</option>
          </select>
        </div>
      </div>

      {/* Updated Products Grid Section */}
      <div className={`container mx-auto px-4 ${
        viewType === 'grid' 
          ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4' 
          : 'flex flex-col'
      } gap-6 py-12`}>
        {products.map(product => (
          <Link 
            to={`/product/${product._id}`} 
            key={product._id}
            className="bg-white p-4 shadow hover:shadow-lg transition-shadow relative group"
          >
            <div className="w-full h-[285px] relative">
              <img 
                src={product.imageUrl || product.images?.[0] || 'https://via.placeholder.com/400'} 
                alt={product.name} 
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/400';
                }}
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-70 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <button 
                  onClick={(e) => handleAddToCart(e, product)}
                  className="bg-white text-black px-6 py-2 rounded-md hover:bg-gray-100 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300"
                >
                  Add to Cart
                </button>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="mt-2 text-xl font-bold">{product.name}</h3>
              <p className="text-gray-600 mt-1 text-lg line-clamp-2">{product.description}</p>
              <p className="font-bold mt-2 text-xl">Rs. {product.price?.toLocaleString()}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Updated Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className="flex justify-center gap-2 my-8">
          <button
            onClick={() => handlePageChange(pagination.currentPage - 1)}
            disabled={pagination.currentPage <= 1}
            className="px-4 py-2 bg-white rounded disabled:opacity-50 hover:bg-gray-100"
          >
            Previous
          </button>
          
          <span className="px-4 py-2 bg-white rounded">
            Page {pagination.currentPage} of {pagination.totalPages}
          </span>
          
          <button
            onClick={() => handlePageChange(pagination.currentPage + 1)}
            disabled={pagination.currentPage >= pagination.totalPages}
            className="px-4 py-2 bg-white rounded disabled:opacity-50 hover:bg-gray-100"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ShopPage;
