import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

export function AdCategoryTag(props) {
  const { color, title } = props;
  return (
    <div
      style={{
        border: `1px solid ${color}`,
        color: color,
        padding: ".25em 1em",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/*<img src="logo192.png" style={{ width: "1em", height: "1em" }} />*/}
      {title}
    </div>
  );
}

export default AdCategoryTag;