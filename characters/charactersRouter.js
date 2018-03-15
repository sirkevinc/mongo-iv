const express = require('express');

const Character = require('./Character.js');

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

module.exports = router;
