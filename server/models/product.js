import mongoose from 'mongoose';

const ProductSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        single: { type: String },
        case: { type: String }
    },
    category: { type: String },
    image: {type: String },
    supplier: { type: String }
});

module.exports = mongoose.model('Product', ProductSchema)