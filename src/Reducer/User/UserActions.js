import * as type from 'Reducer/ReducerType';


export const userLogin = () =>{
  return (dispatch) => {
    dispatch({
      type: type.USER_LOGIN_SUCCESS,
      isLogin: true
    })
  }

}

export const userLogout = () =>{
  return (dispatch) => {
    dispatch({
      type: type.USER_LOGOUT,
      isLogin: false
    })
  }

}
