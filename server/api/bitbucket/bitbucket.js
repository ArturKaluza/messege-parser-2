const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');


router.get('/', (req, res) => {
  fetch('https://api.bitbucket.org/2.0/repositories/ArturKaluza/testRepo/commits')
    .then(data => data.json())
    .then(datajosn => {
      res.send(datajosn)
    })
    .catch(e => console.log(e));
  
});

module.exports = router;
