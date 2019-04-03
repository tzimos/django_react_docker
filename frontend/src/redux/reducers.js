/**
 * @file frontend.src.redux.reducers.js
 * @author Panagiotis Tzimos.
 *
 * This is the global reducer which includes all the reducers project wide.
 */


import { combineReducers } from 'redux';
import { setTaskDataFromApiReducer } from '../pages/dahsboard/tasks/redux/reducers/setTaskDataFromApiReducer';
import { userLoggedInReducer } from '../base/redux/authentication/reducers/userLoggedInReducer';
import { extraNavbarContextReducer } from '../navbar/redux/reducer/extraNavbarContextReducer';

const rootReducer = combineReducers({
		taskData: setTaskDataFromApiReducer,
		logged_in: userLoggedInReducer,
		extra_navbar_context: extraNavbarContextReducer,
});


export default rootReducer;
