import React from "react";
import { BsHeart, BsFillHeartFill } from "react-icons/bs";
import styled from "styled-components";

export const BorderedDiv = styled.div`
  background-color: #f5f5f5;
  padding: 1em 1.5em;
  border: 1px solid black;
  box-shadow: 2px 2px 4px 4px lightgray;
`;

export const BorderedButtonDiv = styled(BorderedDiv)`
  display: flex;
  align-items: center;
  flex-direction: row;

  text-decoration: underline;
  text-decoration-thickness: 2px;

  &:hover {
    text-decoration: line-through;
    text-decoration-thickness: 2px;
    cursor: pointer;

    color: blue;
    user-select: none;
  }

  &:active {
    background: blue;
    color: white;
  }
`;

export function HeartButton(props) {
  const { onClick } = props;
  const toggled = props.toggled;

  const size = "1em";

  return (
    <div
      onClick={onClick}
      style={{ display: "flex", justifyContent: "center" }}
    >
      <BorderedButtonDiv>
        {toggled ? (
          <React.Fragment>
            <h3 style={{ marginRight: "1em" }}>Unfollow</h3>
            <BsHeart style={{ width: size, height: size }} />
          </React.Fragment>
        ) : (
          <React.Fragment>
            <h3 style={{ marginRight: "1em" }}>Follow</h3>
            <BsFillHeartFill style={{ width: size, height: size }} />
          </React.Fragment>
        )}
      </BorderedButtonDiv>
    </div>
  );
}
