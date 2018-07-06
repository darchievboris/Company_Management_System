import { createStore, applyMiddleware, compose } from 'redux';
import { autoRehydrate, persistStore } from 'redux-persist';
import localForage from 'localforage';

// Redux Thunk need to be added as a middleware
import thunkMiddleware from 'redux-thunk';

// Redux logging middleware
import { createLogger } from 'redux-logger';

// Import the root reducer
import rootReducer from '../reducers/index';

// Create the redux logging middleware
const loggerMiddleware = createLogger();

// Configuring the Store.
export function configureStore() {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  return new Promise((resolve, reject) => {
    try {
      const store = createStore(
        rootReducer,
        composeEnhancers(autoRehydrate(), applyMiddleware(thunkMiddleware, loggerMiddleware))
      );
      persistStore(
        store,
        {
          storage: localForage,
          blacklist: ['auth', 'clients'],
        },
        () => resolve(store)
      );
    } catch (e) {
      reject(e);
    }
  });
}
