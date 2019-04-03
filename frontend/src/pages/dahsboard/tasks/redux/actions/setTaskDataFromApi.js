/**
 * @file frontend.src.pages.dahsboard.tasks.redux.actions.setTaskDataFromApi.js
 * @author Panagiotis Tzimos.
 *
 * This actions's job is to set the tasks data.
 */

import { SET_TASKS_DATA_FROM_API } from '../constants';

export const setTasksData = value => ({
		type: SET_TASKS_DATA_FROM_API,
		value
});
