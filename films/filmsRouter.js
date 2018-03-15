const express = require('express');

const Film = require('./Film.js');

const router = express.Router();

// add endpoints here
router.get('/', (req, res) => {
  const producerFilter = req.query.producer;
  const yearReleased = req.query.released;

  let query = Film.find({})
    .sort('episode')
    .populate('characters', 'name gender height skin_color hair_color eye_color')
    .populate('planets', 'name climate terrain gravity diameter')
    .select('title producer')
  
    if (producerFilter) {
    query.where({ producer: /gary kurtz/i });
  }
    if (yearReleased) {
      query.where({ release_date: /2005/i})
    }

  query.then(films => {
      res.status(200).json(films);
    })
    .catch(error => {
      res.status(500).json({ errorMessage: 'Could not retrieve films.' });
    })
});

module.exports = router;
