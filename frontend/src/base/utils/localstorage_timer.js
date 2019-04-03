/**
 * @file frontend.src.base.utils.localstorage_timer.js
 * @author Panagiotis Tzimos.
 *
 * Utility function that is used to set a key-value pair
 * at localstorage.
 */

import { LocalStorage } from 'storage-manager';
import { TIME_TO_TTL } from '../constants';

/**
 *
 * @param {string} key
 * @param {string} value
 */
const setToSessionStorage = (key, value) => {
		LocalStorage.set(key, value, { seconds: TIME_TO_TTL });
};

export default setToSessionStorage;
