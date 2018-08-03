const express = require('express');
const router = express.Router();
const { getAllThemes } = require('../mailServices');

router.get('/', (req, res) => {
  return getAllThemes()
    .then(data => {
      res.status(200).send(data)
    })
});

module.exports = router;
