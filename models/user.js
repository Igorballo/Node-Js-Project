const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        firstname: {
            type: String,
            required: [true, 'le champ "firstname" est obligatoire'],
        },
        lastname: {
            type: String,
            required: [true, 'le champ "lastname" est obligatoire'],
        },
        age: {
            type: Number,
            required: [true, 'le champ "age" est obligatoire'], 
        },
        email: {
            type: String,
            required: [true, 'le champ "email" est obligatoire'], 
        },
        password: {
            type: String,
            required: [true, 'le champ "password" est obligatoire'], 
        }
    },
    { timestamps: true },
);

module.exports = model('users', userSchema);
