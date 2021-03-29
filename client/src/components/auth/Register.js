import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Auth.sass';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { register } from '../../actions/auth';
import { setAlert } from '../../actions/alert';

function Register({ setAlert, register, auth }) {
	const [formData, setFormData] = useState({
		username: '',
		email: '',
		password: '',
		password2: '',
	});

	const { username, email, password, password2 } = formData;

	const onChange = e => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const onSubmit = e => {
		e.preventDefault();
		if (password !== password2) {
			setAlert('Passwords do not match', 'danger');
		} else {
			register({ username, email, password });
		}
	};
	if (auth.isAuthenticated) {
		return <Redirect to={`/profile/${auth.user._id}`} />;
	}
	return (
		<>
			<div className='login'>
				<form onSubmit={e => onSubmit(e)}>
					<input
						type='text'
						name='username'
						id='username'
						required
						placeholder='Enter your name'
						autoComplete='off'
						value={username}
						onChange={e => {
							onChange(e);
						}}
					/>
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
					<input
						type='password'
						name='password2'
						id='password2'
						minLength='6'
						required
						placeholder='Confirm your password'
						value={password2}
						onChange={e => {
							onChange(e);
						}}
					/>
					<input type='submit' value='Register' />
				</form>
				<p>
					Already have an account? <Link to='/login'>Sign In</Link>
				</p>
			</div>
		</>
	);
}

Register.propTypes = {
	login: PropTypes.func.isRequired,
	setAlert: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
	auth: state.auth,
});

export default connect(mapStateToProps, { register, setAlert })(Register);
