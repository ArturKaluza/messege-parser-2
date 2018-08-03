const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');


router.get('/:key', (req, res) => {
  // fetch('https://supportdesk.almservices.pl/rest/api/2/project/', {
  //   headers: {
  //     "Authorization": 'Basic YXJ0dXIua2FsdXphOmFzZHp4YzEx',
  //   }
  // })
  //   .then(data => data.json())
  //   .then(datajosn => {
  //     res.send(datajosn)
  //   })
  //   .catch(e => console.log(e));
  
  const { key } = req.params;

  fetch(`https://supportdesk.almservices.pl/rest/api/2/issue/${key}/worklog`, {
    headers: {
      "Authorization": 'Basic YXJ0dXIua2FsdXphOmFzZHp4YzEx',
    }
  }).then(data => data.json())
    .then(datajson => res.send(datajson))
    .catch(e => console.log(e))

  
});

module.exports = router;
