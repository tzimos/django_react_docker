/**
 * @file frontend.src.pages.dahsboard.tasks.components.TaskModal.js
 * @author Panagiotis Tzimos.
 *
 * The TaskModal component.
 */

import React, {Component} from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import TaskEdit from "./TaskEdit";

import getAuthHeader from "../../../../base/utils/authorisation_token";

import '../styles/task_modal.scss';
import apiUrls from "../../../../base/api_urls";
import {LocalStorage} from "storage-manager/src";


class TaskModal extends Component {

    /**
     * Set the pros values to the state in order to
     * initialize the values of the inputs.
     *
     * @param props
     */
    constructor(props) {
        super(props);
        this.state = {
            'mode': this.props.mode,
            'child_state': {}
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.renderModalContext = this.renderModalContext.bind(this);
    }


    /**
     * This method is listening to changes happening
     * at any input that it's changing and sends the new
     * state.
     *
     * @param _state - The childs state.
     */
    handleChange = (_state) => {
        this.setState({
            child_state: _state
        })
    };

    /**
     * Submit handler.
     *
     */
    handleSubmit = () => {
        const token = LocalStorage.get('token'),
            child_state = this.state.child_state,
            url = apiUrls.edit_task;

        if (child_state) {
            axios({
                method: 'post',
                url,
                headers: getAuthHeader(token),
                data: child_state
            })
                .then((response) => {
                    this.props.handleRefresh(response.data)
                })
                .catch(error => <div>error: {error.response.data}</div>);
        }
        this.props.closeIt();

    };

    renderModalContext = () => {
        return (
            this.state.mode === 'edit' ?
                <TaskEdit
                    task_id={this.props.task.task_id}
                    title={this.props.task.title}
                    is_public={this.props.task.is_public}
                    due_date={this.props.task.due_date}
                    details={this.props.task.details}
                    handleChange={this.handleChange}
                />
                : null
        )
    };


    render = () => {
        return (
            <>
                <Modal show={this.props.show} onHide={this.props.closeIt}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            {
                                this.state.mode === 'edit'
                                    ? "Edit"
                                    : "Create"
                            }
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {this.renderModalContext()}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.props.closeIt}>
                            Close
                            Close
                        </Button>
                        <Button variant="primary" onClick={this.handleSubmit}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    };
}

TaskModal.propTypes = {
    task: PropTypes.object,
    mode: PropTypes.string,
    closeIt: PropTypes.func,
    show: PropTypes.bool,
    handleRefresh: PropTypes.func,
};


export default TaskModal;
