import { listOrObjToMap } from './helper';

export function getFilters(types) {
  return {
    [types.APPEND_SUCCESS]: (state, action) => {
      if (action.payload.data) {
        const nextData = listOrObjToMap(action.payload.data);
        return {
          ...state,
          data: {
            ...state.data,
            ...nextData,
          },
        };
      }
      return state;
    },
    default: state => state,
  };
}
