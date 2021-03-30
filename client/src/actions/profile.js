import axios from 'axios';
import { PROFILE_LOADED, PROFILE_ERROR, PROFILE_EDITED } from './types';
import { setAlert } from './alert';

export const loadProfile = userId => async dispatch => {
	try {
		const res = await axios.get(`/api/profile/${userId}`);

		dispatch({
			type: PROFILE_LOADED,
			payload: res.data,
		});
	} catch (error) {
		dispatch({
			type: PROFILE_ERROR,
		});
	}
};

export const createProfile = profileForm => async dispatch => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};
	const body = JSON.stringify(profileForm);
	try {
		const res = await axios.post(`/api/profile/create`, body, config);

		dispatch({
			type: PROFILE_EDITED,
			payload: res.data,
		});
	} catch (error) {
		const err = error.response?.data?.errors;

		if (err) {
			err.forEach(er => dispatch(setAlert(er.msg, 'danger')));
		}
		dispatch({
			type: PROFILE_ERROR,
		});
	}
};
