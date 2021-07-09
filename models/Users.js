const { model, Schema } = require("mongoose");
const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    picture: String,
    pushNotifications: Boolean,
    emailNotifications: Boolean
});
module.exports = model('User', userSchema);