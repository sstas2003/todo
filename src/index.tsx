import React from 'react';
import { render } from 'react-dom';

import { Provider } from 'react-redux';
import './index.css';
import App from './components/App';
import { createStore } from 'redux';
import rootReducers from './store/reducers';

const store = createStore(rootReducers);

const appElement = document.getElementById('root');

render(
    <Provider store={store}>
        <App/>
    </Provider>
    ,appElement);
