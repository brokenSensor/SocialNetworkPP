/* eslint-disable import/no-anonymous-default-export */
import {
	PROFILE_LOADED,
	PROFILE_ERROR,
	PROFILE_EDITED,
} from '../actions/types';

const initialState = {
	loading: true,
	profile: null,
};

export default function (state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case PROFILE_LOADED:
			return { ...state, profile: payload, loading: false };
		case PROFILE_EDITED:
			return { ...state, profile: payload };
		case PROFILE_ERROR:
			return { ...state, profile: null, loading: false };
		default:
			return state;
	}
}
