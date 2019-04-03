/**
 * @file src.base.redux.authentication.actions.index.js
 * @author Panagiotis Tzimos.
 *
 *
 *   These actions are passed to the reducers and
 *   they are processed accordingly.
 */

import { LOGIN_USER, LOGOUT_USER } from '../constants';

/**
 *
 * @param {boolean} value
 * @returns {{type: string, value: boolean}}
 */
export function loginUser(value) {
		return {
				type: LOGIN_USER,
				value
		};
}

/**
 *
 * @param {boolean} value
 * @returns {{type: string, value: boolean}}
 */
export function logoutUser(value) {
		return {
				type: LOGOUT_USER,
				value
		};
}
