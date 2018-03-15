const express = require('express');

const Character = require('./Character.js');
const Film = require('../films/Film.js');
const Vehicle = require('../vehicles/Vehicle.js');

const router = express.Router();

// add endpoints here
router.get('/:id', (req, res) => {
  const { id } = req.params;
  Character.findById(id)
    .populate('homeworld')
    .then(character => {
      res.status(200).json(character)
    })
    .catch(err => {
      res.status(500).json({ error: 'Could not find Character'});
    })
});

router.get('/:id/vehicles', (req, res) => {
  const { id } = req.params;
  Character.findById(id)
    .then(character => {
      const key = character.key;
      Vehicle.find({ pilots: {$in: [id] }})
        .then(vehicle => {
          res.status(200).json(vehicle);
        })
        .catch(err => {
          res.status(500).json({ error: 'Could not find vehicle'})
        })
    })
    .catch(err => {
      res.status(500).json({ error: 'There was an error finding vehicle' })
    })
})

router.get('/', (req, res) => {
  const heightFilter = req.query.minHeight;
  const minHeightRegExp = new RegExp(req.query)
  if (heightFilter) {
    Character.find({gender: 'female', height: {$gt: 100}})
    .then(character => {
      res.status(200).json(character);
    })
    .catch(err => {
      res.status(500).json({ error: 'Could not find Character' });
    })
  }
})

module.exports = router;
