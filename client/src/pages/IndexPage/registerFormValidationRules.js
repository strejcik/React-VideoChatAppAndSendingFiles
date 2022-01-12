export default function validate(values) {
    let errors = {};
    let usernameRegexp = /^[a-zA-Z0-9]+$/;
    //let firstnameRegexp = /^(([A-Za-z]+[\-\']?)*([A-Za-z]+)?\s)+([A-Za-z]+[\-\']?)*([A-Za-z]+)?$/;
    //let nameRegexp = /^([\w]{3,})+\s+([\w\s]{3,})+$/i;
    if (!values.email) {
      errors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = 'Email address is invalid';
    }
    
    if (!values.password) {
      errors.password = 'Password is required';
    } else if (values.password.length < 8) {
      errors.password = 'Password must be 8 or more characters';
    } else if(values.password.length > 30) {
        errors.password = 'Password has too many characters';
    }

    if(!values.username) {
        errors.username = 'Username is required';
    } else if(values.username.length > 8) {
        errors.username = 'Username has too many characters';
    } else if(!usernameRegexp.test(values.username)) {
        errors.username = 'Username is invalid';
    }

    if(!values.firstname) {
      errors.firstname = 'Name is required';
    }

    if(!values.surname) {
      errors.surname = 'Last Name is required';
    }

    return errors;
  };
  //([A-Z][a-z]*)([\\s\\\'-][A-Z][a-z]*)*