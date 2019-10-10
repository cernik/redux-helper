import { listOrObjToMap } from './helper';

export function getFilters(types) {
  return {
    [types.CREATE]: state => ({
      ...state,
      isFetching: true,
    }),
    [types.CREATE_SUCCESS]: (state, action) => {
      if (action.payload.data) {
        const nextData = listOrObjToMap(action.payload.data);
        return {
          ...state,
          data: {
            ...state.data,
            ...nextData,
          },
          isFetching: false,
        };
      }
      return state;
    },
    [types.CREATE_FAIL]: state => ({
      ...state,
      isFetching: false,
    }),
    default: state => state,
  };
}
