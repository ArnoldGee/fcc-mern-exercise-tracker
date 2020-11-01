const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status.json('Error fetching users:' + err));
});
router.post('/add', (req, res) => {
  const {username} = req.body;

  const newUser = new User({username});

  newUser.save()
    .then((user)=> res.json(`User ${user.username} created`) // no sé si en aquest cas et deixa passar un username com a argument de la funció anònima. Si falla ho pots treure.
    .catch(err => res.status(400).json(`Error: ${err}`)))
});

module.exports = router;