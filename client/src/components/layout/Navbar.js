import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.sass';

function Navbar() {
	return (
		<nav className='navbar'>
			<Link to='/profile'>My profile</Link>
			<Link to='/dashboard'>Dashboard</Link>
		</nav>
	);
}

export default Navbar;
