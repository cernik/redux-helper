import { listOrObjToMap } from './helper';

export function getFilters(types) {
  return {
    [types.LOAD]: state => ({
      ...state,
      isFetching: true,
    }),
    [types.LOAD_SUCCESS]: (state, action) => {
      if (action.payload.data) {
        const nextData = listOrObjToMap(action.payload.data);
        let list = [];
        if (Array.isArray(action.payload.data)) {
          list = action.payload.data;
        }
        return {
          ...state,
          data: {
            ...state.data,
            ...nextData,
          },
          list,
          isFetching: false,
        };
      }
      return state;
    },
    [types.LOAD_FAIL]: state => ({
      ...state,
      isFetching: false,
    }),

    default: state => state,
  };
}
