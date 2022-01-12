import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

const PrivateRoute = ({ component: Component, ...rest }) => {
    console.log(rest.user);
    function checkIfAuthed(){
        if(!rest.user) {
            return false; 
         }
         let userToken;
         let userTokenExpTime;
         try {
            userToken = localStorage.getItem('user');
            userTokenExpTime = jwt_decode(JSON.stringify(userToken)).exp;
            console.log(userTokenExpTime);
         } catch(e) {
             localStorage.removeItem('user');
         }
         

         const currentTime = Date.now() / 1000;
         if (userTokenExpTime < currentTime) {
             localStorage.removeItem('user');
             window.location.reload();    
        }
    }
    return (
        <Route {...rest} render={props => (
            checkIfAuthed()
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/', state: { from: props.location } }} />
    )} />
    )
};

export default PrivateRoute;