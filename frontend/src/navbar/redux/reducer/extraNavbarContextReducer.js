/**
 * @file frontend.src.navbar.redux.reducer.extraNavbarContextReducer.js
 * @author Panagiotis Tzimos.
 *
 * This reducer's job is to enrich the navbar with extra
 * items.
 */

import { EXTRA_NAVBAR_CONTEXT } from '../constants';

const extraNavbarContextInitialState = {
		extra_navbar_context: []
};

function extraNavbarContextReducer(state = extraNavbarContextInitialState, action) {
		if (action.type === EXTRA_NAVBAR_CONTEXT) {
				state = { ...state, ...{ extra_navbar_context: action.value } };
		}
		return state;
}

export { extraNavbarContextReducer, extraNavbarContextInitialState };
