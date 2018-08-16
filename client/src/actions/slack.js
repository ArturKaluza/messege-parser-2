import * as constants from '../constants';
import axios from 'axios';

export const getSlackStart = () => ({
  type: constants.GET_SLACK_START
})

export const getChannelsSuccess = (channels) => ({
  type: constants.GET_CHANNELS_SUCCESS,
  payload: {
    channels
  }
})

export const getChannels = (token) => {
  
  return (dispatch) => {
    dispatch(getSlackStart())
    const config = {
      params: {
        token
      }
    }

    return axios.get('api/slack/channels', config)
    .then(response => {
      const channels = response.data.map(channel => {
        return {
          key: channel.id,
          value: channel.id,
          text: channel.name
        }
      });
      dispatch(getChannelsSuccess(channels));
    })
  }
}

export const getUsersSuccess = users => ({
  type: constants.GET_USERS_SUCCESS,
  payload: {
    users
  }
})
export const getUsers = (token) => { 
  return (dispatch) => {
    dispatch(getSlackStart());

    const config = {
      params: {
        token
      }
    };
    return axios.get('/api/slack/users', config)
    .then(res => {
      dispatch(getUsersSuccess(res.data))
      return res.data
    })
  }
}

export const getMessagesSuccess = data => ({
  type: constants.GET_MESSAGES_SUCCESS,
  payload: {
    messages: data.messages,
    replies: data.replies
  }
})

export const getMessages = (token, channel) => { 
  return (dispatch) => {
    dispatch(getSlackStart());

    const config = {
      params: {
        token,
        channel
      }
    };
    let users = []
    axios.get('/api/slack/users', config)
    .then(res => {
      dispatch(getUsersSuccess(res.data))
      users = res.data
    })
    axios.get('api/slack/messages', config)
    .then(res => {
      const messages = res.data.messages;
      const replies = res.data.replies
      users.forEach(user => {
        messages.forEach(message => {
          if (user.id === message.user) {
            message.userName = user.name
          }
        }) 
      })

      users.forEach(user => {
        replies.forEach(reply => {
          if (user.id === reply.user) {
            reply.userName = user.name
          }
        }) 
      })

      dispatch(getMessagesSuccess({messages, replies}))
    })
  }
}


