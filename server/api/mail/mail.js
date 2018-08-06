const express = require('express');
const router = express.Router();
const { getAllThemes } = require('../mailServices');

router.post('/', (req, res) => {
  const { email, password, host } = req.body;
  return getAllThemes(email, password, host)
    .then(data => {
      res.status(200).send(data)
    })
});

router.get('/', (req, res) => {
  
});
module.exports = router;
