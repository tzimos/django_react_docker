/**
 *   @file src.base.utils.get_value.js
 * 	 @author Panagiotis Tzimos.
 *
 *   Utility function that works the same as
 *   Python get method at a dictionary object.
 *
 */


/**
 * @param {Object} obj
 * @param {string} _property
 * @param {*} _default
 * @return {*}
 */
const getVal = (obj, _property, _default = '') => {
		if (obj === null || obj === undefined || !obj.hasOwnProperty(_property)) {
				return _default;
		}

		return obj[_property];

};

export default getVal;
