/**
 * @file src.base.redux.authentication.reducers.userLoggedInReducer.js
 * @author Panagiotis Tzimos.
 *
 * These reducers job is to check if the user
 * is logged in or not at the local storage.
 */

import { LocalStorage } from 'storage-manager';

import { LOGIN_USER, LOGOUT_USER } from '../constants';
import setToSessionStorage from '../../../utils/localstorage_timer';


/**
 *
 * @type {{logged_in: boolean}}
 */
const userLoggedInReducerinitialState = {
		logged_in: !!LocalStorage.get('logged_in')
};

/**
 *
 * @param {Object} state
 * @param {function} action
 * @returns {{logged_in: boolean}}
 */
function userLoggedInReducer(state = userLoggedInReducerinitialState, action) {
		if (action.type === LOGIN_USER) {
				setToSessionStorage('logged_in', 'true');
				state = { ...state, ...{ logged_in: true } };
		}
		if (action.type === LOGOUT_USER) {
				LocalStorage.set('logged_in', false);
				LocalStorage.remove('token');
				state = { ...state, ...{ logged_in: false } };
		}
		return state;
}


export { userLoggedInReducer, userLoggedInReducerinitialState };
