const { WebClient } = require('@slack/client');
const express = require('express');
const router = express.Router();
const { getChannels, getUsers, getMessages } = require('../slackService')

router.post('/', (req, res) => {
  
});

router.get('/channels', (req, res) => {  
  const token = req.query.token
  
  getChannels(token)
  .then(data => {
    res.send(data);
  })
});

router.get('/users', (req, res) => {  
  const token = req.query.token
  getUsers(token)
  .then(data => {
    res.send(data);
  })
});

router.get('/messages', (req, res) => {  
  const { token, channel } = req.query
  getMessages(token,channel)
  .then(data => {
    res.send(data);
  })
});
module.exports = router;
