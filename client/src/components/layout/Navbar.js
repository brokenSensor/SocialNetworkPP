import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.sass';
import { logout } from '../../actions/auth';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

function Navbar({ logout }) {
	return (
		<nav className='navbar'>
			<Link to='/profile'>My profile</Link>
			<Link to='/dashboard'>Dashboard</Link>
			<a href='#!' onClick={logout}>
				Logout
			</a>
		</nav>
	);
}

Navbar.propTypes = {
	logout: PropTypes.func.isRequired,
};

export default connect(null, { logout })(Navbar);
