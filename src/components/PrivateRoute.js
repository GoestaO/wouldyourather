import React from 'react';
import {Route, Redirect, Link} from 'react-router-dom';

const PrivateRoute = ({
  component: Component,
  authed,
  ...rest
}) => (<Route {...rest} render={props => (
    authed
      ? <Component {...props}/>      :
      <div>
        <p>You must log in to view the page</p>
        <Link to="/login">Log in</Link>
        </div>
        )}/>);

export default PrivateRoute;
