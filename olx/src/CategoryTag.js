import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

export function AdCategoryTag(props) {
  const { color, title } = props;
  return (
    <div
      style={{
        border: `1px solid ${color || "black"}`,
        color: color,
        padding: ".25em 1em",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {title}
    </div>
  );
}

export default AdCategoryTag;