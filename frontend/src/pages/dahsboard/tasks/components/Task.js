/**
 * @file frontend.src.pages.dahsboard.tasks.components.Task.js
 * @author Panagiotis Tzimos.
 *
 * The Task base component.
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {LocalStorage} from 'storage-manager/src';

import TaskModal from './TaskModal';
import apiUrls from '../../../../base/api_urls';
import axios from 'axios';
import getAuthHeader from '../../../../base/utils/authorisation_token';

import '../styles/task.scss';


class TaskConnected extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showEditModal: false,
            mode: null,
        };
        this.handleEditing = this.handleEditing.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleMarkAsDone = this.handleMarkAsDone.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.renderModal = this.renderModal.bind(this);
        this.showDeleteBtn = this.showDeleteBtn.bind(this);
    }

    /**
     * Method that handles what happens when the user clicks on
     * edit button.
     */
    handleEditing = () => {
        this.setState((state) => {
            return {showEditModal: !state.showEditModal};
        });
    };

    /**
     * Method that handles what happens when the user clicks on
     * close button.
     */
    handleClose = () => {
        this.setState((state) => {
            return {showEditModal: !state.showEditModal};
        });
    };

    /**
     * This method is used when the user tries to mark as done
     * on not yet done task. It does it through a request on the server,
     * and then it fetches the new task data.
     *
     */
    handleMarkAsDone = () => {
        const token = LocalStorage.get('token');
        const url = apiUrls.mark_as_done;
        axios({
            method: 'post',
            url,
            headers: getAuthHeader(token),
            data: {'id': this.props.task_id}
        })
            .then((response) => {
                this.props.handleRefresh(response.data);

            })
            .catch(error => (<div>error: {error.response.data}</div>));
    };

    handleDelete = (e) => {
        const token = LocalStorage.get('token');
        const url = apiUrls.delete_task;
        axios({
            method: 'post',
            url,
            headers: getAuthHeader(token),
            data: {'task_id': this.props.task_id}
        })
            .then((response) => {
                this.props.handleDelete(this.props.task_id);
            })
            .catch(error => (<div>error: {error.response.data}</div>));
    };

    showDeleteBtn = () => {
        return LocalStorage.get('email')===this.props.author
    };

    /**
     * This method returns a modal fragment which
     * is triggered when the user clicks on open modal.
     * @return {jsx}
     */
    renderModal = () => {
        return (
            <TaskModal
                handleRefresh={this.props.handleRefresh}
                key={this.props.task_id}
                mode='edit'
                task={this.props}
                show={this.state.showEditModal}
                closeIt={this.handleClose}/>
        );
    };

    render = () => {
        return (
            <div className="col-3">
                <div className="col-12 container-fluid">
                    {this.renderModal()}

                    <div className="card  task-card">
                        <div className="card-header">
                            <b>Task</b>
                            {!this.props.is_public
                                ? <small className="pull-right card-is-private">private</small>
                                : ''}
                        </div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                                <div className="row">
                                    <div className="col"><b>Title:</b></div>
                                    <div className="col">{this.props.title}</div>
                                </div>
                            </li>
                            <li className="list-group-item">
                                <div className="row">
                                    <div className="col"><b>Author:</b></div>
                                    <div className="col">{this.props.author}</div>
                                </div>
                            </li>
                            <li className="list-group-item">
                                <div className="row">
                                    <div className="col"><b>Created:</b></div>
                                    <div className="col">{this.props.created}</div>
                                </div>
                            </li>
                            <li className="list-group-item">
                                <div className="row">
                                    <div className="col"><b>Modified:</b></div>
                                    <div className="col">{this.props.modified}</div>
                                </div>
                            </li>
                            <li className="list-group-item">
                                <div className="row">
                                    <div className="col"><b>Done:</b></div>
                                    <div className="col"><i
                                        className={
                                            this.props.done
                                                ? 'fas fa-check'
                                                : 'fas fa-times-circle'}>
                                    </i>
                                    </div>
                                </div>
                            </li>
                            <li className="list-group-item">
                                <div className="row">
                                    <div className="col"><b>Done by</b>:</div>
                                    <div className="col">{this.props.done_by}</div>
                                </div>
                            </li>
                            <li className="list-group-item">
                                <div className="row">
                                    <div className="col"><b>Due date:</b></div>
                                    <div className="col">{this.props.due_date}</div>
                                </div>
                            </li>

                        </ul>
                        <div className="list-group-item">
                            <p className="card-text">{this.props.details}</p>
                        </div>
                        <div className="card-body">
                            <div className="row col-centered">
                                <div onClick={this.handleEditing} className="col-centered">
                                    <a className="btn btn-lg">Edit</a>
                                </div>
                                { this.showDeleteBtn
                                    ?
                                    <div onClick={this.handleDelete} className="col-centered">
                                        <a className="btn btn-lg">Delete</a>
                                    </div>
                                    : null
                                }
                                {!this.props.done
                                    ?
                                    <div onClick={this.handleMarkAsDone} className="col-centered">
                                        <a className="btn btn-lg">Mark as done</a>
                                    </div>
                                    : ''}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
}

TaskConnected.propTypes = {
    task_id: PropTypes.number,
    title: PropTypes.string,
    author: PropTypes.string,
    details: PropTypes.string,
    created: PropTypes.string,
    modified: PropTypes.string,
    done: PropTypes.bool,
    done_by: PropTypes.string,
    due_date: PropTypes.string,
    is_public: PropTypes.bool,
    handleRefresh: PropTypes.func,
    handleDelete: PropTypes.func,
};

const mapStateToProps = state => ({taskData: state.taskData.taskData});


const Task = connect(mapStateToProps, null)(TaskConnected);

export default Task;
