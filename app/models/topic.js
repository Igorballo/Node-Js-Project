const { Schema, model } = require('mongoose');

const topicSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, 'le champ "title" est obligatoire'],
        },
        subject: {
            type: String,
            required: [true, 'le champ "subject" est obligatoire'],
        },
        status: {
            type: Boolean,
            default: false, 
        }
    },
    { timestamps: true },
);

module.exports = model('topics', topicSchema);
