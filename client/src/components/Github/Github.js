import React, { Component } from 'react';
import { Segment, List, Form } from 'semantic-ui-react';
import { connect } from 'react-redux';
import './Github.css';
import Loader from '../Loader/Loader'
import Err from '../Error/Error';

import './Github.css';

import Commit from '../Commit/Commit';
import * as actions from '../../actions/github';

class Github extends Component {

  // componentDidUpdate(prevProps) {
  //   if((this.props.isBindMode === false && this.props.isBindMode !== prevProps.isBindMode) || this.props.relatedToShow.jiraid !== prevProps.relatedToShow.jiraid) {
  //     const username = sessionStorage.getItem('username-github');
  //     const password = sessionStorage.getItem('password-github')
  //     const repoName = this.props.relatedToShow.gitRepoName;
      
  //     if(this.props.relatedToShow && this.props.relatedToShow.gitCommits.length === 0) {
  //       return this.setState({commits: [
  //         {
  //           id: 0,
  //           author: 'Not Found',
  //           message: "Not Found",
  //           sha: 0,
  //           avatar: ''
  //         }
  //       ]})
  //     }

  //     axios.post('/api/github/commit', {username, password, repoName})
  //     .then(response => {
  //       const commits = response.data.map(commit => {
  //         return {
  //           id: commit.sha,
  //           author: commit.author,
  //           message: commit.message,
  //           sha: commit.sha,
  //           avatar: commit.avatar
  //         }  
  //       })
  //       .filter(commit => {
  //         return this.props.relatedToShow.gitCommits.includes(commit.id)
  //       })
  //       return commits;
  //     })
  //     .then(res => {
  //       this.setState({ commits:res })
  //     })
  //   }
  // }
  fetchCommits = repoName => {
    this.props.handleRepoName(repoName, 'githubRepoName');
    this.props.getCommits(repoName);
  }

  renderCommits = () => {
    return (
      <Segment color='black' style={{textAlign: 'center'}}>
        <List>
          {this.props.commits.map(item => {
            return (
              <Commit 
                key={item.id}
                avatar={item.avatar}
                author={item.author}
                id={item.id}
                message={item.message}
                addCommit={this.props.getCommit}
                stateCommit={this.props.stateCommit}
                />
              )
            }
          )}
        </List>
        {<button className='btn__back' onClick={() => this.props.displayRepositories()}>Back</button> }
      </Segment>
    )
  }
  getRepository = (e) => {
    e.preventDefault();
    const {username, password} = e.target;
    
    this.props.getRepositories(username.value, password.value)
  }

  notRelated() {
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
    const { isLoading, err, repositories, commits } = this.props
    const { renderForm, renderCommits, renderRepositores } = this;
    return (
      <div>
        <div className='column__header'>
          <h2>Github</h2>
        </div>
        {repositories.length === 0 && renderForm()}
        <Loader isLoading={isLoading} />
        {commits.length > 0 && renderCommits()}
        {(commits.length === 0 && repositories.length > 0 ) &&
          <Segment color='black'>
            <List>
              {repositories.map(renderRepositores)}
            </List>  
          </Segment>  
        }

        {err ? <Err text={'User nad password don\'t match'} /> : false}
      </div>
    );
  };
};
const mapStateToProps = (state) => {
  return {
    commits: state.github.commits,
    repositories: state.github.repositories,
    isLoading: state.github.isLoading,
    err: state.github.err
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getCommits: (repo) => dispatch(actions.getCommits(repo)),
    displayRepositories: () => dispatch(actions.displayRepositories()),
    getRepositories: (username, password) => dispatch(actions.getRepositories(username, password)) 
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Github);


 