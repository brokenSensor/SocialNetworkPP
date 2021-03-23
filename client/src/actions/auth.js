import axios from 'axios';
import {
	LOGIN_SUCCESS,
	REGISTER_SUCCESS,
	USER_LOADED,
	LOGOUT,
	AUTH_ERROR,
	REGISTER_FAIL,
	LOGIN_FAIL,
} from './types';
import { setAlert } from './alert';

// Load user
export const loadUser = () => async dispatch => {
	try {
		const res = await axios.get('/api/auth');

		dispatch({
			type: USER_LOADED,
			payload: res.data,
		});
	} catch (error) {
		dispatch({
			type: AUTH_ERROR,
		});
	}
};
// Logout user
export const logout = () => async dispatch => {
	try {
		await axios.get('/api/auth/logout');

		dispatch({
			type: LOGOUT,
		});
	} catch (error) {}
};

// Register user
export const register = ({ username, email, password }) => async dispatch => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};

	const body = JSON.stringify({ username, email, password });

	try {
		await axios.post('/api/auth/create', body, config);
		dispatch({
			type: REGISTER_SUCCESS,
		});
		dispatch(loadUser());
	} catch (error) {
		const err = error.response.data.errors;

		if (err) {
			err.forEach(er => dispatch(setAlert(er.msg, 'danger')));
		}

		dispatch({
			type: REGISTER_FAIL,
		});
	}
};

// Login user
export const login = (email, password) => async dispatch => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};

	const body = JSON.stringify({ email, password });
	try {
		const res = await axios.post('/api/auth/local', body, config);
		dispatch({
			type: LOGIN_SUCCESS,
		});
		dispatch(loadUser());
	} catch (error) {
		const err = error.response.data.errors;

		if (err) {
			err.forEach(er => dispatch(setAlert(er.msg, 'danger')));
		}

		dispatch({
			type: LOGIN_FAIL,
		});
	}
};
