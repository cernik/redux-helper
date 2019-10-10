import { toList, filterMapItem } from './helper';

export function getFilters(types) {
  return {
    [types.DELETE]: state => ({
      ...state,
      isFetching: true,
    }),
    [types.DELETE_SUCCESS]: (state, action) => {
      if (action.payload.data) {
        const nextData = toList(action.payload.data);

        return {
          ...state,
          data: nextData.reduce(filterMapItem, state.data || {}),
          isFetching: false,
        };
      }
      return state;
    },
    [types.DELETE_FAIL]: state => ({
      ...state,
      isFetching: false,
    }),
    default: state => state,
  };
}
