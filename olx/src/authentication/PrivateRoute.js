import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import Loading from "../Loading";
import { AuthContext } from "./Auth";

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  const currentUser = useSelector((state) => state.currentUser)
  const currentUserPending = useSelector((state) => state.currentUserPending)

  if (currentUserPending) {
    return <Loading></Loading>
  }

  return (
    <Route
      {...rest}
      render={(routeProps) =>
        !!currentUser ? (
          <RouteComponent {...routeProps} />
        ) : (
          <Redirect to={"/login"} />
        )
      }
    />
  );
};

export default PrivateRoute;
