import _assign from "lodash/assign";
import * as type from 'Reducer/ReducerType';

const initState = {
  data: [],
  queryData: [],
  onboardCount: 0
}

export const tmpDbReducer = (state = initState, action) => {
  switch(action.type){
    case type.UPDATE_DATA:
      return _assign({}, state, {
        data: action.data
      });
    case type.UPDATE_QUERY_DATA:
      return _assign({}, state, {
        queryData: action.queryData
      });
    case type.UPDATE_ON_BOARD_COUNT:
      return _assign({}, state, {
        onboardCount: action.onboardCount
      });
    case type.INIT_FETCH_DATA:
      return _assign({}, state, {
        data: action.data,
        queryData: action.queryData,
        onboardCount: action.onboardCount
      });
    default:
      return state;
  }
}
