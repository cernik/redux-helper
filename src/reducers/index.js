import { getFilters as getLoadFilters } from './withLoad';
import { getFilters as getRefreshFilters } from './withRefresh';
import { getFilters as getCreateFilters } from './withCreate';
import { getFilters as getUpdateFilters } from './withUpdate';
import { getFilters as getDeleteFilters } from './withDelete';
import { getFilters as getAppendFilters } from './withAppend';

function createReducer(getFiltersFn) {
  return types => {
    const filters = getFiltersFn(types);
    return (state, action) => {
      const filterStateFn = filters[action.type] || filters.default;
      const nextState = filterStateFn(state, action);
      return nextState;
    };
  };
}

export const withLoad = createReducer(getLoadFilters);
export const withRefresh = createReducer(getRefreshFilters);
export const withCreate = createReducer(getCreateFilters);
export const withUpdate = createReducer(getUpdateFilters);
export const withDelete = createReducer(getDeleteFilters);
export const withAppend = createReducer(getAppendFilters);

export const defaultInitialState = {
  data: {},
  list: [],
  isFetching: false,
  errorMessage: '',
};

export const pipeReducers = (...fns) => (state, action) =>
  fns.reduce((v, fn) => fn(v, action), state);

export const configureReducer = (types = {}) => (...reducers) => (
  initialState = defaultInitialState
) => (
  state = {
    ...defaultInitialState,
    ...initialState,
  },
  action = { type: '', payload: {} }
) =>
  pipeReducers(
    // ...reducers
    ...reducers.map(fn => fn(types))
  )(state, action);
