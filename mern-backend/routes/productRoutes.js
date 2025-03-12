import express from "express";
import { addProduct, getAllProducts, getProductById, updateProduct, deleteProduct } from "../controllers/productController.js";
import { upload } from "../config/cloudinary.js";

const router = express.Router();

// Public routes
router.get("/", getAllProducts);
router.get("/:id", getProductById);

// Use multer middleware for multiple file uploads
router.post("/add", upload.array('images', 4), addProduct); // Allows up to 5 images per upload
router.put("/update/:id", upload.single('image'), updateProduct);
router.delete("/delete/:id", deleteProduct);

export default router;
