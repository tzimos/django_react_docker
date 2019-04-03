/**
 * @file frontend.src.navbar.components.NavBarBase.js
 * @author Panagiotis Tzimos.
 *
 * The navbar base component.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { extraNavbarContext } from '../redux/actions/extra_navbar_context';

import { loginUser, logoutUser } from '../../base/redux/authentication/actions';

import '../style/navbarbase.scss';

class NavBarBaseConnected extends Component {

		constructor(props) {
				super(props);
				this.state = {
						'navItems': '',
				};
				this.userLoggedIn = this.userLoggedIn.bind(this);
				this.userLoggedOut = this.userLoggedOut.bind(this);
				this.handleLogout = this.handleLogout.bind(this);
				this.handleToggleItems = this.handleToggleItems.bind(this);
				this.handleExtraContext = this.handleExtraContext.bind(this);
		}

		/**
		 * Component method that returns additional items to populate
		 * the base navbar, based on children if they exist.
		 *
		 * @returns {Array}
		 */
		handleExtraContext = () => {
				const extra = this.props.extra_navbar_context;
				if (!extra) {
						return;
				}
				return (extra.map((field) =>

						<li key={field.id} className='nav-item'>
								<Link to={{
										pathname: field.redirect_url,
										state: { 'update': 'true' }
								}} className="nav-link">{field.name}
								</Link>
						</li>
				));
		};


		/**
		 * Logouts the user through the action logoutUser
		 * which is executed by the reducer.
		 *
		 * @returns {Array}
		 */
		handleLogout = () => {
				this.props.logoutUser(false);
				this.props.extraNavbarContext([]);
				return this.props.history.push('/');
		};


		/**
		 * Method that is used to toggle the visibility
		 * of the navbar when there is a small screen
		 * rendering.
		 *
		 * @returns {void}
		 */
		handleToggleItems = () => {
				this.setState(
						state => {
								return { navItems: state.navItems ? '' : 'show' };
						});
		};


		/**
		 * Method that is used to render the logout
		 * item at navbar when the user is logged in.
		 *
		 * @returns {jsx}
		 */
		userLoggedIn = () => {
				return (
						<ul className="nav ml-auto justify-content-end ">
								<li className='nav-item'>
										<a className='nav-link' href="#" onClick={this.handleLogout}>Logout</a>
								</li>
						</ul>
				);
		};


		/**
		 * Method that is used to render the login
		 * item at navbar when the user is logged out.
		 *
		 * @returns {jsx}
		 */
		userLoggedOut = () => {
				return (
						<ul className="nav ml-auto justify-content-end">
								<li className='nav-item'>
										<Link className='nav-link' to='/login'>Login</Link>
								</li>
						</ul>
				);
		};


		render = () => {
				return (
						<nav className="navbar navbar-expand-lg navbar-dark bg-dark">

								<Link to={
										String(this.props.logged_in
												? '/dashboard/tasks/all'
												: '/')} className='navbar-brand'>Home</Link>


								<button className="navbar-toggler" type="button">
										<span className="navbar-toggler-icon"
													onClick={this.handleToggleItems}>
										</span>
								</button>

								<div className={'collapse navbar-collapse ' + this.state.navItems}>

										<ul className='nav justify-content-center'>
												<li className='nav-item'>
														<Link to='/contact_us' className='nav-link'>Contact Us</Link>
												</li>
												<li className='nav-item'>
														<a className='nav-link' href='#'>About</a>
												</li>
										</ul>
										<ul className='nav ml-auto justify-content-center'>
												{this.handleExtraContext()}
										</ul>
										{this.props.logged_in ? this.userLoggedIn() : this.userLoggedOut()}
								</div>
						</nav>

				);
		};
}

NavBarBaseConnected.propTypes = {
		history: PropTypes.object,
		logoutUser: PropTypes.func,
		logged_in: PropTypes.bool,
		extra_navbar_context: PropTypes.array,
		extraNavbarContext: PropTypes.func
};


const mapStateToProps = state => ({
		logged_in: state.logged_in.logged_in,
		extra_navbar_context: state.extra_navbar_context.extra_navbar_context
});

const mapDispatchToProps = dispatch => ({
		loginUser: val => dispatch(loginUser(val)),
		logoutUser: val => dispatch(logoutUser(val)),
		extraNavbarContext: val => dispatch(extraNavbarContext(val))
});

const NavBarBase = connect(mapStateToProps, mapDispatchToProps)(NavBarBaseConnected);
export default withRouter(NavBarBase);
