import * as constants from '../constants';

const initialState = {

}

export default (state = initialState, action) => {
  switch (action.type) {

  case constants.TYP_AKCJI:
    return { ...state }

  default:
    return state
  }
}
