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
  padding: 1.5em;
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
  const { adId, image, adTitle, desc, date, category_name, category_color } = props;
  return (
    <Card to={`/post/${adId}`} category_color={category_color}>
      <img src={image} />
      <div
        style={{
          padding: ".5em 0",
          boxSizing: "border-box",
        }}
      >
        <h3>{adTitle}</h3>
        <AdCategoryTag title={category_name} color={category_color} />
        <div style={{ color: "gray" }}>{date}</div>
      </div>
    </Card>
  );
}

export default AdCard;