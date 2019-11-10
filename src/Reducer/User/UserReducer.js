import _assign from "lodash/assign";
import * as type from 'Reducer/ReducerType';

const initState = {
  isLogin: true
}

export const userReducer = (state = initState, action) => {
  switch (action.type) {
    case type.USER_LOGIN_SUCCESS:
      return _assign({}, state, {
        isLogin: true
      })
    case type.USER_LOGOUT:
      return _assign({}, state, {
        isLogin: false
      })
    default:
      return state
  }

}
