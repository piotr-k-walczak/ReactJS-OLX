import React, { useCallback, useContext, useState } from "react";
import { withRouter, Redirect, Link } from "react-router-dom";
import app from "./base";
import { AuthInput, AuthForm, AuthButton } from "./AuthComponents";
import Loading from "../Loading";
import { useSelector } from "react-redux";
import { mainColor } from "../Theme";

const Login = ({ history }) => {

  const [error, setError] = useState("");

  const currentUser = useSelector((state) => state.currentUser)
  const currentUserPending = useSelector((state) => state.currentUserPending)
  
  const handleLogin = useCallback(
    async (event) => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      if (!email.value || !password.value) {
        setError("Nie wszystkie pola zostały wypełnione.");
        return;
      }
      try {
        await app
          .auth()
          .signInWithEmailAndPassword(email.value, password.value)
          .then(() => history.push("/"))
          .catch((error) => {
            setError("Nieprawidłowy login lub hasło.");
          });
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  if (currentUser) {
    return <Redirect to="/" />;
  }

  if (currentUserPending) {
    return <Loading />;
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "80vh",
      }}
    >
      <AuthForm onSubmit={handleLogin}>
        <Link to="/" style={{color:mainColor, fontSize:"1.5em", marginBottom:"1em"}}>Ogłoszenia lokalne</Link>
        <AuthInput name="email" type="email" placeholder="Email" />
        <AuthInput name="password" type="password" placeholder="Hasło" />
        {error != "" && (
          <span style={{ color: "red", margin: ".5em 0" }}>{error}</span>
        )}
        <AuthButton type="submit" style={{marginTop:"1em"}}>
          Zaloguj się
        </AuthButton>
        <Link to="/register" style={{color:"gray"}}>Nie masz konta? Zarejestruj się</Link>
      </AuthForm>
    </div>
  );
};

export default withRouter(Login);
