import Product from "../models/Product.js";
import { cloudinary } from "../config/cloudinary.js";
import fs from 'fs';

// ✅ Add Product with Multiple Image Upload
export const addProduct = async (req, res) => {
  try {
    const { name, price, description, category, stock } = req.body;

    if (!name || !price || !category) {
      return res.status(400).json({ message: "Please provide all required fields" });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "Please upload at least one image" });
    }

    // Upload each image to Cloudinary
    const uploadPromises = req.files.map(file => 
      cloudinary.v2.uploader.upload(file.path, {
        folder: 'products',
      })
    );

    // Wait for all uploads to complete
    const uploadedImages = await Promise.all(uploadPromises);

    // Clean up temporary files
    req.files.forEach(file => {
      if (fs.existsSync(file.path)) {
        fs.unlinkSync(file.path);
      }
    });

    // Get Cloudinary URLs
    const mainImage = uploadedImages[0].secure_url;
    const additionalImages = uploadedImages.slice(1).map(img => img.secure_url);

    // Create product with Cloudinary URLs
    const newProduct = await Product.create({
      name,
      price: Number(price),
      description,
      category,
      stock: Number(stock),
      imageUrl: mainImage,
      images: additionalImages
    });

    res.status(201).json({ success: true, product: newProduct });
  } catch (error) {
    console.error("❌ Product Error:", error);
    // Clean up any temporary files in case of error
    if (req.files) {
      req.files.forEach(file => {
        if (fs.existsSync(file.path)) {
          fs.unlinkSync(file.path);
        }
      });
    }
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get All Products with Pagination, Search & Filters
export const getAllProducts = async (req, res) => {
  try {
    const { limit = 16, page = 1, search, category, sort } = req.query;

    console.log('Received query params:', { limit, page, search, category, sort });

    // Build query
    const query = {};
    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }
    if (category) {
      query.category = category;
    }

    // Define sort options
    let sortOption = {};
    switch (sort) {
      case 'price_low':
        sortOption = { price: 1 };
        break;
      case 'price_high':
        sortOption = { price: -1 };
        break;
      case 'name_asc':
        sortOption = { name: 1 };
        break;
      case 'name_desc':
        sortOption = { name: -1 };
        break;
      default:
        sortOption = { createdAt: -1 };
    }

    console.log('Applying sort:', sortOption);

    const products = await Product.find(query)
      .collation({ locale: 'en' }) // For case-insensitive sorting
      .sort(sortOption)
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit));

    const total = await Product.countDocuments(query);

    console.log(`Found ${products.length} products`);

    res.status(200).json({
      success: true,
      products,
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit))
    });
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching products',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// ✅ Get Single Product
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found!" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// ✅ Update Product
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, description, category, stock } = req.body;

    let updateData = {
      name,
      price: Number(price),
      description,
      category,
      stock: Number(stock)
    };

    // Handle image update if file is provided
    if (req.file?.path) {
      // Only if path exists and is a local file
      if (req.file.path.startsWith('uploads/')) {
        const result = await cloudinary.v2.uploader.upload(req.file.path);
        updateData.imageUrl = result.secure_url;
        
        // Only unlink if it's a local file
        try {
          fs.unlinkSync(req.file.path);
        } catch (unlinkError) {
          console.log("Warning: Could not unlink file", unlinkError);
        }
      } else {
        // If it's already a Cloudinary URL, use it directly
        updateData.imageUrl = req.file.path;
      }
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found!" });
    }

    res.status(200).json({ 
      message: "Product updated successfully", 
      product: updatedProduct 
    });

  } catch (error) {
    console.log("❌ Update Product Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// ✅ Delete Product
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};



