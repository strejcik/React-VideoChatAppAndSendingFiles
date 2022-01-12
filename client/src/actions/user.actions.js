import { history } from '../store';
import * as userService from '../helpers/user.service';
import { userConstants } from '../constants/user.constants';
import {alertActions} from '../actions/alert.actions';

export const login = (email, password) => {
    return dispatch => {
        dispatch(request({ email }));

        userService.login(email, password)
        .then(
            user => {
                dispatch(success(user));
                history.push(`/chat`);
            },
            error => {
                dispatch(failure(error.toString()));
                dispatch(alertActions.error(error.toString()));
            }
        );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

export const register = (user) => {
    return dispatch => {
        dispatch(request({ user }));

        userService.register(user)
        .then(
            user => {
                dispatch(success(user.user));
                history.push(`/`);
            },
            error => {
                dispatch(failure(error.toString()));
                dispatch(alertActions.error(error.toString()));
            }
        )
    }
    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}