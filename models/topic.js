const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, 'le champ "title" est obligatoire'],
        },
        subject: {
            type: String,
            required: [true, 'le champ "subject" est obligatoire'],
        },
    },
    { timestamps: true },
);

module.exports = model('users', userSchema);
