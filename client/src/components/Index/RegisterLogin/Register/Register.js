import React from 'react';

const Register = ({
    handleSubmit,
    handleChange,
    values,
    errors,
    registerRef
}) => (
    <React.Fragment>
    <form id="register-form" className="input-group" onSubmit={handleSubmit} ref={registerRef} autoComplete="true">
        <input 
            type="firstname"
            name="firstname"
            value={values.firstname || ''}
            onChange={handleChange}
            className="input-field" 
            placeholder="First Name"
            autoComplete="true"
            required
        />
        {errors.firstname && 
            (<p className="help register-is-danger">{errors.firstname}</p>)
        }
        <input 
            type="surname"
            name="surname"
            value={values.surname || ''}
            onChange={handleChange}
            className="input-field" 
            placeholder="Surname"
            autoComplete="true"
            required
        />
        {errors.surname && 
            (<p className="help register-is-danger">{errors.surname}</p>)
        }
        <input 
            type="username"
            name="username"
            value={values.username || ''}
            onChange={handleChange}
            className="input-field" 
            placeholder="Username"
            autoComplete="true"
            required
        />
        {errors.username && 
            (<p className="help register-is-danger">{errors.username}</p>)
        }
        <input 
            type="email"
            name="email" 
            className="input-field" 
            placeholder="Email"
            value={values.email || ''}
            onChange={handleChange}
            autoComplete="true"
            required
        />
        {errors.email && (
            <p className="help register-is-danger">{errors.email}</p>)
        }
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
            <p className="help register-is-danger">{errors.password}</p>
        )}
        
        <button type="submit" className="submit-btn">Register</button>
    </form>
    </React.Fragment>
);

export default Register;