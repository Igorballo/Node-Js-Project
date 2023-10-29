const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: [true, 'le champ "firstname" est obligatoire'],
        },
        email: {
            type: String,
            unique: true,
            required: [true, 'le champ "email" est obligatoire'],
        },
        telephone: {
            type: String,
        },
        avatar: {
            type: String,
        },
        status: {
            type: Boolean,
            default: 0,
        },
        password: {
            type: String,
            required: [true, 'le champ "password" est obligatoire'],
        }
    },
    { timestamps: true },
);

module.exports = model('users', userSchema);
