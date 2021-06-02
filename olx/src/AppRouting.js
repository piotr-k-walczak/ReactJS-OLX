import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./authentication/PrivateRoute";
import Login from "./authentication/Login";
import MainPage from "./MainPage";
import AccountPage from "./AccountPage";
import SignUp from "./authentication/SignUp";
import AdPage from "./AdPage"
import SearchPage from "./SearchPage";

export function AppRouting(props) {
  return (
    <Switch>
        <PrivateRoute path="/account">
            <AccountPage />
        </PrivateRoute>
        <Route path="/post/:postId">
            <AdPage />
        </Route>
        <Route path="/login">
            <Login />
        </Route>
        <Route path="/register">
            <SignUp />
        </Route>
        <Route path="/search/:searchPhrase">
            <SearchPage />
        </Route>
        <Route path="/*">
            <MainPage />
        </Route>
    </Switch>
  );
}

export default AppRouting;
