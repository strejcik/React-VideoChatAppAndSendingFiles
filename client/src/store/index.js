import { createBrowserHistory } from 'history';
import { applyMiddleware, createStore } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import { persistReducer } from 'redux-persist';
import { composeWithDevTools } from 'redux-devtools-extension';

import storage from 'redux-persist/lib/storage';

import thunk from 'redux-thunk'

import reducers from '../reducers/index';

const persistConfig = {
    key: 'root',
    storage,
}

export const history = createBrowserHistory();


export default function configureStore(preloadedState) {
	const persistedReducer = persistReducer(persistConfig, reducers(history));
    const store = createStore(
      persistedReducer,
      preloadedState,
      composeWithDevTools(
        applyMiddleware(
          routerMiddleware(history),
          thunk,
        ),
      ),
    )
    return store;
}