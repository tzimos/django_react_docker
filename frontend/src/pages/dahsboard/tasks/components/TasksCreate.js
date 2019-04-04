/**
 * @file frontend.src.pages.dahsboard.tasks.components.TasksCreate.js
 * @author Panagiotis Tzimos.
 *
 * The TasksCreate component.
 */

import React, {Component} from 'react';
import {LocalStorage} from "storage-manager/src";
import axios from "axios";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import _ from 'lodash';

import apiUrls from "../../../../base/api_urls";
import getAuthHeader from "../../../../base/utils/authorisation_token";
import {setTasksData} from "../redux/actions/setTaskDataFromApi";
import Loader from '../../../../shared/components/Loader';

import '../styles/task_create.scss'


class TasksCreateConnected extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            due_date: '',
            details: '',
            is_public: false,
            loading: true
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.renderLoading = this.renderLoading.bind(this);
        this.renderForm = this.renderForm.bind(this);
    }

    componentWillMount = () => {
        setTimeout(() => {
                this.setState({loading: false})
            }, 500
        )
    };

    /**
     * Method that returns conditionally
     * the Loader Component
     *
     * @return {jsx}
     */
    renderLoading = () => {
        if (this.state.loading) {

            return (<Loader/>)
        }
    };

    /**
     * This method is used to render
     * the Task creation form.
     *
     * @return {jsx}
     */
    renderForm = () => {
        return (
            <div className={'task-creation-container'}>
                <div className="col-12 ">
                    <form onSubmit={this.handleSubmit}>
                        <div className="col-12 container-fluid">

                            <div className="card  task-card">
                                <div className="card-header">
                                    <b>Task</b>
                                </div>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">
                                        <div className="row">
                                            <div className="col-4"><b>Title:</b></div>
                                            <div className="col-8">
                                                <input type="text" onChange={this.handleChange}
                                                       name='title' value={this.state.title}/>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="list-group-item">
                                        <div className="row">
                                            <div className="col-4"><b>Due date:</b></div>
                                            <div className="col-8">
                                                <input name='due_date' type="text" onChange={this.handleChange}
                                                       value={this.state.due_date}/>
                                            </div>
                                        </div>

                                    </li>
                                    <li className="list-group-item">
                                        <div className="row">
                                            <div className="col"><b>Details: </b></div>
                                            <div className="col-8">
                                                <textarea name='details' cols={30}
                                                          rows={10} onChange={this.handleChange}
                                                          value={this.state.details}/>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="list-group-item">
                                        <div className="row">
                                            <div className="col"><b>Is public ? </b></div>
                                            <div className="col-8">
                                                <input type='checkbox' name='is_public'
                                                       onChange={this.handleChange}
                                                       value={this.state.is_public}/>
                                            </div>
                                        </div>
                                    </li>
                                </ul>

                                <div className="card-body">
                                    <div className="row col-centered">
                                        <div onClick={this.handleSubmit} className="col-centered">
                                            <a className="btn btn-lg">Create</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>

            </div>
        )
    };

    handleSubmit = () => {
        const token = LocalStorage.get('token');
        const url = apiUrls.create_task;
        let fields = _.clone(this.state);

        delete fields.loading;

        axios({
            method: 'post',
            url,
            headers: getAuthHeader(token),
            data: fields
        })
            .then((response) => {
                this.props.history.push('/dashboard/tasks/all')
            })
            .catch(error => (<div>error: {error.response.data}</div>));
    };


    handleChange = (e) => {
        const name = e.target.name;
        let new_val = e.target.value;

        if (name === 'is_public') {
            this.setState({is_public: !this.state.is_public})
        } else {
            this.setState(
                {[name]: new_val}
            );
        }
    };

    render = () => {
        return (
            <div>
                {!this.state.loading
                    ? this.renderForm()
                    : this.renderLoading()}</div>
        )
    };
}


TasksCreateConnected.propTypes = {
    setTasksData: PropTypes.func,
    history: PropTypes.array
};

const mapDispatchToProps = dispatch => ({
    setTasksData: val => dispatch(setTasksData(val))
});


const mapStateToProps = state => ({
    taskData: state.taskData.taskData
});


const TasksCreate = connect(mapStateToProps, mapDispatchToProps)(TasksCreateConnected);


export default TasksCreate;
