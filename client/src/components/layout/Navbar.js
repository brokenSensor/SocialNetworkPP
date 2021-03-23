import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
	return (
		<nav>
			<Link to='/profile'>My profile</Link>
			<Link to='/dashboard'>Dashboard</Link>
		</nav>
	);
}

export default Navbar;
