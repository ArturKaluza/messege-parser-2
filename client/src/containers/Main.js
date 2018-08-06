import React, { Component } from 'react';
import './Main.css';
import { Grid, Divider } from 'semantic-ui-react'

import Slack from '../components/Slack/Slack';
import Github from '../components/Github/Github';
import BitBucket from '../components/BitBucket/BitBucket';
import Jira from '../components/Jira/Jira';
import Mail from '../components/Mail/Mail';


class Main extends Component {
  constructor() {
    super();

    this.state = {
      activeTask: false,
      jiraTaskID: '',
      bitCommit: []
      
    };

    this.filterJiraTask = this.filterJiraTask.bind(this);
    this.getCommits = this.getCommits.bind(this);
  }

  filterJiraTask(id, taskID) {
    this.setState({activeTask: id, jiraTaskID: taskID});
  }

  getCommits(id) {
    if (this.state.bitCommit.filter(item => item === id).length === 0 ) {
      this.setState((prev) => {
        return {bitCommit: [...prev.bitCommit, id]}
      })
    } else {
      this.setState(prev => {
        return {bitCommit: prev.bitCommit.filter(item => item !== id)}
      })
    }



  //  console.log(this.state.bitCommit)
  }

  render() {
    
    return (
      <div>

         <div className='title'>
            <h1>Message-Parse-App </h1>
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
              {/* <Github  handleActiveTask={this.state.activeTask} /> */}
            </Grid.Column>

            <Grid.Column className="tool-container">
              <BitBucket  handleActiveTask={this.state.activeTask} getBitCommit={this.getCommits} stateCommit={this.state.bitCommit} />
            </Grid.Column>

          </Grid.Row>
          <Divider fitted ></Divider>
          <Grid.Row columns={4} divided>
            <Grid.Column className="tool-container">
              {/* <Mail /> */}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      
      </div>
    )
  }
}

export default Main;
