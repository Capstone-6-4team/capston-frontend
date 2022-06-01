import { Redirect, Route } from "react-router-dom";

import React, { Component } from "react";
import hasToken from "../utils/hasToken";

const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={(props) =>
                hasToken() ? <Component {...props} /> : <Redirect to="/login" />
            }
        />
    );
};

export default PrivateRoute;