import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Topbar from "./Topbar";
import Searchbar from "./Searchbar";
import { useHistory, useParams } from "react-router";
import { getPostDetails } from "./callAPI";
import { useDispatch, useSelector } from "react-redux";
import { setPostDetailsDispatch } from "./dispatchCreators";
import { AdCategoryTag } from "./CategoryTag";
import { MapContainer } from "./Map";
import PayPal from "./PayPalButton";
import Gallery from "./Gallery";
import { BorderedButtonDiv, HeartButton } from "./HeartButton";
import "react-dropzone-uploader/dist/styles.css";
import Dropzone from "react-dropzone-uploader";
import { LoadingWrapper } from "./Loading";
import {CustomButton} from "./Styled"

const AppLayout = styled.div`
  grid-template-rows: auto 1fr;
`;

const AdContainer = styled.div`
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items: center;
    border: 1px solid black;
    background: white;
    padding: 2em;
    box-sizing: border-box
    width: 75%;
    margin: 2em auto;
    max-width: 800px;
    box-shadow: 2px 2px 4px 4px lightgray;

    & > * {
      width:100%;
        margin: 1.5em auto;
    }
`;

const AdSingleLineInput = styled.input`
  text-align: center;
  border: none;
  border-bottom: 1px solid black;
  border-radius: 0;
  font-size: 1.25em;
  font-weight: bolder;
  padding: 0.2em;

  &:active,
  &:focus {
    outline: none;
  }
`;

const AdSingleLineTextArea = styled.textarea`
  border: 1px solid black;
  border-radius: 0;
  padding: 0.2em;

  &:active,
  &:focus {
    outline: none;
  }
`;

const CategorySelectDropdown = styled.select`
  width: 40%;
  min-width: 120px;
  padding: 0.2em;
`;

const CategoryDropodownOption = styled.option`
  width: 40%;
  min-width: 120px;
  padding: 0.2em;
`;

const postData = {
  title: "Nazwa produktu",
  desc: "React.js (inne stosowane nazwy: React, ReactJS) – biblioteka języka programowania JavaScript, która wykorzystywana jest do tworzenia interfejsów graficznych aplikacji internetowych. Została stworzona przez Jordana Walke, programistę Facebooka, a zainspirowana przez rozszerzenie języka PHP – XHP. Często wykorzystywana do tworzenia aplikacji typu Single Page Application. ",
  image: "/logo512.png",
  price: 49.9,
  date: "10-10-2022 10:00",
};

export function PostAdPage() {
  const [header, setHeader] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(10);
  const [negotiable, setNegotiable] = useState(false);
  const [category, setCategory] = useState("");

  const userID = useSelector((state) =>
    state.currentUser ? state.currentUser.uid : null
  );

  const [categories, setCategories] = useState([]);
  const [categoriesPending, setCatPending] = useState(true);
  const history = useHistory();
  /*
      const ad = new Ad({
        Header: req.body.Header,
        Description: req.body.Description,
        Price: req.body.Price,
        Negotiable: req.body.Negotiable,
        PostDate: req.body.PostDate,
        DueDate: req.body.DueDate,
        Id: req.body.Id,
        UserId: req.body.UserId,
        SubCategoryName: req.body.SubCategoryName,
      });
  */

  const data = () => {
    return {
      Header: header,
      Description: description,
      Price: price,
      Negotiable: negotiable,
      SubCategoryName: category,
      UserSso: userID
    };
  };

  function post() {
    fetch("http://164.90.162.213:3000/ads", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(data()),
    }).then((res) => console.log(res))
    .then(() => history.push("/")) ;
  }

  useEffect(() => {
    fetch("http://164.90.162.213:3000/subcategorys/")
      .then((res) => res.json())
      .then((json) => {
        setCategories(json);
        setCatPending(false);
        setCategory(categories[0]);
      });
  }, []);

  return (
    <LoadingWrapper pending={userID != null && categoriesPending}>
      <AppLayout>
        <AdContainer>
          <h2>Dodaj ogłoszenie</h2>
          <div>
            <AdSingleLineInput
              type="text"
              required
              name="title"
              placeholder="Title"
              value={header}
              style={{
                width: "50%",
                minWidth: "250px",
              }}
              onChange={(event) => setHeader(event.target.value)}
            />
          </div>
          <div>
            <AdSingleLineInput
              type="number"
              required
              name="price"
              placeholder="10.00"
              min="1.10"
              step="0.01"
              value={price}
              style={{ width: "50%", minWidth: "250px" }}
              onChange={(event) => setPrice(event.target.value)}
            />
          </div>
          <div style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
            <input
              type="checkbox"
              id="scales"
              name="scales"
              value={negotiable}
              onChange={(event) => setNegotiable(event.target.value)}
            ></input>
            <label style={{marginLeft:"1em"}}>Price Negotiable</label>
          </div>
          <div>
            <AdSingleLineTextArea
              required
              name="description"
              placeholder="Opis"
              value={description}
              style={{ width: "60%", height: "10em", minWidth: "200px" }}
              onChange={(event) => setDescription(event.target.value)}
            />
          </div>
          <CategorySelectDropdown
            value={category}
            multiple={false}
            onChange={(event) => setCategory(event.target.value)}
          >
            {categories.map((category) => (
              <CategoryDropodownOption value={category.Name}>
                {category.Name}
              </CategoryDropodownOption>
            ))}
          </CategorySelectDropdown>
          <CustomButton color="blue" style={{fontSize: "16px"}} onClick={post}>Post Ad</CustomButton>
        </AdContainer>
      </AppLayout>
    </LoadingWrapper>
  );
}

const ImageAudioVideo = () => {
  const getUploadParams = ({ meta }) => {
    const url = "https://httpbin.org/post";
    return {
      url,
      meta: { fileUrl: `${url}/${encodeURIComponent(meta.name)}` },
    };
  };

  const handleChangeStatus = ({ meta }, status) => {
    console.log(status, meta);
  };

  const handleSubmit = (files, allFiles) => {
    console.log(files.map((f) => f.meta));
    allFiles.forEach((f) => f.remove());
  };

  return (
    <Dropzone
      getUploadParams={getUploadParams}
      onChangeStatus={handleChangeStatus}
      onSubmit={handleSubmit}
      accept="image/*,audio/*,video/*"
      inputContent={(files, extra) =>
        extra.reject ? "Image, audio and video files only" : "Drag Files"
      }
      styles={{
        dropzoneReject: { borderColor: "red", backgroundColor: "#DAA" },
        inputLabel: (files, extra) => (extra.reject ? { color: "red" } : {}),
      }}
    />
  );
};

export default PostAdPage;
