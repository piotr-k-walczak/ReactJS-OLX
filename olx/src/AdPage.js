import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import Topbar from "./Topbar";
import Searchbar from "./Searchbar";
import { useParams } from "react-router";
import { getPostDetails } from "./callAPI";
import { useDispatch, useSelector } from "react-redux";
import { setPostDetailsDispatch } from "./dispatchCreators";
import { AdCategoryTag } from "./CategoryTag";
import { MapContainer } from "./Map";
import PayPal from "./PayPalButton";
import Gallery from "./Gallery";
import { HeartButton } from "./HeartButton";
import Loading, { LoadingWrapper } from "./Loading";

const AppLayout = styled.div`
  grid-template-rows: auto 1fr;
`;

export const AdContainer = styled.div`
    border: 1px solid black;
    background: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 3em;
    box-sizing: border-box
    width: 75%;
    margin: 2em auto;
    max-width: 800px;
    box-shadow: 2px 2px 4px 4px lightgray;

    & > * {
        margin: 1.5em auto;
    }
`;

export function AdPage() {
  const { postId } = useParams();
  const [isFavToggled, setFavToggled] = useState(false);
  const [post, setPost] = useState({});
  const [pending, setPending] = useState(true);
  const [error, setError] = useState(null);

  const userID = useSelector((state) =>
  state.currentUser ? state.currentUser.uid : null
);

  useEffect(() => {
    fetch("http://164.90.162.213:3000/ad/" + postId)
      .then((res) => {
        if (res.status == 200) {
          res.json().then(json => setPost(json));
        } else {
          setError(true);
        }
        setPending(false);
      })
      .catch((err) => {
        setError(err);
      });
  }, []);

  useMemo(() => console.log(error), [error]);

  return (
    <LoadingWrapper pending={pending}>
      <AppLayout>
        <AdContainer>
          {error ? (
            <div>An error has occured</div>
          ) : (
            <React.Fragment>
              <h2 style={{ marginBlock: "0", fontWeight: 900 }}>
                {post.Header}
              </h2>
              <h2 style={{ marginBlock: "0", marginTop: ".5em" }}>
                {post.Price && post.Price.toFixed(2)} zł
              </h2>
              {
                post.Paid ? <h5 style={{color:"red"}}>Sold</h5> : 
                post.Expired != 0 ? <h5 style={{color:"green"}}>Expired</h5> : 
                post.Negotiable != "false" && post.Negotiable != "0" && <h5 style={{color:"blue"}}>Negotiable</h5>
              }
              <div>{post.Description}</div>
              <AdCategoryTag title={post.SubCategoryName} color="blue" />
              {
                userID != post.UserSso && !post.Paid && post.Expired == 0 &&
                <PayPal adId={postId} price={post.Price} />
              }
              <div style={{ color: "gray" }}>Due Date: {post.DueDate}</div>
            </React.Fragment>
          )}
        </AdContainer>
      </AppLayout>
    </LoadingWrapper>
  );
}

export default AdPage;
