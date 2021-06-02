import React from "react";
import ReactDOM from "react-dom";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { useSelector } from "react-redux";
import app from "./authentication/base";

const CustomLink = styled(Link)`
  color: ${(props) => props.color};
`;

const CustomTopbar = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 1em 2em;
    background: #002f34;
    font-size: 16px;
    align-items: center;
    align-content: center;

    @media (max-width: 700px) {
        flex-direction: column;
    }
`

export function Topbar(props) {
  return (
    <CustomTopbar>
      <Logo />
      <UserButtons />
    </CustomTopbar>
  );
}

export function Logo(props) {
  return (
    <CustomLink to="/" color="yellow">
      Ogłoszenia Lokalne
    </CustomLink>
  );
}

export function UserButtons(props) {
  const currentUser = useSelector((state) => state.currentUser);
  const history = useHistory();

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <CustomLink to="/login" color="white">
        Moje konto
      </CustomLink>
      <div
        style={{
          height: ".5ch",
          width: ".5ch",
          background: "white",
          margin: "0 1em",
        }}
      />
      <CustomLink to="/post" color="pink">
        Dodaj ogłoszenie
      </CustomLink>
      {
          currentUser &&
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <div
            style={{
              height: ".5ch",
              width: ".5ch",
              background: "white",
              margin: "0 1em",
            }}
          />
          <button
            onClick={() => {
              app
                .auth()
                 .signOut()
                .then(() => history.push("/"));
            }}
            style={{
              color: "orange",
              textDecoration: "underline",
              fontFamily: "monospace",
              background: "none",
              border: "none",
              outline: "none",
              cursor: "pointer",
              fontSize: "16px"
            }}
          >
            Wyloguj
          </button>
        </div>
      }
    </div>
  );
}

export default Topbar;
