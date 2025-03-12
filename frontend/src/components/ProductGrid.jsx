import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/slices/productsSlice";
import { addToCart, toggleCart } from "../redux/slices/cartSlice"; // Add this import
import { Link } from "react-router-dom";

const ProductGrid = () => {
  const dispatch = useDispatch();
  const { items: products, loading, error } = useSelector(state => state.products);
  const [visibleProducts, setVisibleProducts] = useState(12);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) return <div className="text-center py-12">Loading products...</div>;
  if (error) return <div className="text-center py-12 text-red-600">Error: {error}</div>;
  if (!products?.length) return <div className="text-center py-12">No products found</div>;

  console.log('Products:', products); // Debug log
  console.log('Total products:', products.length);
  console.log('Visible products:', visibleProducts);

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
      dispatch(toggleCart()); // Add this line
    } catch (error) {
      console.error('Failed to add to cart:', error);
    }
  };

  const handleSeeMore = () => {
    setVisibleProducts(prev => prev + 16);
  };

  return (
    <div className="py-8">
      <h2 className="text-4xl font-bold text-center mb-8">Our Products</h2>
      <div className="grid grid-cols-1 bg-gray-100 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-12">
        {products.slice(0, visibleProducts).map(product => (
          <Link 
            to={`/product/${product._id}`} 
            key={product._id}
            className="bg-white p-4 shadow hover:shadow-lg transition-shadow relative group"
          >
            <div className="w-full h-[285px] relative">
              <img 
                src={product.imageUrl || product.images?.[0] || '/placeholder-image.png'} 
                alt={product.name} 
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/placeholder-image.png';
                }}
              />
              {/* Overlay with Add to Cart button */}
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

      {products && products.length > visibleProducts && (
        <div className="flex justify-center mt-2 mb-8">
          <button 
            onClick={handleSeeMore}
            className="bg-black text-white px-12 py-4 rounded-md text-xl font-semibold hover:bg-gray-800 transition-colors shadow-lg"
          >
            See More
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
