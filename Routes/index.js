const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const auth = require('../middlewares/auth');
const Task = require('../model/Task');
const Users = require('../model/User');

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

router.post('/task', auth, async (req, res) => {
    const { text } = req.body;

    if (!text) return res.status(400).send({ error: 'Necessário adicionar texto na task!' });

    try {
        const task = {
            text: text,
            done: false,
            id: req.user.count
        };
        let tasks = req.user.tasks;
        tasks.push(task)

        const _id = req.user._id

        let user = await Users.findByIdAndUpdate({ _id }, { tasks: tasks, count: req.user.count + 1 })
        user = await Users.findById({ _id })

        return res.status(201).send({ tasks: user.tasks });
    }
    catch (err) {
        return res.status(500).send({ error: 'Erro ao cadastrar task!' });
    }
});

router.get('/task', auth, async (req, res) => {
    return res.status(201).send({ tasks: req.user.tasks })
});

router.delete('/task', auth, async (req, res) => {
    const { id } = req.body;

    try {
        let tasks = req.user.tasks
        let filteredTasks = []

        tasks.forEach(task => {
            if (task.id !== id) filteredTasks.push(task)
        })

        const _id = req.user._id;
        await Users.findOneAndUpdate({ _id }, { tasks: filteredTasks });

        let user = await Users.findById({ _id })

        return res.status(201).send({ tasks: user.tasks })
    }
    catch (err) {
        return res.status(500).send({ error: 'Erro ao deletar task!' });
    }
});

router.put('/task', auth, async (req, res) => {
    const taskId = req.body.data.id
    const _id = req.user._id;

    let tasks = req.user.tasks
    let attTasks = []

    tasks.forEach(task => {
        if (task.id === taskId) {
            task.done = !task.done
            attTasks.push(task)
        }
        else {
            attTasks.push(task)
        };
    });

    await Users.findOneAndUpdate({ _id }, { tasks: attTasks });

    let user = await Users.findById({ _id })
    
    return res.status(201).send({ tasks: user.tasks })
});

router.put('/task/text', auth, async (req, res) => {
    const { id, text } = req.body
    const _id = req.user._id;

    let tasks = req.user.tasks
    let attTasks = []

    tasks.forEach(task => {
        if (task.id === id) {
            task.text = text
            attTasks.push(task)
        }
        else {
            attTasks.push(task)
        };
    });

    await Users.findOneAndUpdate({ _id }, { tasks: attTasks });

    let user = await Users.findById({ _id })
    
    return res.status(201).send({ tasks: user.tasks })
});

module.exports = router;