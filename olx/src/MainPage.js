import React, { useEffect, useMemo, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import styled from "styled-components";
import Topbar from "./Topbar";
import Searchbar from "./Searchbar";
import { AdCard } from "./AdCard";

const AppLayout = styled.div`
   ;
`;

function AdGridLayout(props) {
  return (
    <div
      style={{
        display: "grid",
        padding: "2em",
        boxSizing: "border-box",
        gridTemplateColumns: "repeat(auto-fill, minmax(400px, 1fr))",
        gap: "1em",
        width: "100%",
      }}
    >
      {props.children}
    </div>
  );
}

export function MainPage() {
  const [hits, setHits] = useState([]);

  function fetchHits(text) {
    fetch(
      `http://164.90.162.213:7700/indexes/ads/search${
        text != "" ? "?q=" + text : ""
      }`
    )
      .then((res) => {
        return res.json();
      })
      .then((json) => setHits(json.hits));
  }

  useMemo(() => fetchHits(""), []);

  useMemo(() => console.log(hits), [hits]);

  return (
    <div style={{ gridTemplateColumns: "auto 1fr" }}>
      <div
        style={{
          padding: "2em",
          boxSizing: "border-box",
        }}
      >
        <Searchbar onChange={fetchHits} />
        <AdGridLayout>
          {hits.length == 0 ? (
            <h4 style={{ gridColumn: "1/-1" }}>Nothing found</h4>
          ) : (
            hits.map((hit) => <AdCard hit={hit} key={hit.Id} />)
          )}
        </AdGridLayout>
      </div>
    </div>
  );
}

export default MainPage;
