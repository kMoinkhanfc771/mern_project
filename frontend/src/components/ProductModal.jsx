import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from 'react-redux';
import axios from "axios";
import { addToCart } from '../redux/slices/cartSlice';


const ProductModal = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [product, setProduct] = useState(null);
    const [selectedImage, setSelectedImage] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/products/${id}`);
                setProduct(response.data);
                setSelectedImage(response.data.imageUrl || response.data.images?.[0]);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchProduct();
    }, [id]);

    const handleAddToCart = () => {
        if (!product) return;
    
        try {
            dispatch(addToCart({
                product: {
                    _id: product._id,
                    name: product.name,
                    price: product.price,
                    imageUrl: product.imageUrl || product.images?.[0]
                },
                quantity
            }));
            // Show success message or notification here
        } catch (error) {
            console.error('Failed to add to cart:', error);
        }
    };

    // Add these quantity handler functions
    const increaseQuantity = () => {
        setQuantity(prev => prev + 1);
    };

    const decreaseQuantity = () => {
        setQuantity(prev => prev > 1 ? prev - 1 : 1);
    };

    if (loading) return <div className="text-center py-12">Loading...</div>;
    if (error) return <div className="text-center py-12 text-red-600">Error: {error}</div>;
    if (!product) return <div className="text-center py-12">Product not found</div>;

    // Ensure we have valid images array
    const allImages = [
        product.imageUrl,
        ...(Array.isArray(product.images) ? product.images : [])
    ].filter(Boolean); // Remove any null/undefined values

    return (
        <div >
            <div className="bg-[#f7efe4] p-5 rounded-md flex items-center gap-5 text-gray-600 text-lg">
                <span className="cursor-pointer hover:underline">Home</span>
                <span>&gt;</span>
                <span className="cursor-pointer hover:underline">Shop</span>
                <span>| &gt; {product.name}</span>
            </div>

            <div className="flex gap-10 p-6 rounded-lg">
                {/* Image Gallery */}
                <div className="flex gap-5">
                    <div className="flex flex-col gap-3">
                        {allImages.map((src, index) => (
                            <img 
                                key={index} 
                                src={src} 
                                alt={`${product.name} view ${index + 1}`} 
                                className={`w-24 h-24 cursor-pointer rounded-md object-cover ${
                                    selectedImage === src ? 'border-2 border-blue-500' : ''
                                }`}
                                onClick={() => setSelectedImage(src)}
                            />
                        ))}
                    </div>
                    <div>
                        <img 
                            src={selectedImage} 
                            alt={product.name} 
                            className="w-96 h-[465px] rounded-lg object-cover" 
                        />
                    </div>
                </div>

                {/* Product Details */}
                <div className="max-w-lg flex flex-col gap-4 px-4">
                    <h1 className="text-4xl font-bold">{product.name}</h1>
                    <p className="text-2xl font-bold text-gray-700">Rs. {product.price.toLocaleString()}</p>
                    <div className="flex items-center gap-2 text-yellow-500">
                        <span>⭐️⭐️⭐️⭐️☆</span>
                        <span className="text-gray-600">5 Customer Review</span>
                    </div>
                    

                    <div>
                        <span className="block mb-1 font-semibold">Size:</span>
                        <div className="flex gap-2">
                            {['L', 'XL', 'XS'].map(size => (
                                <button key={size} className="bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300">{size}</button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <span className="block mb-1 font-semibold">Color:</span>
                        <div className="flex gap-3">
                            <div className="w-5 h-5 rounded-full bg-purple-700"></div>
                            <div className="w-5 h-5 rounded-full bg-black"></div>
                            <div className="w-5 h-5 rounded-full bg-yellow-500"></div>
                        </div>
                    </div>

                        <p className="text-gray-600 leading-relaxed">
                            {product.description || "No description available"}
                        </p>
                    
                    <div className="flex gap-4 items-center mt-4">
                        <button className="w-10 h-10 bg-gray-200 rounded-md" onClick={decreaseQuantity}>-</button>
                        <span className="text-xl">{quantity}</span>
                        <button className="w-10 h-10 bg-gray-200 rounded-md" onClick={increaseQuantity}>+</button>
                        <button 
                            onClick={handleAddToCart}
                            className="w-56 h-16 bg-gray-900 text-white text-lg rounded-md">
                            Add To Cart ({quantity})
                        </button>
                        <button className="w-56 h-16 bg-transparent border border-gray-900 text-gray-900 text-lg rounded-md">+ Compare</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductModal;
