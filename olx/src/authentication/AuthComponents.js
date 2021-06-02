import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const AuthInput = styled.input`
  background: transparent;
  border-radius: 0;
  border: none;
  border-bottom: 1px solid grey;
  color: black;
  font-weight: 500;
  font-size: 1.25em;
  font-family: monospace;
  text-align: center;
  margin: 8px;
  padding: 5px;
  text-align: center;
  
  & > {
    margin: 2em;
  }
  &::placeholder {
    text-align: center;
  }
  &:focus,
  &:active,
  &:hover {
    outline: none;
  }
`;

export const AuthForm = styled.form`
  display: flex;
  flex-direction: column;
  margin: auto;
  width: 400px;
  box-sizing: border-box;
  text-align: center;
  padding: 20px;
  border: 2px solid black;
  background-color: white;
  box-shadow: 2px 2px 4px 4px lightgray;
`;

export const AuthButton = styled.button`
text-decoration: underline;
font-weight: 500;
font-size: 1.25em;
font-family: monospace;
background: none;
border: none;
outline: none;
color: aqua;
padding: .5em;

&:hover {
  text-decoration: line-through;
  color: orange;
  cursor: pointer;
}

&:active {
  color: blue;
  font-weight: bold;
}
`
