import { createLogger } from 'redux-logger';
import axios from 'axios';
import createAxiosMiddleware, {
  multiClientMiddleware,
} from 'redux-axios-middleware';

const axiosClient = (clientConfig = { baseURL: 'http://localhost:8081' }) =>
  axios.create({
    ...clientConfig,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

const logger = (options = {}) =>
  createLogger({
    collapsed: true,
    diff: true,
    ...options,
  });

export const axiosMiddleware = (clientConfig = {}, options = {}) => {
  const client = axiosClient(clientConfig);
  return createAxiosMiddleware(client, options);
};

export const withAxios = (client = {}, options = {}) => (middlewares = []) =>
  middlewares.concat([axiosMiddleware(client, options)]);

const createClients = (clients = {}) =>
  Object.keys(clients).reduce((acc, name) => {
    const client = axiosClient(clients[name]);
    return { ...acc, [name]: { client } };
  }, {});

export const withAxiosMultiClient = (clients = {}, options = {}) => (
  middlewares = []
) => {
  const axiosClients = createClients(clients);
  return middlewares.concat([multiClientMiddleware(axiosClients, options)]);
};

export const withLogger = (options = {}) => (middlewares = []) =>
  middlewares.concat([logger(options)]);

export const configureMiddlewares = (...fns) => (middlewares = []) =>
  fns.reduce((acc, fn) => fn(acc), middlewares);
