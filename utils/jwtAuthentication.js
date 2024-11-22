const JWT = require("jsonwebtoken");
const secretKey = "Nitish11Singh";

function generateToken(user) {
    const payload = {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
    };

    const token = JWT.sign(payload, secretKey);

    return token;
}

function validateToken(token) {
    const isValidToken = JWT.verify(token, secretKey);
    return isValidToken;
}

module.exports = {
    generateToken,
    validateToken,
};
