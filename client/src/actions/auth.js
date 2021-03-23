import axios from 'axios';
import { LOGIN_SUCCESS, REGISTER_SUCCESS, USER_LOADED } from './types.js';

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
			// type: AUTH_ERROR,
		});
	}
};

// Register user
export const register = ({ username, email, password }) => async dispatch => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};

	const body = JSON.stringify({ username, email, password });
	dispatch(loadUser());
	try {
		const res = await axios.post('/api/auth/create', body, config);
		dispatch({
			type: REGISTER_SUCCESS,
			payload: res.data,
		});
	} catch (error) {}
};
