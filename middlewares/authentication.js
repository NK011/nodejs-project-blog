const { validateToken } = require("../utils/jwtAuthentication");

function checkForUserCookie(token) {
    return (req, res, next) => {
        const userToken = req.cookies[token];

        if (!userToken) {
            return next();
        }

        try {
            const userPayload = validateToken(userToken);
            req.user = userPayload;
        } catch (err) {}
        next();
    };
}

module.exports = {
    checkForUserCookie,
};
