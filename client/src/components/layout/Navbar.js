import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.sass';
import { logout } from '../../actions/auth';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

function Navbar({ auth: { isAuthenticated, user }, logout }) {
	return (
		isAuthenticated && (
			<nav className='navbar'>
				<Link to={`/profile/${user?._id}`}>My profile</Link>
				<Link to='/dashboard'>Dashboard</Link>
				<a href='#!' onClick={logout}>
					Logout
				</a>
			</nav>
		)
	);
}

Navbar.propTypes = {
	logout: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
	auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
