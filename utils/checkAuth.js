const { AuthenticationError } = require("apollo-server-express");
const jwt = require("jsonwebtoken");
module.exports = async (context) => {
    const authHeader = context.req.headers.authorization;
    if (!authHeader) throw new AuthenticationError("Authorization Header not found");
    const token = authHeader.split("Bearer ")[1];
    if (!token) throw new AuthenticationError("Token not provided");
    try {
        const uid = jwt.verify(token, process.env.access_token_secret);
        return uid;
    } catch (err) {
        throw new AuthenticationError("Invalid token");
    }

}
