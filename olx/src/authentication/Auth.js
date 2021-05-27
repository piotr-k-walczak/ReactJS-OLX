import React, { useState, useEffect } from "react";
import app from "./base";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    app.auth().onAuthStateChanged((user) => {
      setCurrentUser(user);
  })});

  return (
    <AuthContext.Provider value={{ currentUser, pending }}>
      {children}
    </AuthContext.Provider>
  );
};
