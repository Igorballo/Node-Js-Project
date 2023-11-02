require('dotenv').config();
// mongodb.js
module.exports = {
    app: {
        port: process.env.APP_PORT || 5000,
        env: process.env.APP_ENV || 'development',
        app_name: process.env.APP_NAME || 'HfxApp',
        host_name: process.env.HOST_NAME || '127.0.0.1',
    },
    db: {
        mongodb: {
            uri: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/',
        },
    },

    jwt: {
        jwt_secret: process.env.JWT_SECRET,
        jwt_expiresin: process.env.JWT_EXPIRES_IN || '1d',
        saltRounds: process.env.SALT_ROUND || 10,
        refresh_token_secret: process.env.REFRESH_TOKEN_SECRET || 'VmVyeVBvd2VyZnVsbFNlY3JldA==',
        refresh_token_expiresin: process.env.REFRESH_TOKEN_EXPIRES_IN || '2d',
    },
    sendmail: {
        from_email: process.env.MAIL_ADDRESS,
        from_email_name: process.env.MAIL_NAME,
        from_email_username: process.env.MAIL_USERNAME,
        from_email_password: process.env.MAIL_PASSWORD,
    },

};
