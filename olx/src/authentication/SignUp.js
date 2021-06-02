import React, { useCallback, useContext, useMemo, useState } from "react";
import { withRouter, Redirect, Link } from "react-router-dom";
import app from "./base";
import { AuthInput, AuthForm, AuthButton } from "./AuthComponents";
import Loading from "../Loading";
import { useSelector } from "react-redux";
import { mainColor } from "../Theme";

const SignUp = ({ history }) => {
  const [error, setError] = useState("");

  const currentUser = useSelector((state) => state.currentUser)
  const currentUserPending = useSelector((state) => state.currentUserPending)

  const now = new Date();
  const minBirthday = new Date(
    now.getFullYear() - 16,
    now.getMonth(),
    now.getDay()
  );

  const handleLogin = useCallback(
    async (event) => {
      event.preventDefault();
      const {
        name,
        surname,
        email,
        password,
        repassword,
        birthdate,
      } = event.target.elements;
      try {
        if (password.value != repassword.value) {
          setError("Hasła muszą być takie same.");
          return;
        }
        if (
          !name.value ||
          !surname.value ||
          !email.value ||
          !password.value ||
          !repassword.value ||
          !birthdate.value
        ) {
          setError("Nie wszystkie pola zostały wypełnione.");
          return;
        }

        app
          .auth()
          .createUserWithEmailAndPassword(email.value, password.value)
          .then(() => history.push("/"))
          .catch((error) => {
            switch (error.code) {
              case "auth/email-already-in-use":
                setError("Email jest juz uzywany.");
                break;
              case "auth/invalid-email":
                setError("Niewłaściwy email.");
                break;
              case "auth/operation-not-allowed":
                setError("Coś poszło nie tak, spróbuj ponownie.");
                break;
              case "auth/weak-password":
                setError(
                  "Hasło jest za słabe. Dodaj dodatkowe znaki, w tym cyfry i znaki specjalne."
                );
                break;
              default:
                setError("Coś poszło nie tak, spróbuj ponownie.");
                break;
            }
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
        <AuthInput name="name" type="text" placeholder="Imię" />
        <AuthInput name="surname" type="text" placeholder="Nazwisko" />
        <AuthInput name="email" type="email" placeholder="Email" />
        <AuthInput name="password" type="password" placeholder="Hasło" />
        <AuthInput
          name="repassword"
          type="password"
          placeholder="Powtórz Hasło"
        />
        <div
          style={{
            border: "1px solid lightgray",
            padding: "1em .5em .5em .5em",
            margin: ".3em",
          }}
        >
          <div>Data urodzenia</div>
          <AuthInput
            type="date"
            name="birthdate"
            min="1900-01-01"
            max={minBirthday.toISOString().split("T")[0]}
          />
        </div>

        {error != "" && (
          <span style={{ color: "red", margin: ".5em 0" }}>{error}</span>
        )}
        <AuthButton type="submit" backgroundcolor="slateblue">
          Zarejestruj się
        </AuthButton>
        <Link to="/login" style={{color:"gray"}}>Masz konto? Zaloguj się</Link>
      </AuthForm>
    </div>
  );
};

export default withRouter(SignUp);
