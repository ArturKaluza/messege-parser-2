const Octokit = require('@octokit/rest')
const github = new Octokit()

const authenticate = (username, password) => {
  github.authenticate({
    type: 'basic',
    username: username,
    password: password
  })
}

const allRepos = (username, password) => {
  authenticate(username, password);

  return github.repos.getAll({ affiliation: 'owner' })
  .then(repos => {
    return repos.data.map(repo => {
      return {
        id: repo.id,
        name: repo.name
      }
    })
  })
}

const allCommitsFromRepo = (username, password, repoName) => {

  authenticate(username, password);

  return github.repos.getCommits({owner: username, repo: repoName})
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
}

module.exports = {
  allRepos,
  allCommitsFromRepo
}