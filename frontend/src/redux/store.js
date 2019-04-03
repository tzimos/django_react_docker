/**
 * @file frontend.src.redux.store.js
 * @author Panagiotis Tzimos.
 *
 * This is the global store.
 */

import { createStore } from 'redux';

import initialState from './initial_state';
import rootReducer from './reducers';

const enhancer = process.env.DEBUG
		? window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
		: initialState;


const store = createStore(rootReducer, enhancer);

export default store;
