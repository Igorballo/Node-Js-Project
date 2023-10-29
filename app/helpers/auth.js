const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const auth = require('../../config/app')


module.exports = {
    generateAuthToken(user){
        const payload = {
            userId: user._id,
            email: user.email
        }
        const token = jwt.sign( payload, auth.jwt.jwt_secret , { expiresIn: auth.jwt.jwt_expiresin });
        return token
    },
    generateRandomPassword(length) {
        const buffer = crypto.randomBytes(length / 2); // Divide by 2 since each byte generates 2 hex characters
        return buffer.toString('hex');
    }
}
