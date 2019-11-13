import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, Store, StoreCreator } from 'redux';
import { rootReducer } from './store/reducers';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

const store = createStore(rootReducer, applyMiddleware(logger, thunk))

const Root = ({ store } : any) => (
    <Provider store={store}>
        <App></App>
    </Provider>
);

ReactDOM.render(<Root store={store}/>, document.getElementById('root'));
serviceWorker.unregister();
