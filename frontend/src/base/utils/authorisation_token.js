/**
 * 	 @file src.base.utils.authorisation_token.js
 * 	 @author Panagiotis Tzimos.
 *
 *   Utility function that returns the authentication
 *   header. It will be used in every request that is sent
 *   to server and requires the user to be authenticated.
 *
 */

/**
 *
 * @param {string} token
 * @returns {{Authorization: string}}
 */
const getAuthHeader = token => ({ Authorization: `JWT ${token}` });

export default getAuthHeader;
