import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { AppRouting } from "./AppRouting";
import { setUserDispatch } from "./dispatchCreators";
import app from "./authentication/base";
import { AuthProvider } from "./authentication/Auth";

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRouting />
      </AuthProvider>
    </Router>
  );
}

export default App;
