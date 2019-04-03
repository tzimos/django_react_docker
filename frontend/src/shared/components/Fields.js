/**
 * @file frontend.src.shared.components.Fields.js
 * @author Panagiotis Tzimos.
 *
 * The FormFieldInput component.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import FieldErrors from './FieldErrors';

import '../styles/fields.scss';

class FormFieldInput extends Component {
		constructor(props) {
				super(props);
				this.fieldErrors = this.fieldErrors.bind(this);
		}

		/**
		 * This method returns a list of FieldErrors components
		 * that they are going to render to each field if it has an
		 * error.
		 *
		 * @return {Array}
		 */
		fieldErrors = () => {
				const errors = this.props.errors[this.props.field_name];

				if (!errors.length || !this.props.show_errors) {
						return;
				}
				const result = [];

				errors.map((error, index) => {
						result.push(
								<FieldErrors
										key={index}
										error={error}
								/>
						);
				});
				return result;
		};

		render = () => {
				return (
						<div>
								<div className='row'>
										<div onKeyPress={this.props.onKeyPress} className='col-3 login-form-fields'>
												<label htmlFor={this.props.for}>
														{this.props.field_label}
														{' '}
												</label>
										</div>
										<div onKeyPress={this.props.onKeyPress} className='col-9 login-form-fields'>
												<input
														type={this.props.type}
														onChange={this.props.handleChange} name={this.props.field_name}
														value={this.props.field_state}
												/>
										</div>
								</div>
								{this.fieldErrors()}
						</div>
				);
		};
}

FormFieldInput.propTypes = {
		field_name: PropTypes.string,
		field_label: PropTypes.string,
		field_state: PropTypes.string,
		for: PropTypes.string,
		handleChange: PropTypes.func,
		onKeyPress: PropTypes.func,
		show_errors: PropTypes.bool,
		errors: PropTypes.object,
		type: PropTypes.string
};

export default FormFieldInput;
