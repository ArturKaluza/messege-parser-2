import React, { Component } from 'react';
import './Main.css';
import { Grid, Divider, Button } from 'semantic-ui-react'
import xor from 'lodash/xor';

import Slack from '../components/Slack/Slack';
import Github from '../components/Github/Github';
import BitBucket from '../components/BitBucket/BitBucket';
import Jira from '../components/Jira/Jira';
import Mail from '../components/Mail/Mail';
import axios from 'axios';


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
      mailName: undefined,

      messages: [],
      channelID: undefined,

      isBindMode: false,
      relatedToShow: {}
    };

    this.getCommits = this.getCommits.bind(this);
    this.getRepoName = this.getRepoName.bind(this);
    this.stateToDB = this.stateToDB.bind(this);
  }
  
  showRelatedItems = (jiraTaskId, e) => {
    this.setState({jiraTaskID: undefined, author: undefined, jiraComment: undefined, isBindMode: false})
    this.getRelatedFromDb(jiraTaskId)
  }
  bindingItems = (taskID, author, comment, event) => {
    event.stopPropagation();
    this.setState({jiraTaskID: taskID, author: author, jiraComment: comment, isBindMode: true});
  }

  getRepoName(name, nameTool) {
    this.setState({ [nameTool] : name});
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
  getMailName = name => {
    this.setState({ mailName: name});
  }

  getMessages = id => {
    const messages = xor(this.state.messages, [id])
    this.setState({ messages });
  }

  getChannelId = (channelID) => {
    this.setState({ channelID });
  }

  getRelatedFromDb (jiraTaskID) {
    
    axios.get('/api/db', {params: { jiraTaskID }})
    .then(res => {
      this.setState({ relatedToShow: res.data })
    })
  }

  stateToDB() {
    axios.post('/api/db', {
      author: this.state.author, 
      title: this.state.jiraComment, 
      jiraid: this.state.jiraTaskID,

      bitCommits: this.state.bitCommits,
      bitRepoName: this.state.bitRepoName,

      gitCommits: this.state.githubCommits,
      gitRepoName: this.state.githubRepoName,

      mailsID: this.state.mailsToDb,
      email: this.state.mailName,

      channelID: this.state.channelID,
      messages: this.state.messages
      
    })
    .then(res =>{
      // clear state after creating record in DB
      if (res.status === 200) {
        this.setState({
          author: undefined,
          jiraTaskID: undefined,
          jiraComment: undefined,
          bitCommits: [], 
          
          githubCommits: [],
          
          mailsToDb: [],
          mailName: undefined,
          messages: [],
          channelID: undefined,
        });
      }
    })
    .catch(e => console.log(e));
  }
  
  render() {
    return (
      <div>

         <div className='title'>
            <h1>Message-Parse-App </h1>
            <Button content='Add Connection' primary onClick={this.stateToDB} disabled={!this.state.author && !this.state.jiraComment && !this.state.jiraTaskID} />
        </div>
         <Grid columns={4} divided >
          <Grid.Row>
            
            <Grid.Column className="tool-container">
              <Jira 
                bindingItems={this.bindingItems} 
                activeTask={this.state.jiraTaskID}
                showRelatedItems={this.showRelatedItems}
              />
            </Grid.Column>

            <Grid.Column className="tool-container">
              {/* <Slack 
                handleActiveTask={this.state.activeTask}
                getMessages={this.getMessages} 
                stateMessages={this.state.messages} 
                handleChannelName={this.getChannelId}
              /> */}
            </Grid.Column>
            
            <Grid.Column className="tool-container">
              <Github  
                getCommit={this.getCommitsGithub} 
                stateCommit={this.state.githubCommits} 
                handleRepoName={this.getRepoName}
                relatedToShow={this.state.relatedToShow}
                isBindMode={this.state.isBindMode}
              />
            </Grid.Column>

            <Grid.Column className="tool-container">
              <BitBucket  
                getBitCommit={this.getCommits} 
                stateCommit={this.state.bitCommits} 
                handleRepoName={this.getRepoName} 
                relatedToShow={this.state.relatedToShow}
                isBindMode={this.state.isBindMode}
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
