import React, { Component } from 'react';
import axios from 'axios';
import { Segment, List } from 'semantic-ui-react';
import './Github.css';
import Loader from '../Loader/Loader'

import Commit from '../Commit/Commit';

class Github extends Component {
  constructor() {
    super()

    this.state = {
      commits: [],
      activeTask: false,
      isLoading: true
    }

    this.fetchCommits = this.fetchCommits.bind(this);
    this.randomNum = this.randomNum.bind(this);
  }

  componentDidMount() {
    this.fetchCommits();
  }

  componentWillReceiveProps(newProps) {
    this.setState({activeTask: newProps.handleActiveTask})
  }

  fetchCommits() {
    axios.get('https://api.github.com/repos/ArturKaluza/alm/commits')
      .then(response => {
        const arr = response.data.map(commit => {
          const date = {}
          date.avatarUrl = commit.author.avatar_url
          date.author = commit.author.login
          date.sha = commit.sha;
          date.message = commit.commit.message;
          date.taskID = this.randomNum()
                  
        return date;
        })
        this.setState({commits: arr, isLoading: false})
      })
  }

  randomNum() {
    return Math.floor(Math.random() * 3) + 1;
  }

  renderGithub() {
    return (
      <List>
       
        {this.state.commits.map((item, index) => <Commit 
          key={index}
          avatar={item.avatarUrl}
          author={item.author}
          id={item.sha}
          message={item.message}
          activeTask ={this.state.activeTask}
          taskID={item.taskID}
          
          />
        )}
      </List>
    )
  }

  render() {
    return (
      <div>
        <div className='column__header'>
          <h2>Github</h2>
          <h3>Repozitory name: alm</h3>
        </div>
        <Segment color='black'>
          <Loader isLoading={this.state.isLoading} />
          {this.renderGithub()}
        </Segment>
      </div>
    )
  }
}

export default Github;


 