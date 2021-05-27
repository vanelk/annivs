const { AuthenticationError } = require("apollo-server-express");
const jwt = require("jsonwebtoken");
const User = require("../models/User")
module.exports = async (context, options) => {
    const authHeader = context.req.headers.authorization;
    if (!authHeader) throw new AuthenticationError("Authorization Header not found");
    const token = authHeader.split("Bearer ")[1];
    if (!token) throw new AuthenticationError("Token not provided");
    if(!options)  options = {};
    let user = null;
    try {
        const uid = jwt.verify(token, process.env.access_token_secret);
        user = await User.findById(uid.id);
    } catch (err) {
        throw new AuthenticationError("Invalid token");
    }
    if(!options.user){
        if (!user) throw new AuthenticationError("User not found");
    }
    if(!options.token){
        if (!user.token) throw new AuthenticationError("Insufficient permissions");
    }
    if(!options.spreadsheet){
        if(!user.spreadsheetId) throw new AuthenticationError("Spreadsheet not found");
    }
    return user;

}
