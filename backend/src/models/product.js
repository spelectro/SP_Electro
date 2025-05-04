import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, enum: ['EV', 'Accessory'], required: true },
  description: { type: String, default: '' },
  detailedDescription: { type: String, default: '' },
  price: { type: Number, required: true },
  availability: { type: Boolean, default: true },
  imageUrl: { type: String, default: '/images/placeholder.jpg' },
}, { timestamps: true });

// Add index on category for faster queries
productSchema.index({ category: 1 });

export const Product = mongoose.model('Product', productSchema);
