const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const BitBucket = require('bitbucket');
const bitbucket = new BitBucket();

// login/get user repositores
router.post('/', (req, res) => {
  const {username, password} = req.body;
    
  bitbucket.authenticate({
    type: 'basic',
    username: username,
    password: password
  })

  bitbucket.repositories
  .list({ username: username })
  .then(({ data, headers }) => res.send(data.values))
  .catch(err => res.status(404).end())


  // fetch('https://api.bitbucket.org/2.0/repositories/ArturKaluza/testRepo/commits')
  //   .then(data => data.json())
  //   .then(datajosn => {
  //     res.send(datajosn)
  //   })
  //   .catch(e => console.log(e));
  
});

// get commits from repositores
router.post('/commit', (req, res) => {
  const repoName = req.body.repo.name
  const owner = req.body.repo.owner.username
  

  bitbucket.authenticate({
    type: 'basic',
    username: owner,
    password: req.body.password
  })

  bitbucket.repositories
    .listCommits({ username: owner, repo_slug: repoName})
    .then(({data, header}) => res.send(data.values))
    .catch(e => console.log(e))
})

module.exports = router;
