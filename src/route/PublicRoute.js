import { Redirect, Route } from "react-router-dom";

import React, { Component } from "react";
import hasToken from "../utils/hasToken";

const PublicRoute = ({ component: Component, ...rest }) => {
    console.log({ ...rest });
    return (
        <Route
            {...rest}
            render={(props) =>
                !hasToken() ? <Component {...props} /> : <Redirect to="/" />

            }
        />
    );
};

export default PublicRoute;