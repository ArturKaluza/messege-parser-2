import * as constants from '../constants';
import axios from 'axios';

export function getStart() {
  return {
    type: constants.GET_START,
  };
};

export function getError(error) {
  return {
    type: constants.GET_ERROR,
    payload: {
      error
    }
  };
};
export function getCommitsSuccess(commits) {
  return {
    type: constants.COMMITS_GET_SUCCESS,
    payload: {
      commits
    }
  };
};

export function getCommits(repoName) {
  
  const username = sessionStorage.getItem('username-github');
  const password = sessionStorage.getItem('password-github')
  
  return (dispatch) => {
    dispatch(getStart());
    axios.post('/api/github/commit', {username, password, repoName})
      .then(response => {
        const commits = response.data.map(commit => {
          return {
            id: commit.sha,
            author: commit.author,
            message: commit.message,
            sha: commit.sha,
            avatar: commit.avatar
          }
        })
        return commits
      })
      .then(data => {
        dispatch(getCommitsSuccess(data));
      })
      .catch(error => dispatch(getError(error)))
  };
};

export function getRepositories(username, password) {

  sessionStorage.setItem('username-github', username);
  sessionStorage.setItem('password-github', password);

  return (dispatch) => {
    dispatch(getStart());
    axios.post(`/api/github`, {
      username,
      password
    })
    .then(res => { 
      console.log(res.data)

      dispatch(displayRepositoriesSuccess(res.data))
    })
    .catch(e => {
      dispatch(getError())
    })
  }
}

export function displayRepositoriesSuccess (repositories) {
  return {
    type: constants.DISPLAY_REPOSITIRES_SUCCESS,
    payload: {
      repositories
    }
  }
}
export function displayRepositories() {

  return (dispatch) => {
    dispatch(getStart());
    axios.post(`/api/github`, {
      username: sessionStorage.getItem('username-github'),
      password: sessionStorage.getItem('password-github')
    })
    .then(res => {
      dispatch(displayRepositoriesSuccess(res.data))
    })
  }
  
};