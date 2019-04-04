/**
 * @file frontend.src.pages.dahsboard.tasks.components.TasksPrivate.js
 * @author Panagiotis Tzimos.
 *
 * The TasksPrivate component.
 */

import React, {Component} from 'react';
import {LocalStorage} from 'storage-manager/src';
import axios from 'axios';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import apiUrls from '../../../../base/api_urls';
import getAuthHeader from '../../../../base/utils/authorisation_token';
import {setTasksData} from '../redux/actions/setTaskDataFromApi';
import TasksBase from './TasksBase';
import NoTasks from "./NoTasks";
import Loader from "../../../../shared/components/Loader";


class TasksPrivateConnected extends Component {

    constructor(props) {
        super(props);
        this.state = {
            'loading': true,
        };
        this.tasksRenderer = this.tasksRenderer.bind(this);
        this.renderLoading = this.renderLoading.bind(this);
    }

    /**
     * This method is used to populate the tasks.
     * It populates through a server call the tasks,
     * which will be included before the current component
     * is mount.
     */
    componentWillMount = () => {
        const token = LocalStorage.get('token');
        const url = apiUrls.tasks_private;
        axios({
            method: 'get',
            url,
            headers: getAuthHeader(token)
        })
            .then((response) => {
                this.props.setTasksData(response.data);
            })
            .catch(error => (<div>error: {error.response.data}</div>))
            .then(() => {
                setTimeout(() => {
                    this.setState({loading: false})
                }, 500)
            });
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
     * Method that returns conditionally
     * the TaskBase or th NoTasks Component.
     * If one of them or none of them is
     * rendered is a factor of loading
     * and if the taskData Array has
     * any elements.
     *
     * @return {Array}
     */
    tasksRenderer = () => {
        let result = [];

        if (!this.state.loading) {

            this.props.taskData.length === 0
                ? result = <NoTasks
                    mode={'tasksPrivate'}
                />
                :
                result = <TasksBase
                    tasks={this.props.taskData}
                />
        }
        return result;
    };

    render = () => {
        return (
            <div>
                {this.renderLoading()}
                {this.tasksRenderer()}
            </div>
        );
    };

}


TasksPrivateConnected.propTypes = {
    taskData: PropTypes.array,
    setTasksData: PropTypes.func
};

const mapStateToProps = state => ({taskData: state.taskData.taskData});

const mapDispatchToProps = dispatch => ({
    setTasksData: val => dispatch(setTasksData(val))
});


const TasksPrivate = connect(mapStateToProps, mapDispatchToProps)(TasksPrivateConnected);
export default TasksPrivate;
