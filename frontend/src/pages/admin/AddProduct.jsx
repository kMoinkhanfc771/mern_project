import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, clearProductStatus } from '../../redux/slices/productManageSlice';
import { FaCloudUploadAlt, FaBox, FaTag, FaListAlt, FaWarehouse } from 'react-icons/fa';

const AddProduct = () => {
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector(state => state.productManage);

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    stock: '',
    images: []
  });

  // Clear success/error messages after 5 seconds
  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        dispatch(clearProductStatus());
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [success, error, dispatch]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const currentImages = [...formData.images];
    const remainingSlots = 4 - currentImages.length;
    
    if (files.length > remainingSlots) {
      alert(`You can only add ${remainingSlots} more image${remainingSlots !== 1 ? 's' : ''}`);
      return;
    }

    setFormData(prev => ({
      ...prev,
      images: [...currentImages, ...files].slice(0, 4)
    }));

    e.target.value = '';
  };

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const triggerImageUpload = () => {
    if (formData.images.length >= 4) {
      alert('Maximum 4 images allowed');
      return;
    }
    document.getElementById('imageInput').click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.price || !formData.category || !formData.stock) {
      alert('Please fill in all required fields');
      return;
    }

    if (formData.images.length === 0) {
      alert('Please add at least one product image');
      return;
    }

    try {
      const productFormData = new FormData();
      productFormData.append('name', formData.name);
      productFormData.append('price', Number(formData.price));
      productFormData.append('description', formData.description || '');
      productFormData.append('category', formData.category);
      productFormData.append('stock', Number(formData.stock));

      // Append images
      formData.images.forEach(image => {
        productFormData.append('images', image);
      });

      const result = await dispatch(addProduct(productFormData)).unwrap();
      
      if (result.success) {
        setFormData({
          name: '',
          price: '',
          description: '',
          category: '',
          stock: '',
          images: []
        });
      }
    } catch (err) {
      console.error('Add product error:', err);
    }
  };

  const getCategoryIcon = (category) => {
    switch(category) {
      case 'electronics': return '💻';
      case 'clothing': return '👕';
      case 'books': return '📚';
      case 'home': return '🏠';
      default: return '📦';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 py-12 px-4 sm:px-6">
      
      <div className="max-w-4xl mx-auto">
        {/* Header card */}
        <div className="bg-gradient-to-r from-indigo-600 to-blue-500 rounded-t-2xl shadow-xl py-6 px-8">
          <h1 className="text-4xl font-bold text-white">Add New Product</h1>
          <p className="text-indigo-100 mt-2">Fill in the details to add a new product to your inventory</p>
        </div>
        
        {/* Main form card */}
        <div className="bg-white rounded-b-2xl shadow-xl p-8">
          {/* Status messages */}
          {success && (
            <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 text-green-700 font-medium rounded-lg flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
              </svg>
              Product added successfully!
            </div>
          )}
          
          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 font-medium rounded-lg flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
              </svg>
              {error.includes('API endpoint') ? 
                'Server connection error. Please try again later or contact support.' : 
                error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Product name */}
            <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                <FaBox className="text-indigo-600 text-2xl mr-3" />
                <h2 className="text-xl font-semibold text-gray-800">Product Information</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Product Name *</label>
                  <input 
                    type="text" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleInputChange} 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all" 
                    placeholder="Enter product name"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Product Description</label>
                  <textarea 
                    name="description" 
                    value={formData.description} 
                    onChange={handleInputChange} 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all" 
                    placeholder="Describe your product (optional)"
                    rows="3"
                  />
                </div>
              </div>
            </div>
            
            {/* Product details */}
            <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                <FaTag className="text-indigo-600 text-2xl mr-3" />
                <h2 className="text-xl font-semibold text-gray-800">Product Details</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Price (Rs.) *</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500">₹</span>
                    </div>
                    <input 
                      type="number" 
                      name="price" 
                      value={formData.price} 
                      onChange={handleInputChange} 
                      className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all" 
                      placeholder="0.00"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Stock *</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaWarehouse className="text-gray-500" />
                    </div>
                    <input 
                      type="number" 
                      name="stock" 
                      value={formData.stock} 
                      onChange={handleInputChange} 
                      className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all" 
                      placeholder="Enter stock quantity"
                    />
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <label className="block text-gray-700 font-medium mb-2">Category *</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaListAlt className="text-gray-500" />
                  </div>
                  <select 
                    name="category" 
                    value={formData.category} 
                    onChange={handleInputChange} 
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all appearance-none"
                  >
                    <option value="">Select a category</option>
                    <option value="electronics">💻 Electronics</option>
                    <option value="clothing">👕 Clothing</option>
                    <option value="books">📚 Books</option>
                    <option value="home">🏠 Home & Living</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Product images */}
            <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                <FaCloudUploadAlt className="text-indigo-600 text-2xl mr-3" />
                <h2 className="text-xl font-semibold text-gray-800">Product Images</h2>
                <span className="ml-2 bg-indigo-100 text-indigo-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                  {formData.images.length}/4
                </span>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[...Array(4)].map((_, index) => (
                  <div 
                    key={index} 
                    onClick={formData.images[index] ? undefined : triggerImageUpload} 
                    className={`relative border-2 ${formData.images[index] ? 'border-indigo-300' : 'border-dashed border-gray-300'} rounded-xl overflow-hidden h-36 transition-all ${formData.images[index] ? '' : 'hover:border-indigo-500 hover:bg-indigo-50 cursor-pointer'}`}
                  >
                    {formData.images[index] ? (
                      <>
                        <img 
                          src={URL.createObjectURL(formData.images[index])} 
                          alt={`Preview ${index + 1}`} 
                          className="h-full w-full object-cover" 
                        />
                        <button 
                          type="button" 
                          onClick={(e) => { e.stopPropagation(); removeImage(index); }} 
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                        >
                          ×
                        </button>
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                          <span className="text-xs text-white font-medium">Image {index + 1}</span>
                        </div>
                      </>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full p-4">
                        <FaCloudUploadAlt className="text-3xl text-gray-400 mb-2 group-hover:text-indigo-500" />
                        <span className="text-sm text-gray-500 text-center">Upload Image {index + 1}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              <input 
                id="imageInput" 
                type="file" 
                accept="image/*" 
                onChange={handleImageChange} 
                className="hidden" 
                multiple 
              />
              
              <p className="mt-4 text-sm text-gray-500">
                Click on empty boxes to upload images. You can upload up to 4 product images.
              </p>
            </div>
            
            {/* Submission */}
            <div className="flex justify-end pt-4">
              <button 
                type="button" 
                onClick={() => setFormData({
                  name: '',
                  price: '',
                  description: '',
                  category: '',
                  stock: '',
                  images: []
                })}
                className="mr-4 px-6 py-3 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
              >
                Clear Form
              </button>
              
              <button 
                type="submit" 
                disabled={loading} 
                className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-700 hover:to-blue-600 rounded-lg text-white font-semibold shadow-lg transition-all disabled:opacity-70 disabled:cursor-not-allowed transform hover:-translate-y-1 active:translate-y-0 duration-150"
              >
                {loading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Adding Product...
                  </span>
                ) : 'Add Product'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;