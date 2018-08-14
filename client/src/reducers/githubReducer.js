import * as constants from '../constants';

const initialState = {
  repositories: [],
  commits: [],
  isLoading: false,
  err: false,
}

export default (state = initialState, action) => {
  switch (action.type) {

  case constants.COMMITS_GET_SUCCESS: 
    return { ...state, commits: action.payload.commits, isLoading: false }
  case constants.DISPLAY_REPOSITIRES_SUCCESS: 
    return { ...state, commits: [], repositories: action.payload.repositories, isLoading: false}
  case constants.GET_START:
    return { ...state, isLoading: true }
  case constants.GET_ERROR: 
    return { ...state, err: true, isLoading: false}
  default:
    return state
  }
}
