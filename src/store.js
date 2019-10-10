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
