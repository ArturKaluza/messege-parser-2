import * as constants from '../constants';

const initialState = {
  isLoading: false,
  mails: [],
}

export default (state = initialState, action) => {
  switch (action.type) {

  case constants.GET_MAILS_START:
    return { ...state, isLoading: true }
  case constants.GET_MAILS_SUCCESS: 
    return { ...state, mails: action.payload.mails, isLoading: false}
  default:
    return state
  }
}
