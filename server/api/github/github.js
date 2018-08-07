const express = require('express');
const router = express.Router();
const { allRepos, allCommitsFromRepo } = require('../githubServices')


// login/get user repositores
router.post('/', (req, res) => {

  const {username, password} = req.body;

  allRepos(username, password)

  .then(data => {
    res.status(200).send(data)
  })
  .catch(err => res.status(404).end())
  
});

// get commits from repositores
router.post('/commit', (req, res) => {

  const { username, password, repoName } = req.body;
  
  allCommitsFromRepo(username, password, repoName)

  .then(data => {
    res.status(200).send(data)
  })
  .catch(() => res.status(404).end());
})

module.exports = router;
