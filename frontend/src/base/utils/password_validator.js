/**
 * @file frontend.src.base.utils.password_validator.js
 * @author Panagiotis Tzimos.
 *
 * Password validator utility function.
 */

/**
 *
 * @param {string} val - The given password
 * @param {int} len - The length that the password needs to have
 * @return {Array} - Array of error messages.
 */
const PasswordValidator = (val, len = 8) => {
		if (process.env.DEBUG) {
				return [];
		}
		const msgs = [];
		const lengthMsg = `Password must be at least ${len} characters long.`;
		const defaultOneNum = 'Must contain at least one digit.';
		const defaultOneCap = 'Must contain at least one capital letter';
		const defaultOneLower = 'Must contain at least one lowercase letter.';
		const defaultOneSymbol = 'Must contain at least one symbol.';
		const numRegex = new RegExp(/\d/);
		const capitalLetterRegex = new RegExp(/[A-Z]/);
		const lowerLetterRegex = new RegExp(/[a-z]/);
		const symbolRegex = new RegExp(/\W|_/g);

		if (!numRegex.test(val)) {
				msgs.push(defaultOneNum);
		}
		if (!capitalLetterRegex.test(val)) {
				msgs.push(defaultOneCap);
		}
		if (!lowerLetterRegex.test(val)) {
				msgs.push(defaultOneLower);
		}
		if (!symbolRegex.test(val)) {
				msgs.push(defaultOneSymbol);
		}

		if (val.length <= len) {
				msgs.push(lengthMsg);
		}

		return msgs;
};

export default PasswordValidator;
