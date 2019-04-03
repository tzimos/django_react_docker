/**
 * @file frontend.src.pages.login.components.LoginForm.js
 * @author Panagiotis Tzimos.
 *
 * The LoginForm component.
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import {LocalStorage} from 'storage-manager';
import PropTypes from 'prop-types';

import PasswordValidator from '../../../base/utils/password_validator';
import FormFieldInput from '../../../shared/components/Fields';

import validateEmail from '../../../base/utils/email_validation';
import apiUrls from '../../../base/api_urls.js';

import {loginUser} from '../../../base/redux/authentication/actions';

import {TIME_TO_TTL} from '../../../base/constants';

import '../styles/login_form.scss';
import FieldErrors from '../../../shared/components/FieldErrors';

class LoginFormConnected extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleEnterKeyPressSubmit = this.handleEnterKeyPressSubmit.bind(this);
        this.nonFieldErrors = this.nonFieldErrors.bind(this);
        this.fields = this.fields.bind(this);
        this.state = {
            email: '',
            password: '',
            has_errors: false,
            errors: {
                email: [],
                password: [],
                non_field_errors: []
            },
            labels: {
                email: 'Email: ',
                password: 'Password: '
            },
            show_errors: false
        };
    }

    /**
     * Static method that checks if there is an error
     * in the errors Array.
     *
     * @param {Object} error
     * @return {boolean}
     */
    static has_errors = (error) => {
        for (const err in error) {
            if (error.hasOwnProperty(err) && error[err].length > 0) {
                return true;
            }
        }
        return false;
    };

    /**
     * Event listener that keeps track of the change of the inputs
     * and updates the state of the component.
     *
     * @param {Object} e - The synthetic event
     */
    handleChange = (e) => {
        const {name} = e.target;
        const new_val = e.target.value;

        this.setState({[name]: new_val});

        if (name === 'password') {
            this.setState((state) => {
                state.errors[name] = PasswordValidator(state[name]);
            });
        }
        if (name === 'email') {
            this.setState((state) => {
                state.errors[name] = validateEmail(state[name]);
            });
        }

        this.setState((state) => {
            state.has_errors = LoginForm.has_errors(state.errors);
        });
    };

    /**
     * Submit handler for this component.
     */
    handleSubmit = () => {
        this.setState({show_errors: true});
        if (this.state.has_errors && !process.env.DEBUG) {
            return;
        }
        const {email} = this.state;
        const {password} = this.state;

        axios({
            method: 'post',
            url: apiUrls.obtain_token,
            data: {
                email,
                password
            }
        })
            .then((response) => {
                LocalStorage.set('token', response.data.token, {seconds: TIME_TO_TTL});
                LocalStorage.set('email',email,{seconds: TIME_TO_TTL});
                this.props.loginUser(true);
                return this.props.history.push('/dashboard/tasks/all');
            })
            .catch((error) => {
                console.log(error)
                this.setState((state) => {
                    return state.errors.non_field_errors.push(error.response.data.non_field_errors[0]);
                });
            });
    };

    /**
     * Keypress handler, which guarantees that on hitting
     * enter key the values of the inputs will be submitted.
     *
     * @param e - The synthetic event
     * @return {*}
     */
    handleEnterKeyPressSubmit(e) {
        if (e.key === 'Enter') {
            return this.handleSubmit(e);
        }
    }

    /**
     * Method that returns the FieldErrors component
     * with the specific error, if it exists, passed into the props.
     *
     * @returns {Array}
     */
    nonFieldErrors = () => {
        const errors = Array.from(new Set(this.state.errors.non_field_errors));

        if (!errors) {
            return;
        }

        const results = [];

        errors.map((error, index) => {
            results.push(
                <FieldErrors
                    key={index}
                    error={error}
                />
            );
        });

        return results;

    };

    /**
     * Method that returns an Array of FormFieldInput components
     * based on the given field names that we provide.
     *
     * @return {Array}
     */
    fields = () => {
        const field_names = ['email', 'password'];
        const result = [];

        field_names.map(field => result.push(
            <FormFieldInput key={field}
                            for={field}
                            field_label={this.state.labels[field]}
                            handleChange={this.handleChange}
                            field_name={field}
                            field_state={this.state[field]}
                            errors={this.state.errors}
                            show_errors={this.state.show_errors}
                            onKeyPress={this.handleEnterKeyPressSubmit}
                            type={field}/>
        ));

        return result;
    };

    render = () => (
        <div>
            <div className='container h-100'>
                <div className='row justify-content-center align-items-center login-form-container'>

                    <form className='form-inner'>
                        {this.nonFieldErrors()}
                        {this.fields()}
                        <br/>

                        <div className='login-buttons'>
                            <div className='login-submit-btn'>
                                <a onClick={this.handleSubmit}>Submit</a>
                            </div>

                            <div className='login-submit-btn'>
                                <a onClick={this.props.history.goBack}>Back</a>
                            </div>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
}

LoginFormConnected.propTypes = {
    loginUser: PropTypes.func,
    history: PropTypes.object,

};

const mapStateToProps = state => ({logged_in: state.logged_in.logged_in});
const mapDispatchToProps = dispatch => ({
    loginUser: val => dispatch(loginUser(val))
});

const LoginForm = connect(mapStateToProps, mapDispatchToProps)(LoginFormConnected);
export default LoginForm;
