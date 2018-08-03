import React, { Component } from 'react';
import axios from 'axios';
import { Segment, List } from 'semantic-ui-react';
import './BitBucket.css';
import Loader from '../Loader/Loader';

import Commit from '../Commit/Commit';

class BitBucket extends Component {
  constructor() {
    super()

    this.state = {
      commits: [],
      activeTask: false,
      repoName: '',
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
    axios.get('/api/bitbucket')
      .then(response => {
        const arr = response.data.values.map(commit => {
          const date = {}
          date.author = commit.author.raw
          date.sha = commit.hash;
          date.message = commit.message;
          date.taskID = this.randomNum()
                  
        return date;
        })
        this.setState({commits: arr, repoName: response.data.values[0].repository.name, isLoading: false})
      })
  }

  randomNum() {
    return Math.floor(Math.random() * 3) + 1;
  }

  renderBitBucket() {
    return (
      <List>
      {this.state.commits.map((item, index) => <Commit 
        key={index}
        avatar="https://avatars1.githubusercontent.com/u/30526557?v=4"
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
          <h2>BitBucket</h2>
          <h3>Repozitory name: {this.state.repoName}</h3>
        </div>
        <Segment color='blue'>
          <Loader isLoading={this.state.isLoading} />
          {this.renderBitBucket()}
        </Segment>
      </div>
    )
  }
}

export default BitBucket;