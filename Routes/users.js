const express = require('express');
const router = express.Router();
const Users = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const auth = require('../middlewares/auth');

//FUNÇÕES AUXLIARES
const createUserToken = (userId) => {
    return jwt.sign({ id: userId }, config.jwt_pass, { expiresIn: config.jwt_expires_in });
}

router.get('/info', auth, async (req, res) => {
    let _id = req.user.id;
    const users = await Users.findById({ _id: _id });
    return res.send(users); 
});

router.put('/info', auth, async (req, res) => {
    const { name, age, photo } = req.body;

    const _id = req.user.id;
    let user = await Users.findByIdAndUpdate({ _id: _id }, { name, age, photo });
    user = await Users.findById({ _id })
    
    return res.send(user); 
});

router.post('/create', async (req, res) => {
    const { email, password, name, gender, age } = req.body;
    
    if (!email || !password || !name || !gender || !age) return res.status(400).send({ error: 'Dados insuficientes!' });

    try {
        if (await Users.findOne({ email })) return res.status(400).send({ error: 'Usuário já registrado!' });

        const user = await Users.create(req.body);
        user.password = undefined;
        return res.status(201).send({user, token: createUserToken(user.id)});
    }
    catch (err) {
        return res.status(500).send({ error: 'Erro ao buscar usuário!' });
    }
});

router.post('/auth', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) return res.status(400).send({ error: 'Dados insuficientes!' });

    try {
        const user = await Users.findOne({ email }).select('+password');
        if (!user) return res.status(400).send({ error: 'Usuário não registrado!' });

        const pass_ok = await bcrypt.compare(password, user.password);
        if (!pass_ok) return res.status(401).send({ error: 'Erro ao autenticar usuário!' });

        user.password = undefined;
        return res.send({user, token: createUserToken(user.id)});

    }
    catch (err) {
        return res.status(500).send({ error: 'Erro ao buscar usuário!' });
    }
});

module.exports = router;