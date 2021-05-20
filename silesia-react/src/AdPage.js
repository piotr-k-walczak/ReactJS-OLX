import React, { useEffect, useState } from "react";
import Loading from "./Loading";
import Ad from "./AdSummary";
import styled from "styled-components";

export const EventList = styled.div`
  width: 80%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  margin: auto;
`;

function AdPage(props) {
  const [ads, setAds] = useState([]);
  const [adsLoaded, setAdsLoaded] = useState(false);

  const [searchPhrase, setSearchPhrase] = useState("");

  useEffect(() => {
      setAdsLoaded(true);
      setAds( []);
  }, []);

  return (
    <div>
      <h1>Ogłoszenia</h1>
      <Searchbar searchPhrase={searchPhrase} setSearchPhrase={setSearchPhrase}/>
      <EventList>
        {adsLoaded ? (
          ads.filter(e => e.NazwaW.toLowerCase().includes(searchPhrase.toLowerCase())).map((event) => {
            return <Ad data={event} key={event.IdW} />;
          })
        ) : (
          <Loading />
        )}
      </EventList>
    </div>
  );
}

const StyledSearchInput = styled.input`
  border: 0;
  border-bottom: 2px solid grey;
  color: white;
  background: transparent;
  text-align: center;
  font-size: 1em;
  margin-bottom: 1em;

  &:focus, &:active {
    outline: none;
    border: 0;
    border-bottom: 2px solid grey;
  }
`

export function Searchbar(props){
  const {searchPhrase, setSearchPhrase, placeholder} = props;

  return <StyledSearchInput type="text" placeholder={placeholder || "Znajdź ogłoszenie"} value={searchPhrase} onChange={e => setSearchPhrase(e.target.value)}/>
}

export default AdPage;
