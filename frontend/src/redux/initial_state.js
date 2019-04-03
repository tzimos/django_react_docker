/**
 * @file frontend.src.redux.initial_state.js
 * @author Panagiotis Tzimos.
 *
 * This is the global initial state from all reducers project wide.
 */

import { userLoggedInReducerinitialState } from '../base/redux/authentication/reducers/userLoggedInReducer';
import { setTaskDataFromApiReducerInitialState } from '../pages/dahsboard/tasks/redux/reducers/setTaskDataFromApiReducer';
import { extraNavbarContextInitialState } from '../navbar/redux/reducer/extraNavbarContextReducer';


const initialState = {
		taskData: setTaskDataFromApiReducerInitialState,
		logged_in: userLoggedInReducerinitialState,
		extra_navbar_context: extraNavbarContextInitialState,
};


export default initialState;
