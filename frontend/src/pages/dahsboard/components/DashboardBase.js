/**
 * @file frontend.src.pages.dahsboard.components.DashboardBase.js
 * @author Panagiotis Tzimos.
 *
 * The Dashboard base component.
 */

import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Switch from 'react-router-dom/es/Switch';

import TaskRouter from '../tasks/components/TaskRouter';


class DashboardBase extends Component {
		render = () => {
				return (
						<div>
								<Switch>
										<TaskRouter/>
								</Switch>
						</div>
				);
		};
}

export default withRouter(DashboardBase);
