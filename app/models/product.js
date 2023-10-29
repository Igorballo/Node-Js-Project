const { Schema, model } = require('mongoose');

const productSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        inStock: {
            type: Boolean,
            default: false,
        },
        price: {
            type: Number,
            required: true,
        }
    },
    { timestamps: true },
);

module.exports = model('products', productSchema);
