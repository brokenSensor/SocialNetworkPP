import axios from 'axios';
import { PROFILE_LOADED, PROFILE_ERROR } from './types';

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
