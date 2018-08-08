import React, { Component } from 'react';
import axios from 'axios';
import { Segment, List, Form } from 'semantic-ui-react';
import './Github.css';
import Loader from '../Loader/Loader'

import './Github.css';

import Commit from '../Commit/Commit';

class Github extends Component {
  constructor(props) {
    super(props);
    this.state = {
      repositores: [],
      commits: [],
      activeTask: false,
      isLoading: false,
      err: false,
    }
  }

  fetchCommits = repoName => {
    this.props.handleRepoName(repoName, 'githubRepoName');

    const username = sessionStorage.getItem('username-github');
    const password = sessionStorage.getItem('password-github')
    
    axios.post('/api/github/commit', {username, password, repoName})
      .then(response => {
        const commits = response.data.map(commit => {
          return {
            id: commit.sha,
            author: commit.author,
            message: commit.message,
            taskID: Math.floor(Math.random() * 3) + 1,
            sha: commit.sha,
            avatar: commit.avatar
          }  
        })
        this.setState({ commits })
    });
  }

  renderCommits = () => {
    return (
      <Segment color='black' style={{textAlign: 'center'}}>
        <List>
          {this.state.commits.map(item => {
            return (
              <Commit 
                key={item.id}
                avatar={item.avatar}
                author={item.author}
                id={item.id}
                message={item.message}
                activeTask ={this.state.activeTask}
                taskID={item.taskID}
                addCommit={this.props.getCommit}
                stateCommit={this.props.stateCommit}
                />
              )
            }
          )}
        </List>
        <button className='btn__back' onClick={() => this.backToRepo()}>Back</button>
      </Segment>
    )
  }
  getRepository = (e) => {
    e.preventDefault();
    this.setState({isLoading: true})
    const {username, password} = e.target;
    
    sessionStorage.setItem('username-github', username.value);
    sessionStorage.setItem('password-github', password.value);

    axios.post(`/api/github`, {
      username: username.value,
      password: password.value,
    })
    .then(res => this.setState({repositores: res.data, isLoading: false}))
    .catch(e => {
      this.setState({isLoading: false, err: true})
      setTimeout(() => {
        this.setState({err: false})
      }, 2500);
    });
  }

  backToRepo = () => {
    this.setState({isLoading: true})
    axios.post(`/api/github`, {
      username: sessionStorage.getItem('username-github'),
      password: sessionStorage.getItem('password-github')
    })
    .then(res => this.setState({repositores: res.data, commits: [], isLoading: false}))
    .catch(e => console.log(e));
  }

  renderForm = () => {
    return(
      <div>
        <h3 style={{textAlign: 'center'}}>Login</h3>
        <Form onSubmit={this.getRepository} style={{marginTop: '5px', display: 'flex', justifyContent: 'center', flexWrap: 'wrap', flexDirection: 'column' }} >
          <Form.Group style={{flexDirection: 'column', textAlign: 'center'}}>
            <Form.Input required placeholder="username" name='username' />
            <Form.Input required placeholder="password" name='password' type='password'/>
            <Form.Button content='Submit' style={{marginTop: '20px'}} />
          </Form.Group>
        </Form>
      </div>
    )
  }

  renderRepositores = (item) => {
    return (
      <div className='repo'
        key={item.id} 
        onClick={() => this.fetchCommits(item.name)}            
      >
        {item.name}
      </div>
      )
    }            

  render() {
    const { commits, repositores, isLoading } = this.state;
    const { renderForm, renderCommits, renderRepositores } = this;
    return (
      <div>
        <div className='column__header'>
          <h2>Github</h2>
        </div>
        {repositores.length === 0 && renderForm()}
        <Loader isLoading={isLoading} />
        {commits.length > 0 && renderCommits()}
        {(commits.length === 0 && repositores.length > 0 ) &&
          <Segment color='black'>
            <List>
              {repositores.map(renderRepositores)}
            </List>  
          </Segment>  
        }
      </div>
    );
  };
};

export default Github;


 