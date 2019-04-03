/**
 *   @file src.base.utils.email_validation.js
 * 	 @author Panagiotis Tzimos.
 *
 *   Utility function that checks through regex
 *   if the given email is a valid one.
 */


/**
 * @param {string} email - The given email.
 * @returns {Array}
 */
const validateEmail = (email) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  if (!re.test(String(email).toLowerCase())) {
    return ['Please enter a valid email address.']
  } if (email.length === 0) {
    return ['Please enter your email address.']
  }
  return []
}

export default validateEmail
