/**
 * @file frontend.src.pages.dahsboard.tasks.components.TasksAll.js
 * @author Panagiotis Tzimos.
 *
 * The TasksAll component.
 */

import React, {Component} from 'react';
import {LocalStorage} from 'storage-manager/src';
import axios from 'axios';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import apiUrls from '../../../../base/api_urls';
import getAuthHeader from '../../../../base/utils/authorisation_token';
import {setTasksData} from '../redux/actions/setTaskDataFromApi';
import TasksBase from './TasksBase';
import NoTasks from "./NoTasks";


class TasksAllConnected extends Component {

    /**
     * This method is used to populate the tasks.
     * It populates through a server call the tasks,
     * which will be included before the current component
     * is mount.
     */
    componentWillMount = () => {

        const token = LocalStorage.get('token');
        const url = apiUrls.tasks_all;
        axios({
            method: 'get',
            url,
            headers: getAuthHeader(token)
        })
            .then((response) => {
                this.props.setTasksData(response.data);

            })
            .catch(error => <div>error: {error.response.data}</div>);
    };


    render = () => {
        return (
            <div>{
                this.props.taskData.length !== 0
                    ?
                    <TasksBase
                        tasks={this.props.taskData}
                    />
                    :
                    <NoTasks
                        mode={'tasksAll'}
                    />}
            </div>);
    };

}


TasksAllConnected.propTypes = {
    taskData: PropTypes.array,
    setTasksData: PropTypes.func
};

const mapStateToProps = state => ({taskData: state.taskData.taskData});

const mapDispatchToProps = dispatch => ({
    setTasksData: val => dispatch(setTasksData(val))
});


const TasksAll = connect(mapStateToProps, mapDispatchToProps)(TasksAllConnected);
export default withRouter(TasksAll);
