// ...existing imports...

export const addProduct = createAsyncThunk(
  'products/add',
  async (productData, { rejectWithValue }) => {
    try {
      const adminToken = localStorage.getItem('adminToken');
      if (!adminToken) {
        throw new Error('Admin authentication required');
      }

      const formData = new FormData();
      
      // Append text data
      Object.keys(productData).forEach(key => {
        if (key !== 'image') {
          formData.append(key, productData[key]);
        }
      });

      // Append image file
      if (productData.image) {
        formData.append('image', productData.image);
      }

      const response = await axios.post(
        `${API_URL}/products/create`,
        formData,
        {
          headers: {
            'Authorization': `Bearer ${adminToken}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      return response.data;
    } catch (error) {
      console.error('Add product error:', error);
      return rejectWithValue(
        error.response?.data?.message || 
        'Failed to add product'
      );
    }
  }
);

// ...rest of existing code...
