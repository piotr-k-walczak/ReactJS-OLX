import React, { useEffect } from "react";
import styled from "styled-components";
import Topbar from "./Topbar";
import Searchbar from "./Searchbar";
import { useParams } from "react-router";
import { getPostDetails } from "./callAPI";
import { useDispatch } from "react-redux";
import { setPostDetailsDispatch } from "./dispatchCreators";
import { AdCategoryTag } from "./CategoryTag";
import { MapContainer } from "./Map";
import PayPal from "./PayPalButton";
import Gallery from "./Gallery";

const AppLayout = styled.div`
  grid-template-rows: auto 1fr;
`;

const AdContainer = styled.div`
    border: 1px solid black;
    background: white;
    padding: 2em;
    box-sizing: border-box
    width: 75%;
    margin: 2em auto;
    max-width: 800px;
    box-shadow: 2px 2px 4px 4px lightgray;

    & > * {
        margin: 1.5em auto;
    }
`;

const postData = {
  title: "Nazwa produktu",
  desc: "React.js (inne stosowane nazwy: React, ReactJS) – biblioteka języka programowania JavaScript, która wykorzystywana jest do tworzenia interfejsów graficznych aplikacji internetowych. Została stworzona przez Jordana Walke, programistę Facebooka, a zainspirowana przez rozszerzenie języka PHP – XHP. Często wykorzystywana do tworzenia aplikacji typu Single Page Application. ",
  image: "/logo512.png",
  price: 49.9,
  date: "10-10-2022 10:00",
};

export function AdPage() {
  const { postId } = useParams();
  const dispatcher = useDispatch();

  useEffect(
    () => dispatcher(setPostDetailsDispatch(getPostDetails(postId))),
    []
  );

  return (
    <AppLayout>
      <Topbar />
      <AdContainer
        style={{
          boxSizing: "border-box",
        }}
      >
        {/*<Gallery/>*/}
        <img src={postData.image} style={{ height: "250px" }} />
        <h2 style={{ marginBlock: "0" }}>
          {postData.title}{" "}
          <span style={{ fontWeight: 400 }}>
            {postData.price.toFixed(2)} zł
          </span>
        </h2>
        <div style={{ minWidth: "150px", width: "50%" }}>
          <h3>Kup teraz</h3>
          <PayPal />
        </div>
        <AdCategoryTag title="Technologie" color="blue" />
        <div>{postData.desc}</div>
        <MapContainer />
        <div style={{ color: "gray" }}>{postData.date}</div>
      </AdContainer>
    </AppLayout>
  );
}

export default AdPage;
