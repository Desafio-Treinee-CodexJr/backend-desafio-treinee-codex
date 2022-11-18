const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const auth = require('../middlewares/auth');
const Task = require('../model/Task');


//router.get('/', auth, (req, res) => {
//    console.log(res.locals.auth_data);
//    return res.send({ message: 'Tudo ok com o GET da raiz!' });
//});

router.get('/', (req, res) => {
    console.log(res.locals.auth_data);
    return res.send({ message: 'Tudo ok com o GET da raiz!' });
});

router.post('/', (req, res) => {
    return res.send({ message: 'Tudo ok com o POST da raiz!' });
});

router.post('/task', auth ,async (req, res) => {
    const { text } = req.body;
    
    if (!text) return res.status(400).send({ error: 'Necessário adicionar texto na task!' });

    try {
        if (await Task.findOne({ text })) return res.status(400).send({ error: 'Task ja existe!' });

        const task = await Task.create(req.body);
        return res.status(201).send({task});
    }
    catch (err) {
        return res.status(500).send({ error: 'Erro ao cadastrar task!' });
    }
});

module.exports = router;