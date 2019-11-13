import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import { reducer as formReducer } from 'redux-form'

// All Custom Reducers
import { userReducer } from "Reducer/User/UserReducer";
import { uiReducer } from "Reducer/UI/UIReducer";
import { apiReducer } from "Reducer/API/APIReducer";
import { tmpDbReducer } from "Reducer/TmpDb/TmpDbReducer";

export const rootReducer = (history) => combineReducers({
  router: connectRouter(history),
  form: formReducer,
  tmpDbReducer,
  userReducer,
  uiReducer,
  apiReducer
});
