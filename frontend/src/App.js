/**
 * @file frontend.src.App.js
 * @author Panagiotis Tzimos.
 *
 * The App main component.
 * This component should stay in the top level of
 * the hierarchy.
 */

import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import NavBarBase from './navbar/components/NavBarBase';
import Home from './pages/home/components/Home';
import LoginForm from './pages/login/components/LoginForm';
import ContactUs from './pages/contact_us/components/ContactUs';
import DashboardBase from './pages/dahsboard/components/DashboardBase';

import { loginUser } from './base/redux/authentication/actions';


class AppConnected extends Component {
		render = () => {
				return (
						<div>
								<Router>
										<div>
												<NavBarBase/>
												<Route exact path='/' component={Home}/>
												<Route exact path='/contact_us' component={ContactUs}/>
												<Route exact path='/login' component={LoginForm}/>
												<Route path='/dashboard' component={DashboardBase}/>
										</div>
								</Router>
						</div>
				);
		};
}

const mapStateToProps = state => ({ logged_in: state.logged_in.logged_in });
const mapDispatchToProps = dispatch => ({
		loginUser: val => dispatch(loginUser(val))
});

const App = connect(mapStateToProps, mapDispatchToProps)(AppConnected);
export default App;
