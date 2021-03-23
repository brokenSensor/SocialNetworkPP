import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Auth.sass';
import { Link } from 'react-router-dom';
import { login } from '../../actions/auth';
import { connect } from 'react-redux';

function Login({ login }) {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});

	const { email, password } = formData;

	const onChange = e => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const onSubmit = async e => {
		e.preventDefault();
		login(email, password);
	};
	return (
		<>
			<div className='login'>
				<form
					onSubmit={e => {
						onSubmit(e);
					}}
				>
					<input
						type='email'
						name='email'
						id='email'
						required
						placeholder='Enter your email'
						value={email}
						onChange={e => {
							onChange(e);
						}}
					/>
					<input
						type='password'
						name='password'
						id='password'
						minLength='6'
						required
						placeholder='Enter your password'
						value={password}
						onChange={e => {
							onChange(e);
						}}
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

Login.propTypes = {
	login: PropTypes.func.isRequired,
};

export default connect(null, { login })(Login);
