const jwt = require('jsonwebtoken');
const config = require('../config/config');
const Users = require('../model/User');

const auth = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader)
        return res.status(401).send({ error: 'Sem token irmão' });

    const parts = authHeader.split(' ');

    if (!parts.length === 2)
        return res.status(401).send({ error: 'Erro de token' });

    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme))
        return res.status(401).send({ error: 'Token mal formatado' });

    jwt.verify(token, process.env.JWT_PASSWORD_PROD, async (err, decoded) => {
        if (err)
            return res.status(401).send({ error: 'Token inválido' });

        const user = await Users.findOne({ _id: decoded.id });

        if (!user)
            return res.status(404).send({ error: 'Usuário não existe!' });

        // const token_list = user.token_list;
        // if (!token_list.includes(token)) {
        //     return res.status(401).send({ error: 'Token inválido' });
        // }

        req.user = user;
        return next();
    })
}

module.exports = auth;