require('dotenv').config();
// mongodb.js
module.exports = {
    app: {
        port: process.env.APP_PORT || 5000,
        env: process.env.NODE_ENV || 'development',
        app_name: process.env.APP_NAME || 'HfxApp',
        host_name: process.env.HOST_NAME || '127.0.0.1',
    },
    db: {
        mongodb: {
            uri: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/',
        },
    },
    //
    // auth: {
    //     jwt_secret: process.env.JWT_SECRET,
    //     jwt_expiresin: process.env.JWT_EXPIRES_IN || '1d',
    //     saltRounds: process.env.SALT_ROUND || 10,
    //     refresh_token_secret: process.env.REFRESH_TOKEN_SECRET || 'VmVyeVBvd2VyZnVsbFNlY3JldA==',
    //     refresh_token_expiresin: process.env.REFRESH_TOKEN_EXPIRES_IN || '2d', // 2 days
    // },
    // sendgrid: {
    //     api_key: process.env.SEND_GRID_API_KEY,
    //     api_user: process.env.USERNAME,
    //     from_email: process.env.FROM_EMAIL || 'alaa.mezian.mail@gmail.com',
    // },

};
