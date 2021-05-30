const {model, Schema} = require('mongoose');
const contactSchema = Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    name: {
        type: String,
        required: true,
    },
    birthdate: {
        type: Date,
        required: true
    },
    picture: String
})

module.exports = model('contact', contactSchema);