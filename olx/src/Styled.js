import { Link } from "react-router-dom";
import styled from "styled-components";

export const CustomLink = styled(Link)`
  color: ${(props) => props.color};

  &:hover {
    color: ${(props) => props.secondaryColor || "lightblue"};
    text-decoration: line-through;
  }
`;

export const CustomButton = styled.button`
  color: ${(props) => props.color};

  text-decoration: underline;
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
  font-size: 1em;

  &:hover {
    color: ${(props) => props.secondaryColor || "lightblue"};
    text-decoration: line-through;
  }
`;

