import { Map, fromJS } from 'immutable';
import {
  install as reduxLoopInstall,
  loop,
  combineReducers,
} from 'redux-loop-symbol-ponyfill';

import { enableBatching } from 'redux-batched-actions';
import { createStore, applyMiddleware, compose } from 'redux';
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
  return loop(fromJS(nextState), effects);
};

export const configureStoreWithImmutable = (
  reducers = {},
  middlewares = []
) => {
  const rootReducer = enableBatching(
    combineReducers(
      reducers,
      immutableStateContainer,
      getImmutable,
      setImmutable
    )
  );

  const store = createStore(
    configureReducer(rootReducer),
    composeEnhancers(applyMiddleware(...middlewares), reduxLoopInstall)
  );
  return {
    store,
  };
};
