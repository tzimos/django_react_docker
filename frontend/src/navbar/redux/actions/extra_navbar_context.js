/**
 * @file frontend.src.navbar.redux.actions.extra_navbar_context.js
 * @author Panagiotis Tzimos.
 *
 * This actions's job is to inject additional
 * context in the central section of the navbar.
 */

import { EXTRA_NAVBAR_CONTEXT } from '../constants';

/**
 *
 * @param {Object} value
 * @return {{type: string, value: Object}}
 */
export function extraNavbarContext(value) {
		return {
				type: EXTRA_NAVBAR_CONTEXT,
				value
		};
}
