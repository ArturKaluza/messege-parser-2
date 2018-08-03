const express = require('express');
const router = express.Router();
const { getAllThemes } = require('../mailServices');

router.get('/', (req, res) => {
  return getAllThemes()
    .then(themes => {
      res.send(themes)
    })
});

module.exports = router;
