import React from "react";
import { BrowserRouter as Router, useParams } from "react-router-dom";
import styled from "styled-components";
import Topbar from "./Topbar";
import Searchbar from "./Searchbar";
import { AdCard } from "./AdCard";

const AppLayout = styled.div`
  grid-template-rows: auto 1fr;
`;

function AdGridLayout(props) {
  return (
    <div
      style={{
        display: "grid",
        padding: "2em",
        boxSizing: "border-box",
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        gap: "1em",
        width: "100%",
      }}
    >
      {props.children}
    </div>
  );
}

export function SearchPage() {
  const { searchPhrase } = useParams();

  return (
    <AppLayout>
      <Topbar />
      <div
        style={{
          padding: "2em",
          boxSizing: "border-box",
        }}
      >
        <Searchbar startPhrase={searchPhrase} />
        <AdGridLayout>
          <AdCard
            image="/logo192.png"
            adTitle="Cyfrowe logo frameworku React.JS"
            date="10-10-2022 10:00"
            category_name="Technologia"
            category_color="blue"
            adId={1}
          />
          <AdCard
            image="/logo192.png"
            adTitle="Cyfrowe logo frameworku React.JS"
            date="10-10-2022 10:00"
            category_name="Technologia"
            category_color="blue"
            adId={1}
          />
        </AdGridLayout>
      </div>
    </AppLayout>
  );
}

export default SearchPage;
