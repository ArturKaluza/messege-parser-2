import React, { Component } from 'react';
import axios from 'axios';
import { Segment, List, Form } from 'semantic-ui-react';
import './BitBucket.css';
import Loader from '../Loader/Loader';

import Commit from '../Commit/Commit';

class BitBucket extends Component {
  constructor() {
    super()

    this.state = {
      repositores: [],
      commits: [],
      activeTask: false,
      repoName: '',
      isLoading: false,
      username: ''
    }

    this.fetchCommits = this.fetchCommits.bind(this);
    this.randomNum = this.randomNum.bind(this);
    this.getRepository = this.getRepository.bind(this);
    this.renderRepositores = this.renderRepositores.bind(this);
    this.renderForm = this.renderForm.bind(this);
    this.backToRepo = this.backToRepo.bind(this);
  }

  componentWillReceiveProps(newProps) {
    this.setState({activeTask: newProps.handleActiveTask})
  }

  fetchCommits(repo) {
    this.setState({isLoading: true});
    const password = sessionStorage.getItem('password')

    axios.post('/api/bitbucket/commit', {repo, password})
      .then(response => {
        const arr = response.data.map(commit => {
          const date = {}
          date.author = commit.author.raw
          date.sha = commit.hash;
          date.message = commit.message;
          date.taskID = this.randomNum()
                  
        return date;
        })
        this.setState({commits: arr, isLoading: false})
      })
  }

  getRepository(e) {
    e.preventDefault();
    this.setState({isLoading: true})
    const {username, password} = e.target;
    
    sessionStorage.setItem('username', username.value);
    sessionStorage.setItem('password', password.value);

    axios.post(`/api/bitbucket`, {
      username: username.value,
      password: password.value,
    })
    .then(res => this.setState({repositores: res.data, isLoading: false}))
    .catch(e => console.log(e));
      
  }

  randomNum() {
    return Math.floor(Math.random() * 3) + 1;
  }

  renderBitBucket() {
    return (
    <div style={{textAlign: 'center'}}> 
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
      <button className='btn__back' onClick={() => this.backToRepo()}>Back</button>
    </div>
    )
  }

  backToRepo() {
    this.setState({isLoading: true})
    axios.post(`/api/bitbucket`, {
      username: sessionStorage.getItem('username'),
      password: sessionStorage.getItem('password')
    })
    .then(res => this.setState({repositores: res.data, commits: [], isLoading: false}))
    .catch(e => console.log(e));
      
    
  }

  renderRepositores() {
    return (
        <List>
          {this.state.repositores.map((item, index) => <div className='repo'
              key={index} 
              onClick={() => this.fetchCommits(item)}            
              >
              {item.name}
              
            </div>
          )}
        </List>            
    )
  }

  renderForm() {
    return(
    <div>
      <h3 style={{textAlign: 'center'}}>Login</h3>
      <Form onSubmit={this.getRepository} style={{marginTop: '5px', display: 'flex', justifyContent: 'center', flexWrap: 'wrap', flexDirection: 'column' }} >
        <Form.Group style={{flexDirection: 'column', textAlign: 'center'}}>
          <Form.Input placeholder="username" id='username' />
          <Form.Input placeholder="password" id='password' type='password'/>
          <Form.Button content='Submit' style={{marginTop: '20px'}} />
        </Form.Group>
      </Form>
    </div>
    )
  }

  render() {
    return (
      <div>
        <div className='column__header'>
          <h2>BitBucket</h2>
      </div>
        <Loader isLoading={this.state.isLoading} />
        {(this.state.repositores.length > 0 && this.state.commits.length > 0) || this.state.repositores.length > 0 ? false : this.renderForm()}

        {this.state.commits.length > 0 ? <Segment color='blue'>
                                            {this.renderBitBucket()}
                                          
                                        </Segment> : false }
        
       
        {this.state.commits.length === 0 ? this.renderRepositores() : false}
      </div>
    )
  }
}

export default BitBucket;