import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "./authentication/Auth";
import { GetUserTickets } from "./CallAPI";
import Loading from "./Loading";
import { Searchbar } from "./AdPage";

function AdsPage(props) {
  const [tickets, setTickets] = useState([]);
  const [ticketsLoaded, setTicketsLoaded] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const [searchedPhrase, setSearchPhrase] = useState("");

  useEffect(() => {
    GetUserTickets(currentUser.uid)
      .then((res) => {
        setTicketsLoaded(true);
        setTickets(res);
      })
      .catch(() => {
        setTicketsLoaded(true);
        setTickets([]);
      });
  }, [currentUser]);

  return !ticketsLoaded ? (
    <Loading />
  ) : (<></>
  );
}

export function AdsList(props) {
  return <div style={props.past && { opacity: "60%" }}>{props.children}</div>;
}

export default AdsPage;
