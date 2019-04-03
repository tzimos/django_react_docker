/**
 * @file frontend.src.pages.home.components.Home.js
 * @author Panagiotis Tzimos.
 *
 * The Home component.
 */

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import DashboardBase from '../../dahsboard/components/DashboardBase';

import { loginUser } from '../../../base/redux/authentication/actions';

import '../styles/home.scss';

class HomeConnected extends Component {
		constructor(props) {
				super(props);
				this.userLoggedIn = this.userLoggedIn.bind(this);
				this.userLoggedOut = this.userLoggedOut.bind(this);
		}

		/**
		 * If user is logged out this method renders the login
		 * and sign up buttons.
		 * @return {jsx}
		 */
		userLoggedOut = () => {
				return (
						<div className='container h-100'>
								<div
										className='row h-100 justify-content-center align-items-center buttons-container'>
										<Link to='/login' className='button'>
												Login
										</Link>
										<Link to='/signup' className='button'>
												Sign up

										</Link>
								</div>
						</div>
				);
		};

		/**
		 * If user is logged in this method renders the dashboard
		 * component
		 * @returns {React.Component}
		 */
		userLoggedIn = () => {
				return (
						<DashboardBase/>
				);
		};

		render = () => {
				return (
						<div>
								{this.props.logged_in ? this.userLoggedIn() : this.userLoggedOut()}
						</div>
				);
		};
}

const mapStateToProps = state => ({ logged_in: state.logged_in.logged_in });

const mapDispatchToProps = dispatch => ({
		loginUser: val => dispatch(loginUser(val))
});

HomeConnected.propTypes = {
		logged_in: PropTypes.bool
};

const Home = connect(mapStateToProps, mapDispatchToProps)(HomeConnected);
export default Home;
