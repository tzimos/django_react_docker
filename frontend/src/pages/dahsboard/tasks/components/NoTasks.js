/**
 * @file frontend.src.pages.dahsboard.tasks.components.NoTasks.js
 * @author Panagiotis Tzimos.
 *
 * When there are no Tasks this components should appear.
 */


import React, {Component} from 'react';
import {connect} from "react-redux";
import PropTypes from 'prop-types';

import {extraNavbarContext} from "../../../../navbar/redux/actions/extra_navbar_context";

import '../styles/no_tasks.scss'
import Link from "react-router-dom/es/Link";

class NoTasksConnected extends Component {

    constructor(props) {
        super(props);
        this.message = this.message.bind(this)
    }

    componentWillMount = () => {
        const extra_navbar_context = [
            {
                'redirect_url': '/dashboard/tasks/all',
                'name': 'All Tasks',
                'id': 2
            },
            {
                'redirect_url': '/dashboard/tasks/private',
                'name': 'Private',
                'id': 3
            },
            {
                'redirect_url': '/dashboard/tasks/create',
                'name': 'Create',
                'id': 4
            }
        ];
        this.props.extraNavbarContext(extra_navbar_context);
    };

    message = () => {
        let msg = [];

        if (this.props.mode === 'tasksAll') {
            msg.push(
                <div>
                    <div className='row justify-content-center align-items-center'>
                        <h1> Oops... nothing to do...</h1>
                    </div>
                    <div id='notasks-fix-this' className='row justify-content-center align-items-center'>
                        <h6>But lets fix this</h6>
                    </div>
                </div>
            )

        } else {
            msg.push(
                <div>
                    <div className='row justify-content-center align-items-center'>
                        <h4>We are sure that you have something to do,<br/> but you don't want anyone to know</h4>
                    </div>
                    <div id='notasks-fix-this' className='row justify-content-center align-items-center'>
                        <h6>Only a click away</h6>
                    </div>
                </div>
            )
        }

        return msg;
    };

    render = () => {
        return (
            <div>
                <div className='container h-100 '>
                    <div className="no-tasks-container">
                        {this.message()}
                        <div className='row justify-content-center align-items-center'>
                            <a className="no-tasks-create-btn" href={'/dashboard/tasks/create'}>Create</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

NoTasksConnected.propTypes = {
    extraNavbarContext: PropTypes.func,
    mode: PropTypes.string
};

const mapDispatchToProps = dispatch => (
    {extraNavbarContext: val => dispatch(extraNavbarContext(val))}
);


const NoTasks = connect(null, mapDispatchToProps)(NoTasksConnected);

export default NoTasks;
