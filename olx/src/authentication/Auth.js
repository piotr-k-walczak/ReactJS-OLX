import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserDispatch } from "../dispatchCreators";
import app from "./base";

export const AuthProvider = ({ children }) => {
  const dispatcher = useDispatch()

  useEffect(() => {
    app.auth().onAuthStateChanged((user) => {
      dispatcher(setUserDispatch(user));
  })});

  return <div>
    {children}
  </div>
};
