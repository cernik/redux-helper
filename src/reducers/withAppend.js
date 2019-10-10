import { listOrObjToMap } from './helper';

export function getFilters(types) {
  return {
    [types.APPEND_SUCCESS]: (state, action) => {
      if (action.payload.data) {
        let nextData = {};
        if (Array.isArray(action.payload.data)) {
          nextData = action.payload.data;
        } else {
          nextData = [action.payload.data];
        }

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
    [types.APPEND_FAIL]: state => ({
      ...state,
    }),
    default: state => state,
  };
}
