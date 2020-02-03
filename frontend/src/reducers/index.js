import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';

import content from './content';

const appReducer = combineReducers({
  content
});

const rootReducer = (state, action) => {
  let rootState = state;

  return appReducer(rootState, action);
};

export default rootReducer;
