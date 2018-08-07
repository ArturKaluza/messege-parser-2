import React, { Component } from 'react';
import './Main.css';
import { Grid, Divider, Button } from 'semantic-ui-react'
import xor from 'lodash/xor';

import Slack from '../components/Slack/Slack';
import Github from '../components/Github/Github';
import BitBucket from '../components/BitBucket/BitBucket';
import Jira from '../components/Jira/Jira';
import Mail from '../components/Mail/Mail';
import Axios from '../../node_modules/axios';


class Main extends Component {
  constructor() {
    super();

    this.state = {
      author: undefined,
      jiraTaskID: undefined,
      jiraComment: undefined,

      bitCommits: [],
      bitRepoName: undefined,

      githubCommits: [],
      githubRepoName: undefined,
      
      mailsToDb: [],
      mailName: undefined
    };

    this.filterJiraTask = this.filterJiraTask.bind(this);
    this.getCommits = this.getCommits.bind(this);
    this.getRepoName = this.getRepoName.bind(this);
    this.stateToDB = this.stateToDB.bind(this);
  }

  filterJiraTask(taskID, author, comment) {
    this.setState({jiraTaskID: taskID, author: author, jiraComment: comment});
  }

  getCommits(id) {
    const bitCommits = xor(this.state.bitCommits, [id])
    this.setState({ bitCommits });
  }

  getCommitsGithub = (id) => {
    const githubCommits = xor(this.state.githubCommits, [id])
    this.setState({ githubCommits });
  }

  getMails = (id) => {
    const mailsToDb = xor(this.state.mailsToDb, [id])
    this.setState({ mailsToDb });
  }

  getRepoName(name, nameTool) {
    this.setState({ [nameTool] : name});
  }

  getMailName = name => {
    this.setState({ mailName: name});
  }

  stateToDB() {
    console.log(this.state)

    Axios.post('/api/db', {
      author: this.state.author, 
      title: this.state.jiraComment, 
      jiraid: this.state.jiraTaskID,

      bitCommits: this.state.bitCommits,
      bitRepoName: this.state.bitRepoName,

      gitCommits: this.state.githubCommits,
      gitRepoName: this.state.githubRepoName,

      mailsID: this.state.mailsToDb,
      email: this.state.mailName,
      // gitUserName,
      // gitRepoName,
      // gitCommits,
      
      // workspaceID,
      // channelID,
      // messages,
      
      // email,
      // mailsID
    })
    .then(res => console.log(res.data))
    .catch(e => console.log(e));
  }
  
  render() {
    console.log(this.state)
    return (
      <div>

         <div className='title'>
            <h1>Message-Parse-App </h1>
            <Button content='Add Connection' primary onClick={this.stateToDB} disabled={!this.state.author && !this.state.jiraComment && !this.state.jiraTaskID} />
        </div>
         <Grid columns={4} divided >
          <Grid.Row>
            
            <Grid.Column className="tool-container">
              <Jira jiraTask={this.filterJiraTask} activeTask={this.state.jiraTaskID} />
            </Grid.Column>

            <Grid.Column className="tool-container">
              <Slack 
                handleActiveTask={this.state.activeTask} 
              />
            </Grid.Column>
            
            <Grid.Column className="tool-container">
              <Github  
                handleActiveTask={this.state.activeTask} 
                getCommit={this.getCommitsGithub} 
                stateCommit={this.state.githubCommits} 
                handleRepoName={this.getRepoName}
              />
            </Grid.Column>

            <Grid.Column className="tool-container">
              <BitBucket  
                handleActiveTask={this.state.activeTask} 
                getBitCommit={this.getCommits} 
                stateCommit={this.state.bitCommits} 
                handleRepoName={this.getRepoName} 
              />
            </Grid.Column>

          </Grid.Row>
          <Divider fitted ></Divider>
          <Grid.Row columns={4} divided>
            <Grid.Column className="tool-container">
              <Mail
                handleActiveTask={this.state.activeTask} 
                getMails={this.getMails} 
                stateMails={this.state.mailsToDb} 
                handleMailName={this.getMailName}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      
      </div>
    )
  }
}

export default Main;
