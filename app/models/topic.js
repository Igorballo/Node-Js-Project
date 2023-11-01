const { Schema, model } = require('mongoose');

const topicSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, 'Le champ "title" est obligatoire'],
            minlength: [5, 'Le champ "title" doit contenir au moins 5 caractères'],
            maxlength: [100, 'Le champ "title" ne peut pas dépasser 100 caractères'],
        },
        subject: {
            type: String,
            required: [true, 'Le champ "subject" est obligatoire'],
            minlength: [10, 'Le champ "subject" doit contenir au moins 10 caractères'],
            maxlength: [200, 'Le champ "subject" ne peut pas dépasser 200 caractères'],
        },
        status: {
            type: Boolean,
            default: false,
            validate: {
                validator: (value) => typeof value === 'boolean',
                message: 'Le champ "status" doit être de type boolean (true ou false)',
            },
        },
    },
    { timestamps: true },
);

module.exports = model('topics', topicSchema);
