import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { LoadingWrapper } from "../Loading";

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  const currentUser = useSelector((state) => state.currentUser);
  const currentUserPending = useSelector((state) => state.currentUserPending);

  return (
    <LoadingWrapper pending={currentUserPending}>
      <Route
        {...rest}
        render={(routeProps) => {
          currentUser != null ? (
            <RouteComponent {...routeProps} />
          ) : (
            <Redirect to="/login" />
          );
        }}
      />
    </LoadingWrapper>
  );
};

export default PrivateRoute;
