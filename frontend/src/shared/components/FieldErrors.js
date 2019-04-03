/**
 * @file frontend.src.shared.components.FieldErrors.js
 * @author Panagiotis Tzimos.
 *
 * The FieldErrors component.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import '../styles/field_errors.scss';

class FieldErrors extends Component {
		render() {
				return (
						<div>
								<div className='row field-errors-container'>
										<div className='col-12'>
												<div className='errors-style'>
														*{' ' + this.props.error}
												</div>
										</div>
										<br/>
								</div>
						</div>
				);
		}
}

FieldErrors.propTypes = {
		error: PropTypes.string
};

export default FieldErrors;
