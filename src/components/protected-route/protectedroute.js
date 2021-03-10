import React, { useEffect } from "react";
import { useAlert } from "react-alert";
import { Redirect, Route } from "react-router-dom";
import auth from "../../service/auth";

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const alert = useAlert();

    useEffect(() => {
        if (!auth.isUserAuthenticated()) {
            alert.error("Access Denied");
        }
    });
    return (
        <Route
            {...rest}
            render={(props) => {
                if (auth.isUserAuthenticated()) {
                    return <Component {...props} />;
                } else {
                    return <Redirect to="/login" />;
                }
            }}
        />
    );
};

export default ProtectedRoute;
