import * as constants from '../constants';

const initialState = {
  channels: [],
  users: [],
  messages: [],
  replies: [],
  isLoading: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
  case constants.GET_SLACK_START: 
    return { ...state, isLoading: true }
  case constants.GET_USERS_SUCCESS: 
    return { ...state, users: action.payload.users, isLoading: false}
  case constants.GET_CHANNELS_SUCCESS:
    return { ...state, channels: action.payload.channels, isLoading: false }
  case constants.GET_MESSAGES_SUCCESS:
    return { ...state, messages: action.payload.messages, isLoading: false}
  default:
    return state
  }
}
