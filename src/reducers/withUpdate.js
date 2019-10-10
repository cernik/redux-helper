import { toList, updateMapItem } from './helper';

export function getFilters(types) {
  return {
    [types.UPDATE]: state => ({
      ...state,
      isFetching: true,
    }),
    [types.UPDATE_SUCCESS]: (state, action) => {
      if (action.payload.data) {
        const nextData = toList(action.payload.data);

        return {
          ...state,
          data: nextData.reduce(updateMapItem, state.data || {}),
          isFetching: false,
        };
      }
      return state;
    },
    [types.UPDATE_FAIL]: state => ({
      ...state,
      isFetching: false,
    }),

    default: state => state,
  };
}
