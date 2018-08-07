const express = require('express')
const router = express.Router();

const Task = require('../../DB/models/task');

// create task
router.post('/', (req, res) => {
  const { author, title, jiraid, bitCommits, bitRepoName, gitUserName, gitRepoName, gitCommits, workspaceID,
    channelID, messages, email, mailsID } = req.body;

  if (!author && !title && !jiraid) {
    return res.status(400).json({error: 'author, title and jiraid require'})
  }
  
  const task = new Task({
    author, title, jiraid, bitCommits, bitRepoName, gitUserName, gitRepoName, gitCommits, workspaceID,
    channelID, messages, email, mailsID
  })

  task.save()
    .then(doc => res.send(doc))
    .catch(e => res.status(400).send(e))

})

// get all task
router.get('/', (req, res) => {
  Task.find()
    .then(docs => res.send(docs))
    .catch(e => res.status(400).send(e));
})

module.exports = router;