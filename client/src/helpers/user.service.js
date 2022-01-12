export function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                localStorage.removeItem('user');
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}
 
export function login(email, password) {
    const user = {email, password};
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        mode: 'cors',
        body: JSON.stringify({ user })
    };

    return fetch(`http://localhost:5000/api/v1/login`, requestOptions)
        .then(handleResponse)
        .then(user => {
            localStorage.setItem('user', JSON.stringify(user.user));
            return user.user;
        });
}

export function register(user) {
    console.log(user);
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        mode: 'cors',
        body: JSON.stringify({ user })
    };
    return fetch(`http://localhost:5000/api/v1/register`, requestOptions).then(handleResponse);
}