const express = require('express');
const Exercise = require('../models/exercise.model');
const router = express.Router();
const user = require('../models/user.model');

router.get('/', (req, res) => {
  Exercise.find()
    .then((exercises) => res.json(exercises))
    .catch((err) => res.status(404).json(`Error fetching user data: ${err}`));
});

router.post('/add', (req, res) => {
  const {username, description} = req.body;
  const duration = Number(req.body.duration);
  const date = Date.parse(req.body.date);

  const newExercise = new Exercise({
    username,
    description,
    duration,
    date,
  });

  newExercise
    .save()
    .then(() => res.json('Exercise added!'))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

router.get('/:id', (req, res) => {
  Exercise.findById(req.params.id)
    .then((exercise) => res.json(exercise))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

router.delete('/:id', (req, res) => {
  Exercise.findByIdAndDelete(req.params.id)
    .then((exercise) => res.json(`Exercise ${exercise.description} deleted`))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

router.post('/update/:id', (req, res) => {
  Exercise.findById(req.params.id)
    .then((exercise) => {
      exercise.username = req.body.username;
      exercise.description = req.body.description;
      exercise.duration = Number(req.body.duration);
      exercise.date = Date.parse(req.body.date);

      exercise
        .save()
        .then((exercise) =>
          res.json(`Exercise ${exercise.description} was successfully updated.`)
        )
        .catch((err) => res.status(400).json(`Oops, error: ${err}`));
    })
    .catch((err) => res.status(400).json(`Oops, error: ${err}`));
});

module.exports = router;
