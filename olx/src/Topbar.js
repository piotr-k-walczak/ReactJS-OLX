import React from "react";
import ReactDOM from "react-dom";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { useSelector } from "react-redux";
import app from "./authentication/base";
import { CustomLink, CustomButton } from "./Styled";

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
`;

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
      OLX Jr.
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
      {currentUser ? (
        <React.Fragment>
          <CustomLink to="/account" color="white">
            My Account
          </CustomLink>
          <div
            style={{
              height: ".5ch",
              width: ".5ch",
              background: "white",
              margin: "0 1em",
            }}
          />
          <CustomLink to="/new" color="pink">
            Post an Ad
          </CustomLink>
          <div
            style={{
              height: ".5ch",
              width: ".5ch",
              background: "white",
              margin: "0 1em",
            }}
          />
          <CustomButton
            onClick={() => {
              app
                .auth()
                .signOut()
                .then(() => history.push("/"));
            }}
            color="orange"
          >
            Sign Out
          </CustomButton>
        </React.Fragment>
      ) : (
        <CustomLink to="/login" color="lightgreen">
          Login
        </CustomLink>
      )}

      {currentUser && <React.Fragment></React.Fragment>}
    </div>
  );
}

export default Topbar;
