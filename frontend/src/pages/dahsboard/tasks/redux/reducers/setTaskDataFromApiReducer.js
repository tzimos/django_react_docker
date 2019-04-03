/**
 * @file frontend.src.pages.dahsboard.tasks.redux.reducers.setTaskDataFromApiReducer.js
 * @author Panagiotis Tzimos.
 *
 * This reducer's job to define the tasks data.
 */

import { SET_TASKS_DATA_FROM_API } from '../constants';

const setTaskDataFromApiReducerInitialState = { taskData: [] };

const setTaskDataFromApiReducer = (state = setTaskDataFromApiReducerInitialState, action) => {
		if (action.type === SET_TASKS_DATA_FROM_API) {
				return { ...state, ...{ taskData: action.value } };
		}
		return state;
};

export { setTaskDataFromApiReducer, setTaskDataFromApiReducerInitialState };
