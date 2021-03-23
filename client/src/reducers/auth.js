/* eslint-disable import/no-anonymous-default-export */
import { REGISTER_SUCCESS, USER_LOADED } from '../actions/types';

const initialState = {
	isAuthenticated: null,
	loading: true,
	user: null,
};

export default function (state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case USER_LOADED:
			return { ...state, isAuthenticated: true, loading: false, user: payload };
		case REGISTER_SUCCESS:
			return { ...state, ...payload, isAuthenticated: true, loading: false };

		default:
			return state;
	}
}
