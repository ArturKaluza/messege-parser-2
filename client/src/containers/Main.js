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
      
      githubCommits: []
      
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

  getRepoName(name) {
    this.setState({bitRepoName: name});
  }

  stateToDB() {
    console.log(this.state)

    Axios.post('/api/db', {
      author: this.state.author, 
      title: this.state.jiraComment, 
      jiraid: this.state.jiraTaskID,

      bitCommits: this.state.bitCommits,
      bitRepoName: this.state.bitRepoName,
      
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
    
    return (
      <div>

         <div className='title'>
            <h1>Message-Parse-App </h1>
            <Button content='Add Connection' primary onClick={this.stateToDB} />
        </div>
         <Grid columns={4} divided >
          <Grid.Row>
            
            <Grid.Column className="tool-container">
              <Jira jiraTask={this.filterJiraTask} handleActiveTask={this.state.activeTask} onTaskID={this.setJiraTaskID} />
            </Grid.Column>

            <Grid.Column className="tool-container">
              <Slack handleActiveTask={this.state.activeTask} />
            </Grid.Column>
            
            <Grid.Column className="tool-container">
              <Github  handleActiveTask={this.state.activeTask} getCommit={this.getCommitsGithub} stateCommit={this.state.githubCommits}/>
            </Grid.Column>

            <Grid.Column className="tool-container">
              <BitBucket  handleActiveTask={this.state.activeTask} getBitCommit={this.getCommits} stateCommit={this.state.bitCommits} handleRepoName={this.getRepoName} />
            </Grid.Column>

          </Grid.Row>
          <Divider fitted ></Divider>
          <Grid.Row columns={4} divided>
            <Grid.Column className="tool-container">
              <Mail />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      
      </div>
    )
  }
}

export default Main;
