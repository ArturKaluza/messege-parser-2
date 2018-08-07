const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  author: {
    type: String,
    require: true
  },
  title: {
    type: String,
    require: true
  },
  jiraID: {
    type: Number,
    require: true
  },

  // BitBucket
  bitCommits: {
    type: [],
    default: undefined,
  },
  bitRepoName: { type: String },

  // GitHub
  gitRepoName: { type: String },
  gitCommits: {
    type: [],
    default: undefined,
  },
  
  // Slack
  workspaceID: {type: String},
  channelID: {type: String},
  messages: {
    type: [],
    default: undefined,
  },

  // Mail
  email: {type: String },
  mailsID: {
    type: [],
    default: undefined,
  }
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;