import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Auth.sass';
import { Link } from 'react-router-dom';

function Login(props) {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});

	const { email, password } = formData;
	return (
		<>
			<div className='login'>
				<form>
					<input
						type='email'
						name='email'
						id='email'
						required
						placeholder='Enter your email'
						value={email}
					/>
					<input
						type='password'
						name='password'
						id='password'
						minLength='6'
						required
						placeholder='Enter your password'
						value={password}
					/>
					<input type='submit' value='Login' />
				</form>
				<p>
					Don't have an account? <Link to='/register'>Sign Up</Link>
				</p>
			</div>
		</>
	);
}

Login.propTypes = {};

export default Login;
