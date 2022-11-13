var express = require('express');
var router = express.Router();
const User = require('../models/User');

/* POST users for SignUp */
router.post('/sign-up', async function(req, res, next) {
  const { name, surname, genre, years, email, password } = req.body;

  if (!name || !password || !surname || !genre || !years || !email || !password) 
    return res.json( {"message": "Preencha todos os campos!"} );

  const user = await User.create({
    name,
    surname,
    genre,
    years,
    email,
    password
  });

  return res.json( user );
});

module.exports = router;