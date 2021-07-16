import React from 'react'
import {Route, Redirect} from 'react-router-dom';
import { useAuthentication } from "./authenticationContext";

export default function PrivateRoute({component: Component, ...rest}) {
    const {currentUser} = useAuthentication();
    console.log(currentUser);
    return (
        <Route
        {...rest}
        render={props => {
          return currentUser ? <Component {...props} /> : <Redirect to="/login" />
        }}
      ></Route>
                )
}
