import React from 'react';

const Login = 
({
    handleSubmit,
    handleChange,
    handleKeyPress,
    values,
    errors,
    loginRef
}) => (
    <form id="login-form" className="input-group" onSubmit={handleSubmit} ref={loginRef}>
    <input 
        type="email"
        name="email" 
        className="input-field" 
        placeholder="Email"
        value={values.email || ''}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        autoComplete="true"
        required
    />
    {errors.email && (
            <p className="help login-is-danger">{errors.email}</p>
    )}
    <input 
        type="password"
        name="password" 
        className="input-field" 
        placeholder="Password"
        value={values.password || ''}
        onChange={handleChange}
        autoComplete="true"
        required
    />
    {errors.password && (
            <p className="help login-is-danger">{errors.password}</p>
    )}
    <input type="checkbox" className="check-box" placeholder="User Id"/>
    <span>Remember Password</span>
    <button type="submit" className="submit-btn">Login</button>
</form>
);

export default Login;