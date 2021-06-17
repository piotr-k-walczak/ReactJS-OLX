import React, { useState, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { LoadingWrapper } from "./Loading";
import { Redirect } from "react-router-dom";
import { AdCard } from "./AdCard";
import { Searchbar } from "./Searchbar";
import { AdContainer } from "./AdPage";
import { CategoriesChart, NegotiableChart } from "./Charts";

export function AdminPage(props) {
  const [negotiable, setNegotiable] = useState({});
  const [negotiablePending, setNegotiablePending] = useState(true);

  const [categories, setCategories] = useState([]);
  const [categoriesPending, setCategoriesPending] = useState(true);

  const [negotiableError, setNegotiableError] = useState(false);
  const [categoriesError, setCategoriesError] = useState(false);

  const userID = useSelector((state) =>
    state.currentUser ? state.currentUser.uid : null
  );

  function fetchNegotiable() {
    fetch(`http://164.90.162.213:3000/analytics/ration/`).then((res) => {
      if (res.status == 200) {
        res.json().then((json) => setNegotiable(json));
      } else {
        setNegotiableError(true);
      }
      setNegotiablePending(false);
    });
  }

  function fetchCategories() {
    fetch(`http://164.90.162.213:3000/analytics/count/AdInCategory/`).then((res) => {
      if (res.status == 200) {
        res.json().then((json) => setCategories(json));
      } else {
        setCategoriesError(true);
      }
      setCategoriesPending(false);
    });
  }

  useEffect(() => {
    if (userID) {
      fetchNegotiable();
      fetchCategories();
    }
  }, [userID]);

  return (
    <React.Fragment>
        <LoadingWrapper pending={categoriesPending}>
          {
            <AdContainer>
              {categoriesError ? "An error has ocurred" : categories.length == 0 ? (
                "No categories found"
              ) : (
                <React.Fragment>
                  <h4>Categories</h4>
                  <Categories categories={categories} />
                </React.Fragment>
              )}
            </AdContainer>
          }
        </LoadingWrapper>
        <LoadingWrapper pending={negotiablePending}>
          {
            <AdContainer>
              {negotiableError ? (
                "An error has ocurred"
              ) : (
                <div>
                  <h4>Negotiable</h4>
                  <NegotiableChart nego={negotiable}/>
                </div>
              )}
            </AdContainer>
          }
        </LoadingWrapper>
    </React.Fragment>
  );
}

function Categories(props) {
  const { categories } = props;
  return <div>
      <CategoriesChart categories={categories}/>
      <div style={{width:"100%"}}>
      {
          categories.map(category => <CategorySummary {...category}/>)
      }
  </div>
      </div>
}

function CategorySummary(props){
    const {SubcategoryName, Count} = props;
    return <div style={{display: "flex", justifyContent:"space-between"}}>
            <div>{SubcategoryName}</div>
            <div>{Count}</div>
    </div>
}

export default AdminPage;
