/**
 * @file frontend.src.pages.dahsboard.tasks.components.TasksBase.js
 * @author Panagiotis Tzimos.
 *
 * The TasksBase component.
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import Task from './Task';
import getVal from '../../../../base/utils/get_value';
import {extraNavbarContext} from '../../../../navbar/redux/actions/extra_navbar_context';
import {setTasksData} from '../redux/actions/setTaskDataFromApi';

import '../styles/taskbase.scss';


class TasksBaseConnected extends Component {

    constructor(props) {
        super(props);
        this.handleRefresh = this.handleRefresh.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    /**
     * This method updates the navbar extra items when the TaskBase component
     * is about to mount
     */
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

    /**
     * This method handles the updates that happening inside the
     * a task.
     *
     * @param {Object} task
     */
    handleRefresh = (task) => {
        let index;
        let taskData = this.props.taskData;

        taskData.filter(
            (obj) => {
                if (obj.id === task.id) {
                    index = taskData.indexOf(obj);
                }
            });

        taskData[index] = task;
        this.props.setTasksData(taskData);
        this.forceUpdate()
    };

    handleDelete = (task_id) => {
        let index;
        let taskData = this.props.taskData;

        taskData.filter(
            (obj) => {
                if (obj.id === task_id) {
                    index = taskData.indexOf(obj);
                }
            });

        taskData.splice(index,1);
        this.props.setTasksData(taskData);
        this.forceUpdate()
    };

    render = () => {
        return (
            <>
                <div className="row justify-content-center taskbase-container">
                    {this.props.taskData.map(
                        task =>
                            <Task
                                key={task.id}
                                task_id={task.id}
                                title={task.title}
                                author={getVal(task.author, 'email')}
                                details={task.details}
                                created={task.created}
                                modified={task.modified}
                                done={task.done}
                                done_by={getVal(task.done_by, 'email')}
                                due_date={task.due_date}
                                is_public={task.is_public}
                                handleRefresh={this.handleRefresh}
                                handleDelete={this.handleDelete}
                            />
                    )}
                </div>
            </>
        );
    }
}


TasksBaseConnected.propTypes = {
    taskData: PropTypes.array,
    extraNavbarContext: PropTypes.func
};

const mapStateToProps = state => ({
    logged_in: state.logged_in.logged_in,
    extra_navbar_context: state.extra_navbar_context.extra_navbar_context,
    taskData: state.taskData.taskData
});

const mapDispatchToProps = dispatch => ({
    extraNavbarContext: val => dispatch(extraNavbarContext(val)),
    setTasksData: val => dispatch(setTasksData(val))
});


TasksBaseConnected.propTypes = {
    setTasksData: PropTypes.func
};

const TasksBase = connect(mapStateToProps, mapDispatchToProps)(TasksBaseConnected);


export default TasksBase;
