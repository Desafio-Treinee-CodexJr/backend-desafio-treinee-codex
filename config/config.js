const env = process.env.NODE_ENV || 'dev';

const config = () => {
    switch (env) {
        case 'dev':
        return {
            bd_string: 'mongodb+srv://gutocz:qdLWpvhGJ21z2COJ@cluster0.ibkdcv8.mongodb.net/?retryWrites=true&w=majority',
            jwt_pass: 'senha',
            jwt_expires_in: '7d'
        }

        case 'hml':
        return {
            bd_string: 'mongodb+srv://gutocz:qdLWpvhGJ21z2COJ@cluster0.ibkdcv8.mongodb.net/?retryWrites=true&w=majority',
            jwt_pass: 'senha',
            jwt_expires_in: '7d'
        }

        case 'prod':
        return {
            bd_string: 'mongodb+srv://gutocz:qdLWpvhGJ21z2COJ@cluster0.ibkdcv8.mongodb.net/?retryWrites=true&w=majority',
            jwt_pass: '89832749&@#*&shjdfgbjds',
            jwt_expires_in: '7d'
        }
    }
}

console.log(`Iniciando a API em ambiente ${env.toUpperCase()}`);

module.exports = config();