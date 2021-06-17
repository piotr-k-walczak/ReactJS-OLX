import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Link, useHistory } from "react-router-dom";
import { mainColor } from "./Theme";
import styled from "styled-components";

const CustomInput = styled.input`
  padding: 0.5em 1em;
  font-family: monospace;
  width: 50%;
  min: 200px;
  border-radius: none;
  background: white;
  border: 1px solid gray;

  &:focus,
  &:active {
    outline: none;
  }
`;

const CustomButton = styled.button`
  background: none;
  margin-left: 1em;
  border: 1px solid gray;

  &:hover {
    cursor: pointer;
  }
`;

export function Searchbar(props) {
  const [searchInput, setSeachInput] = useState(props.startPhrase || "Czego szukasz?");
  const history = useHistory()

  useEffect(() => {
    props.onChange(searchInput)
  }, [searchInput])

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center"
      }}
    >
      <CustomInput
        value={searchInput}
        onChange={(event) => setSeachInput(event.target.value)}
        onClick={() => setSeachInput("")}
      />
      <CustomButton onClick={() => history.push("/search/"+searchInput)}>
        <img
          src="/searchIcon.svg"
          style={{ height: "1.25em", width: "1.25em" }}
        />
      </CustomButton>
    </div>
  );
}

export default Searchbar;
