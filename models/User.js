const { model, Schema } = require("mongoose");
const userSchema = new Schema({
    email: String,
    token: String,
    spreadsheetId: String
});
module.exports = model('User', userSchema);