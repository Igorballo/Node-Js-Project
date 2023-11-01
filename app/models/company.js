const { Schema, model } = require('mongoose');

const companieSchema = new Schema(
    {
        raison_social: {
            type: String,
            required: true,
        },
        created_year: {
            type: Number,
            required: true,
        },
        employe_count: {
            type: Number,
            default: false,
        },
        email: {
            type: String,
            unique: true,
            required: true,
        },
        status: {
            type: Boolean,
            default: false,
        }
    },
    { timestamps: true },
);

module.exports = model('companies', companieSchema);
