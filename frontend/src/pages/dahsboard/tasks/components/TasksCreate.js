/**
 * @file frontend.src.pages.dahsboard.tasks.components.TasksCreate.js
 * @author Panagiotis Tzimos.
 *
 * The TasksCreate component.
 */

import React, {Component} from 'react';


import '../styles/task_create.scss'
import {LocalStorage} from "storage-manager/src";
import axios from "axios";

import apiUrls from "../../../../base/api_urls";
import getAuthHeader from "../../../../base/utils/authorisation_token";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {extraNavbarContext} from "../../../../navbar/redux/actions/extra_navbar_context";
import {setTasksData} from "../redux/actions/setTaskDataFromApi";

class TasksCreateConnected extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            due_date: '',
            details: '',
            'is_public': false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit = () => {
        const token = LocalStorage.get('token');
        const url = apiUrls.create_task;
        console.log(this.state)
        axios({
            method: 'post',
            url,
            headers: getAuthHeader(token),
            data: this.state
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
            this.setState({is_public:!this.state.is_public})
        } else {
            this.setState(
                {[name]: new_val}
            );
        }
    };

    render = () => {
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
}


TasksCreateConnected.propTypes = {
    setTasksData: PropTypes.func
};

const mapDispatchToProps = dispatch => ({
    setTasksData: val => dispatch(setTasksData(val))
});


const mapStateToProps = state => ({
    taskData: state.taskData.taskData
});


const TasksCreate = connect(mapStateToProps, mapDispatchToProps)(TasksCreateConnected);


export default TasksCreate;
