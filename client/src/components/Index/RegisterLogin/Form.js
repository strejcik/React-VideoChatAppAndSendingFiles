import React from 'react';
import './form.style.css';
import Login from './Login/Login';
import Register from './Register/Register';

const RegLogForm = 
({
    swipeLogin,
    swipeRegister,
    swipeBtnRef,

    handleLoginSubmit, 
    handleLoginChange, 
    handleLoginKeyPress,
    loginValues, 
    loginErrors,
    loginRef,

    handleRegisterSubmit,
    handleRegisterChange,
    registerValues,
    registerErrors,
    registerRef
}) => (
    <React.Fragment>
    <div className="form-box">
        <div className="button-box">
        <div id="btn" ref={swipeBtnRef}></div>
            <button type="button" className="toggle-btn" onClick={swipeLogin}>Log In</button>
            <button type="button" className="toggle-btn" onClick={swipeRegister}>Register</button>
        </div>
            <Login
                handleSubmit={handleLoginSubmit}
                handleChange={handleLoginChange}
                handleKeyPress={handleLoginKeyPress}
                values={loginValues}
                errors={loginErrors}
                loginRef={loginRef}
            />
            <Register
                handleSubmit={handleRegisterSubmit}
                handleChange={handleRegisterChange}
                values={registerValues}
                errors={registerErrors}
                registerRef={registerRef}
            />
    </div>
    </React.Fragment>
);

export default RegLogForm;
