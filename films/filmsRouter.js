const express = require('express');

const Film = require('./Film.js');

const router = express.Router();

// add endpoints here
router.get('/', (req, res) => {
  const producerFilter = req.query.producer;
  const yearReleasedFilter = req.query.released;
  const producerFilterRegExp = new RegExp(req.query.producer, 'i');
  const releasedFilterRegExp = new RegExp(req.query.released);

  let query = Film.find({})
  .sort('episode')
  .populate('characters', 'name gender height skin_color hair_color eye_color')
  .populate('planets', 'name climate terrain gravity diameter')
  
  if (producerFilter) {
    query.where({ producer: producerFilterRegExp })
    .select('producer title')
  }
  if (yearReleasedFilter) {
    query.where({ release_date: releasedFilterRegExp})
    .select('title release_date')
  }

  query.then(films => {
      res.status(200).json(films);
    })
    .catch(error => {
      res.status(500).json({ errorMessage: 'Could not retrieve films.' });
    })
});

module.exports = router;
