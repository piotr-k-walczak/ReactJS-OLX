import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import PrivateRoute from "./authentication/PrivateRoute";
import Login from "./authentication/Login";
import MainPage from "./MainPage";
import AccountPage from "./AccountPage";
import SignUp from "./authentication/SignUp";
import AdPage from "./AdPage";
import SearchPage from "./SearchPage";
import Topbar from "./Topbar";
import PostAdPage from "./PostAdPage";
import UserPage from "./UserPage";
import { useSelector } from "react-redux";
import { LoadingWrapper } from "./Loading";
import AdminPage from "./AdminPage";

export function AppRouting(props) {
  return (
    <React.Fragment>
      <Switch>
        <Route path="/register"></Route>
        <Route path="/login"></Route>
        <Route path="/*">
          <Topbar />
        </Route>
      </Switch>
      <Switch>
        <PrivateRoute exact path="/account">
          <UserPage />
        </PrivateRoute>
        <PrivateRoute exact path="/new">
          <PostAdPage />
        </PrivateRoute>
        <Route path="/post/:postId">
          <AdPage />
        </Route>
        <Route path="/admin">
          <AdminPage/>
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/register">
          <SignUp />
        </Route>
        <Route exact path="/">
          <MainPage />
        </Route>
        <Route path="/*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </React.Fragment>
  );
}

export default AppRouting;
