import * as type from 'Reducer/ReducerType';

export function updateData(newData){
  return { type: type.UPDATE_DATA, data: newData }
}

export function updateQueryData(newQueryData){
  return { type: type.UPDATE_QUERY_DATA, queryData: newQueryData }
}

export function updateOnboardCount(newOnboardCount){
  return { type: type.UPDATE_ON_BOARD_COUNT, onboardCount: newOnboardCount }
}

export function initialFetchData(newData, newOnboardCount){
  return { type: type.INIT_FETCH_DATA, data: newData, queryData: newData, onboardCount: newOnboardCount }

}
