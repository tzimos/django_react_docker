/**
 * @file frontend.src.base.api_urls.js
 * @author Panagiotis Tzimos.
 *
 * Url endpoints for the backend.
 */

const host = process.env.API_HOST;

const apiUrls = {
		obtain_token: `${host}/api/auth/token-auth/`,
		current_user: `${host}/api/auth/current_user/`,
		create_user: `${host}/api/auth/create_user/`,
		refreh_token: `${host}/api/auth/refresh-token/`,
		tasks_all: `${host}/api/tasks/all-public/`,
		tasks_private: `${host}/api/tasks/all-private/`,
		mark_as_done: `${host}/api/tasks/mark-as-done/`,
		edit_task: `${host}/api/tasks/edit/`,
		create_task: `${host}/api/tasks/create/`,
		delete_task: `${host}/api/tasks/delete/`
};

export default apiUrls;
