var jwt = require('jsonwebtoken');
var jwtSecret = sails.config.settings.jwtSecret;
var tokenExpiryInMinutes = sails.config.settings.tokenExpiryInMinutes;

module.exports = {
    issueToken: function (payload, expirytime) {
        var expiry = (expirytime) ? expirytime : tokenExpiryInMinutes;
        var token = jwt.sign(payload, process.env.TOKEN_SECRET || jwtSecret, {
            expiresIn: expiry * 60
        });
        return token;
    },

    verifyToken: function (token, cb) {
        return jwt.verify(token, process.env.TOKEN_SECRET || jwtSecret, {}, cb);
    }
}
