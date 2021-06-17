import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { AdCategoryTag } from "./CategoryTag";

const AppLayout = styled.div`
  grid-template-rows: auto 1fr;
`;

const Card = styled(Link)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  padding: 0.5em 1em;
  background: white;
  box-shadow: 2px 2px 4px 4px lightgray;
  border: 1px solid black;

  position: relative;
  transition: top 0.2s;
  top: 0px;

  &:hover {
    top: -1em;
    cursor: pointer;
  }

  text-decoration: none;

  & * {
    color: black;
    text-decoration: none;
    border: none;
  }

  & > div > * {
    margin: 0.5em 0;
  }
`;

export function AdCard(props) {
  const { Id, Url, Description, Header, Price, SubCategoryName, Negotiable, Paid, Expired } =
    props.hit;
  return (
    <Card to={`/post/${Id}`}>
      <div
        style={{
          padding: ".5em 0",
          boxSizing: "border-box",
          textAlign: "left",
        }}
      >
        <h5>{Header}</h5>
        <div>{Description}</div>
        <h5 style={{ color: "gray" }}>
          {Price == 0 ? "Free" : Price + " zł"}{" "}
          {Paid ? <span style={{ color: "red" }}>Sold</span> : Expired != 0 ? <span style={{ color: "green" }}>Expired</span> : Negotiable != "false" && Negotiable != "0" && (
            <span style={{ color: "blue" }}>Negotiable</span>
          )}
        </h5>
        <AdCategoryTag title={SubCategoryName} color="blue" />
      </div>
    </Card>
  );
}

export default AdCard;
