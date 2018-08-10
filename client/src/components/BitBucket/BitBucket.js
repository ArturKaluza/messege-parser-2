import React, { Component } from 'react';
import axios from 'axios';
import { Segment, List, Form } from 'semantic-ui-react';
import './BitBucket.css';
import Loader from '../Loader/Loader';
import Err from '../Error/Error';

import Commit from '../Commit/Commit';

class BitBucket extends Component {
  constructor(props) {
    super(props);

    this.state = {
      repositores: [],
      commits: [],
      stateCommit: [],
      isLoading: false,      
      err: false,
      filterTask: {},
      new: true
    }

    this.fetchCommits = this.fetchCommits.bind(this);
    this.getRepository = this.getRepository.bind(this);
    this.renderRepositores = this.renderRepositores.bind(this);
    this.renderForm = this.renderForm.bind(this);
    this.backToRepo = this.backToRepo.bind(this);
  }

  componentWillReceiveProps(newProps) {
    this.setState({stateCommit: newProps.stateCommit})
  }

  componentDidUpdate(prevProps) {
    if((this.props.isBindMode === false && this.props.isBindMode !== prevProps.isBindMode) || this.props.relatedToShow.jiraid !== prevProps.relatedToShow.jiraid) {
      const username = sessionStorage.getItem('username-bit');
      const password = sessionStorage.getItem('password-bit')
      const repoName = this.props.relatedToShow.bitRepoName;
       if(this.props.relatedToShow && this.props.relatedToShow.bitCommits.length === 0) {
        return this.setState({commits: [
          {
            id: 0,
            author: 'Not Found',
            message: "Not Found",
            sha: 0,
            avatar: ''
          }
        ]})
      }
       axios.post('/api/bitbucket/commit', {username, password, repoName})
      .then(response => {
        const commits = response.data.map(commit => {
          return {
            id: commit.hash,
            author: commit.author,
            message: commit.message,
            sha: commit.hash,
            avatar: commit.avatar
          }  
      
        })
        .filter(commit => {
          return this.props.relatedToShow.bitCommits.includes(commit.id)
        })
        return commits;
      })
      .then(res => {
        this.setState({ commits:res })
      })
    }
  }

  fetchCommits(repo) {
    this.props.handleRepoName(repo.name, 'bitRepoName');

    this.setState({isLoading: true});
    const password = sessionStorage.getItem('password-bit')

    axios.post('/api/bitbucket/commit', {repo, password})
      .then(response => {
        const arr = response.data.map(commit => {
          const date = {}
          date.author = commit.author.raw
          date.sha = commit.hash;
          date.message = commit.message;
                 
        return date;
        })
        this.setState({commits: arr, isLoading: false})
      })
  }

  getRepository(e) {
    e.preventDefault();
    this.setState({isLoading: true})
    const {username, password} = e.target;
    
    sessionStorage.setItem('username-bit', username.value);
    sessionStorage.setItem('password-bit', password.value);

    axios.post(`/api/bitbucket`, {
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
          stateCommit={this.props.stateCommit}
          addCommit={this.props.getBitCommit}
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
      username: sessionStorage.getItem('username-bit'),
      password: sessionStorage.getItem('password-bit')
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

        {this.state.err ? <Err text={'User nad password don\'t match'} /> : false}
      </div>
    )
  }
}

export default BitBucket;