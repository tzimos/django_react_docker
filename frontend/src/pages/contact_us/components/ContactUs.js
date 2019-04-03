/**
 * @file frontend.src.pages.components.ContactUs.js
 * @author Panagiotis Tzimos.
 *
 * The contact us base component.
 */


import React, {Component} from 'react';
import PropTypes from 'prop-types';
import axios from "axios";
import {connect} from "react-redux";
import {LocalStorage} from "storage-manager/src";

import apiUrls from "../../../base/api_urls";
import validateEmail from '../../../base/utils/email_validation';
import getAuthHeader from "../../../base/utils/authorisation_token";

import FormFieldInput from "../../../shared/components/Fields";

import '../styles/contact_us.scss'

class ContactUsConnected extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            subject: '',
            errors: {
                email: [],
                non_field_errors: []
            },
            show_errors: false,
            labels: {
                email: 'Email: ',
                subject: 'Subject: '
            },
            message: '',
            message_max_length: 1000,
            message_current_length: 0
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleMessageChange = this.handleMessageChange.bind(this);
        this.fields = this.fields.bind(this);
    }

    componentWillMount() {
        const token = LocalStorage.get('token');
        const headers = getAuthHeader(token);
        if (!this.props.logged_in) {
            return;
        }
        axios({
            method: 'post',
            url: apiUrls.current_user,
            headers: headers
        }).then(
            response => {
                this.setState({email: response.data.email})
            }
        )
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
     * Event listener that is triggered when a change
     * happens in the input, and sets the new state in
     * each variable.
     *
     * @param {Object} e - the usual synthetic event
     */
    handleChange = (e) => {
        const {name} = e.target;
        const new_val = e.target.value;

        this.setState({[name]: new_val});

        if (name === 'email') {
            this.setState((state) => {
                state.errors[name] = validateEmail(state[name]);
            });
        }

        this.setState((state) => {
            state.has_errors = ContactUs.has_errors(state.errors);
        });
    };

    handleMessageChange = (e) => {
        let message = e.target.value;
        this.setState({
            message: message,
            message_current_length: message.length
        });

    };

    handleSubmit = () => {
        this.setState({show_errors: true});
        // TODO:make a request to the backend to process the message the user is sending
    };

    /**
     * Method that returns an Array of FormFieldInput components
     * based on the given field names that we provide.
     *
     * @return {Array}
     */
    fields = () => {
        let field_names = ['email'],
            result = [];

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
                <div className='row justify-content-center align-items-center contact-us-form-container'>

                    <form className='form-inner'>
                        {this.fields()}
                        <div className='row contac-us-message-container'>
                            <div className='col-3'>
                                <label htmlFor='text'>Message: </label>
                            </div>
                            <div className="col-9">
                            <textarea className="contact-us-textarea"
                                      value={this.state.message}
                                      onChange={this.handleMessageChange}
                            />
                            </div>
                        </div>
                        <div className="float-right">
                            {this.state.message_current_length}/{this.state.message_max_length}
                        </div>
                        <div className='contact-us-buttons'>
                            <div className='contact-us-submit-btn'>
                                <a onClick={this.handleSubmit}>Submit</a>
                            </div>

                            <div className='contact-us-submit-btn'>
                                <a onClick={this.props.history.goBack}>Back</a>
                            </div>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
}


ContactUsConnected.propTypes = {
    history: PropTypes.object,
    onChange: PropTypes.func,
    logged_in: PropTypes.bool
};


const mapStateToProps = state => ({logged_in: state.logged_in.logged_in});


const ContactUs = connect(mapStateToProps, null)(ContactUsConnected);
export default ContactUs;
