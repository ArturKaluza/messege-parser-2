const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const Octokit = require('@octokit/rest')
const github = new Octokit()

// login/get user repositores
router.post('/', (req, res) => {

  const {username, password} = req.body;
  
  github.authenticate({
    type: 'basic',
    username: username,
    password: password
  })
  github.repos.getAll()
  .then(repos => {
    return repos.data.map(repo => {
      return {
        id: repo.id,
        name: repo.name
      }
    })
  })
  .then(data => {
    res.status(200).send(data)
  })
  .catch(err => res.status(404).end())
  
});

// get commits from repositores
router.post('/commit', (req, res) => {
  const { username, repoName } = req.body;
  github.repos.getCommits({owner: username, repo: repoName})
  .then(res => {
    return res.data.map(commit => {
      return {
        author: commit.commit.author.name,
        message: commit.commit.message,
        sha: commit.sha,
        avatar: commit.author.avatar_url
      }
    })
  })
  .then(data => {
    res.status(200).send(data)
  })
  .catch(() => res.status(404).end());
})

module.exports = router;
