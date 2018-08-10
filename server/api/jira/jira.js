const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const base64 = require('base-64');

// login to jira
router.post('/', (req, res) => {
  const { username, password } = req.body;
  const hash = base64.encode(username + ':' + password);

// checking valid username and password
  fetch(`https://supportdesk.almservices.pl/rest/api/2/issue/almaca-38/worklog`, {
    headers: {
      "Authorization": 'Basic ' + hash                              
    }
  })
  .then(response => {
    if (response) {
      res.status(200).end();
    } else {
      res.status(404).end();
    }
    
  })
  .catch(err => {
    res.status(400).send(err)})
})


router.post('/:key', (req, res) => {
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
  const { username, password } = req.body;

  const hash = base64.encode(username + ':' + password);

  // fetch(`https://supportdesk.almservices.pl/rest/api/2/issue/${key}/worklog`, {
  //   headers: {
  //     "Authorization": 'Basic ' + hash                              
  //   }
  // }).then(data => data.json())
  //   .then(datajson => res.send(datajson))
  //   .catch(e => console.log(e))


  fetch(`https://supportdesk.almservices.pl/rest/api/2/search?jql=project="almaca"`, {
    headers: {
      "Authorization": 'Basic ' + hash                              
    }
  }).then(data => data.json())
    .then(datajson => res.send(datajson))
    .catch(e => console.log(e))

});

module.exports = router;
