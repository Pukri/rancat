import * as types from '../actions/actionTypes';

export default function userReducer(state = {
  cat: null,
  error: '',
  loading: false,
}, action) {
  switch (action.type) {
    case types.GET_CAT_LOADING: {
      return Object.assign({}, state, {
        error: '',
        loading: true,
        cat: null,
      });
    }
    case types.GET_CAT_SUCCESS: {
      return Object.assign({}, state, {
        error: '',
        loading: false,
        cat: action.payload,
      });
    }
    case types.GET_CAT_FAIL: {
      return Object.assign({}, state, {
        error: action.payload,
        loading: false,
        cat: null,
      });
    }
    default: {
      return state;
    }
  }
}
