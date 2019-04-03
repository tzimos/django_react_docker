/**
 * @file frontend.src.pages.dahsboard.tasks.components.TaskRouter.js
 * @author Panagiotis Tzimos.
 *
 * The TaskRouter component.
 */

import React, {Component} from 'react';
import {Route, withRouter} from 'react-router-dom';

import TasksAll from './TasksAll';
import TasksPrivate from './TasksPrivate';
import TasksCreate from "./TasksCreate";

/**
 * This component includes any different filtering that is going to be
 * done in the representation of the tasks.
 */
class TaskRouter extends Component {
    render() {
        return (
            <div>
                <Route path='/dashboard/tasks/all' component={TasksAll}/>
                <Route path='/dashboard/tasks/private' component={TasksPrivate}/>
                <Route path='/dashboard/tasks/create' component={TasksCreate}/>
            </div>
        );
    }
}


export default withRouter(TaskRouter);
