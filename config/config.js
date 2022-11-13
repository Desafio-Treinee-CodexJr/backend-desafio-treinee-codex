require('dotenv').config()

const config = () => {
    let env = process.env.NODE_ENV;
    switch (env) {
        case 'dev':
        return {
            bd_string: process.env.URL_DB_DEV,
            jwt_pass: process.env.JWT_PASSWORD_DEV,
            jwt_expires_in: '7d'
        };

        case 'hml':
        return {
            bd_string: process.env.URL_DB_PROD,
            jwt_pass: process.env.JWT_PASSWORD_PROD,
            jwt_expires_in: '7d'
        };

        case 'prod':
        return {
            bd_string: process.env.URL_DB_PROD,
            jwt_pass: process.env.JWT_PASSWORD_PROD,
            jwt_expires_in: '7d'
        };
    };
};

module.exports = config();