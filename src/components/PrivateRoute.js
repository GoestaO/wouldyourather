import React from 'react';
import {Route, Redirect} from 'react-router-dom';

// Inspired by https://tylermcginnis.com/react-router-protected-routes-authentication/ and
// https://gist.github.com/abohannon/cca2dd998edf9dc2c2165f538eece4b2

const PrivateRoute = ({
  component: Component,
  authed,
  ...rest
}) => (<Route {...rest} render={props => (
    authed
      ? (<Component {...props}/>)
      : (<Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>)
      )}/>);

export default PrivateRoute;
