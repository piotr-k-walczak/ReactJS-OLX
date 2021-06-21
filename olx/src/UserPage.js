import React, { useState, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { LoadingWrapper } from "./Loading";
import { Redirect } from "react-router-dom";
import { AdCard } from "./AdCard";
import { Searchbar } from "./Searchbar";
import { AdContainer } from "./AdPage";

export function UserPage(props) {
  const [ads, setAds] = useState([]);
  const [paidAds, setPaidAds] = useState([]);
  const [expiredAds, setExpiredAds] = useState([]);
  const [boughtAds, setBoughtAds] = useState([]);
  const [paidAdsPending, setPaidAdsPending] = useState(true);
  const [expiredAdsPending, setExpiredAdsPending] = useState(true);
  const [boughtAdsPending, setBoughtAdsPending] = useState(true);
  const [adsPending, setAdsPending] = useState(true);
  
  const [adError, setAdError] = useState(false);
  const [paidAdError, setPaidAdError] = useState(false);
  const [boughtdError, setBoughtError] = useState(false);
  const [expiredAdError, setExpiredAdError] = useState(false);
  
  const [userError, setUserError] = useState(null);

  const userID = useSelector((state) =>
    state.currentUser ? state.currentUser.uid : null
  );

  const [userDetails, setUserDetails] = useState({});
  const [userDetailsPening, setUserDetailsPending] = useState(true);

  function fetchAds() {
    fetch(`http://164.90.162.213:3000/ads/active/` + userID).then((res) => {
      if (res.status == 200) {
        res.json().then(json => setAds(json));
      } else {
        setAdError(true);
      }
      setAdsPending(false);
    });
  }

  function fetchPaidAds() {
    fetch(`http://164.90.162.213:3000/ads/paid/` + userID).then((res) => {
      if (res.status == 200) {
        res.json().then(json => setPaidAds(json));
      } else {
        setPaidAdError(true);
      }
      setPaidAdsPending(false);
    });
  }

  function fetchExpiredAds() {
    fetch(`http://164.90.162.213:3000/ads/expired/` + userID).then((res) => {
      if (res.status == 200) {
        res.json().then(json => setExpiredAds(json));
      } else {
        setExpiredAdError(true);
      }
      setExpiredAdsPending(false);
    });
  }

  function fetchBoughtAds() {
    fetch(`http://164.90.162.213:3000/purchases/user/` + userID).then((res) => {
      if (res.status == 200) {
        res.json().then(json => setBoughtAds(json));
      } else {
        setBoughtError(true);
      }
      setBoughtAdsPending(false);
    });
  }

  function fetchUserData() {
    fetch(`http://164.90.162.213:3000/users/` + userID).then((res) => {
      if (res.status == 200) {
        res.json().then(json => setUserDetails(json));
      } else {
        setUserError(true);
      }
      setUserDetailsPending(false);
    });
  }

  useEffect(() => {
    if (userID) {
      fetchAds();
      fetchPaidAds();
      fetchExpiredAds();
      fetchBoughtAds();
      fetchUserData();
    }
  }, [userID]);

  return (
    <React.Fragment>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr auto",
          padding: "2em",
        }}
      >
        <LoadingWrapper pending={adsPending && expiredAdsPending && paidAdsPending && boughtAdsPending}>
          <div>
          {boughtdError ? <AdContainer><h5>An error has occured</h5></AdContainer> : <UserAds hits={boughtAds} header="Bought" emptyMessage="Nothing bought"/>}
          {adError ? <AdContainer><h5>An error has occured</h5></AdContainer> : <UserAds hits={ads} header="Active ads" emptyMessage="No active ads"/>}
          {paidAdError ? <AdContainer><h5>An error has occured</h5></AdContainer> : <UserAds hits={paidAds} header="Sold" emptyMessage="Nothing sold"/>}
          {expiredAdError ? <AdContainer><h5>An error has occured</h5></AdContainer> : <UserAds hits={expiredAds} header="Expired ads" emptyMessage="No expired ads"/>}
          </div>
        </LoadingWrapper>
        <LoadingWrapper pending={userDetailsPening}>
          <div>
            <UserDetails
              Name={userDetails.Name}
              LastName={userDetails.LastName}
              error={userError}
            />
          </div>
        </LoadingWrapper>
      </div>
    </React.Fragment>
  );
}

/*
  this.Name = user.Name;
  this.LastName = user.LastName;
  this.BirthDate = user.BirthDate;
  this.Email = user.Email;
  this.Password = user.Password;
  this.Sso = user.Sso;
  this.Id = user.Id;
*/

function UserDetails(props) {
  const { Name, LastName, error } = props;
  return (
    <AdContainer style={{ textAlign: "right" }}>
      {error ? (
        <h5>An error has occured</h5>
      ) : (
        <React.Fragment>
          <h5 style={{ fontWeight: 900, marginBlock: 0 }}>User</h5>
          <h5 style={{ marginBlock: 0 }}>
            {Name} {LastName}
          </h5>
        </React.Fragment>
      )}
    </AdContainer>
  );
}

function AdGridLayout(props) {
  return (
    <div
      style={{
        display: "grid",
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

function UserAds(props) {
  const {hits, header, emptyMessage} = props;

  return (
    <div>
      <AdContainer style={{padding:"1em 2em"}}
      >
        <AdGridLayout>
          <h3 style={{ gridColumn: "1/-1" }}>{header}</h3>
          {hits.length == 0 ? (
            <h4 style={{ gridColumn: "1/-1" }}>{emptyMessage}</h4>
          ) : (
            hits.map((hit) => <AdCard hit={hit} key={hit.Id} />)
          )}
        </AdGridLayout>
      </AdContainer>
    </div>
  );
}
export default UserPage;
