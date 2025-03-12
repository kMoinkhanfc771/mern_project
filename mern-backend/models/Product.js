import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter product name'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Please enter product description']
    },
    price: {
        type: Number,
        required: [true, 'Please enter product price'],
        min: 0
    },
    images: [String],
    category: {
        type: String,
        required: [true, 'Please enter product category']
    },
    stock: {
        type: Number,
        required: [true, 'Please enter product stock'],
        min: 0,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('Product', productSchema);
