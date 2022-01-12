import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import {login as loginAction} from '../../actions/user.actions';
import {register as registerAction} from '../../actions/user.actions';
import {useForm as useFormLogin} from "./useForm";
import {useForm as useFormRegister} from "./useForm";
import validateLogin from './loginFormValidationRules';
import validateRegister from './registerFormValidationRules';
import RegLogForm from '../../components/Index/RegisterLogin/Form';
import './index.page.style.css'

const IndexPage = () => {
    const loginRefContainer = useRef(null);
    const registerRefContainer = useRef(null);
    const swipeBtnRef = useRef(null);
    const dispatch = useDispatch();

    const {
        values: loginValues,
        errors: loginErrors,
        handleChange: handleLoginChange,
        handleSubmit: handleLoginSubmit,
        handleKeyPress: handleLoginKeyPress
    } = useFormLogin(login, validateLogin);

    const {
        values: registerValues,
        errors: registerErrors,
        handleChange: handleRegisterChange,
        handleSubmit: handleRegisterSubmit,
    } = useFormRegister(register, validateRegister);

    const swipeLogin = () => {
        loginRefContainer.current.style.left = "50px";
        registerRefContainer.current.style.left = "450px";
        swipeBtnRef.current.style.left = "0px";
    }

    const swipeRegister = () => {
        loginRefContainer.current.style.left = "-400px";
        registerRefContainer.current.style.left= "50px";
        swipeBtnRef.current.style.left = "110px";
    }

    function login() {
        const { email, password } = loginValues;
        dispatch(loginAction(email, password));
    }

    function register() {
        const user = {
            firstname: registerValues.firstname,
            surname: registerValues.surname,
            username: registerValues.username,
            password: registerValues.password,
            email: registerValues.email
        };
        dispatch(registerAction(user));
        swipeLogin();
    }
    return (
    <div className="hero">
        <RegLogForm
            swipeLogin={swipeLogin}
            swipeRegister={swipeRegister}
            swipeBtnRef={swipeBtnRef}

            handleLoginSubmit={handleLoginSubmit}
            handleLoginChange={handleLoginChange}
            handleLoginKeyPress={handleLoginKeyPress}
            loginErrors={loginErrors}
            loginValues={loginValues}
            loginRef={loginRefContainer}

            handleRegisterSubmit={handleRegisterSubmit}
            handleRegisterChange={handleRegisterChange}
            registerErrors={registerErrors}
            registerValues={registerValues}
            registerRef={registerRefContainer}
        />
    </div>
    );
}

export default IndexPage;
