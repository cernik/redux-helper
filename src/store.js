import { Map, fromJS } from 'immutable';
import * as reduxLoop from 'redux-loop-symbol-ponyfill';
import { enableBatching } from 'redux-batched-actions';
import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from '@react-native-community/async-storage';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; //eslint-disable-line

const persistConfigDefault = {
  key: 'root',
  storage,
  blacklist: [],
};

export const configureStoreWithPersistStore = (options = {}) => (
  reducers = {},
  middlewares = []
) => {
  const rootReducer = combineReducers(reducers);

  const persistedReducer = persistReducer(
    { ...persistConfigDefault, ...options },
    rootReducer
  );

  const store = createStore(
    persistedReducer,
    composeEnhancers(applyMiddleware(...middlewares))
  );

  const persistor = persistStore(store);
  return { store, persistor };
};

export const configureStore = (reducers = {}, middlewares = []) => {
  const rootReducer = combineReducers(reducers);

  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(...middlewares))
  );
  return {
    store,
  };
};

// initial state, accessor and mutator for supporting root-level
// immutable data with redux-loop reducer combinator
const RESET_STATE = 'RESET_STATE';
const immutableStateContainer = Map();
const getImmutable = (child, key) => (child ? child.get(key) : undefined);
const setImmutable = (child, key, value) => child.set(key, value);

const configureReducer = (r = reducer) => (state, action) => {
  /* eslint-disable */
  const [nextState, effects] = r
    ? action.type === RESET_STATE
      ? r(action.payload, action)
      : r(state || void 0, action)
    : [null, null];
  /* eslint-enable */

  // enforce the state is immutable
  return reduxLoop.loop(fromJS(nextState), effects);
};

const createImmutableReducer = reducers =>
  enableBatching(
    reduxLoop.combineReducers(
      reducers,
      immutableStateContainer,
      getImmutable,
      setImmutable
    )
  );

export const configureStoreWithImmutable = (
  reducers = {},
  middlewares = []
) => {
  const store = createStore(
    createImmutableReducer(reducers),
    composeEnhancers(applyMiddleware(...middlewares), reduxLoop.install())
  );

  return {
    store,
  };
};
