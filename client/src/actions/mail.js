import * as constants from '../constants';
import axios from 'axios';

export const getMailsStart = () => ({
  type: constants.GET_MAILS_START
})

export const getMailsSuccess = (mails) => ({
  type: constants.GET_MAILS_SUCCESS,
  payload: {
    mails
  }
})

export const getMails = (email, password, host) => {
  return (dispatch) => {
    dispatch(getMailsStart());

    axios.post('/api/mail', {
      email,
      password,
      host
    })
    .then(res => {
      console.log(res.data)
      dispatch(getMailsSuccess(res.data))
    })
    .catch(function (error) {
      console.log(error);
    });
  }
}