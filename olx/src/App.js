import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Topbar from "./Topbar";
import AdPage from "./AdPage";
import AdDetailsPage from "./AdDetailsPage";
import AdsPage from "./AdsPage";
import Login from "./authentication/Login";
import PrivateRoute from "./authentication/PrivateRoute";
import { AuthContext, AuthProvider } from "./authentication/Auth";
import { CartProvider } from "./Cart";
import CartPage from "./CartPage";
import CartButton from "./CartButton";
import MainPage from "./MainPage";
import SignUp from "./authentication/SignUp";
import ConfirmPage from "./PurchaseConfirmPage";
import AddEventButton from "./AddEventButton";
import Loading from "./Loading";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div style={{ background: "#222", minHeight: "100vh" }}>
            <Topbar /> 
            <ButtonSelection />
            <MainSwitch />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

function MainContainer(props) {
  return <div className="main-container">{props.children}</div>;
}

function MainSwitch(props) {
  const { pending } = useContext(AuthContext);
  return (
    <MainContainer>
      {!pending ? (
          <Switch>
            <Route exact path="/" component={MainPage} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/ad" component={AdPage} />
            <Route path="/ad/:adId" component={AdDetailsPage} />
            <PrivateRoute exact path="/cart" component={CartPage} />
            <PrivateRoute exact path="/purchase" component={ConfirmPage} />
            <Route path="/*" component={() => <Redirect to="/" />} />
          </Switch>
      ) : (
        <Loading />
      )}
    </MainContainer>
  );
}

function ButtonSelection(props) {
  const { pending } = useContext(AuthContext);
  return !pending ? <AddEventButton /> : <CartButton />;
}

export default App;
