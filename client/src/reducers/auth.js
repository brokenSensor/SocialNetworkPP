/* eslint-disable import/no-anonymous-default-export */
import {
	REGISTER_SUCCESS,
	USER_LOADED,
	LOGIN_SUCCESS,
	LOGOUT,
	AUTH_ERROR,
	REGISTER_FAIL,
	LOGIN_FAIL,
} from '../actions/types';

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
		case LOGIN_SUCCESS:
			return { ...state, isAuthenticated: true, loading: true };
		case LOGOUT:
		case AUTH_ERROR:
		case REGISTER_FAIL:
		case LOGIN_FAIL:
			return { isAuthenticated: false, loading: false };
		default:
			return state;
	}
}
