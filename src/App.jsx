import React from "react";
import NavBar from "./components/NavBar/NavBar";
import Home from "./components/Home/Home";
import Footer from "./components/Footer/Footer";
import {
  createMuiTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import { Redirect, Router, Route, Switch } from "react-router-dom";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Catalog from "./components/Catalog/Catalog";
import ShoppingCart from "./components/ShoppingCart/ShoppingCart";
import {
  AuthProvider,
  RequestContext,
} from "./components/utility/AuthProvider";
import customTheme from "./components/utility/customTheme";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import Contact from "./components/Contact/Contact";
import { MyLoader } from "./components/utility/MyLoader";
import MyOrders from "./components/MyOrders/MyOrders";
import Profile from "./components/Profile";
import history from "./components/utility/history";
import { DirectPurchase } from "./components/DirectPurchase";
import { CartPurchase } from "./components/CartPurchase";
import { Link, NavLink } from "react-router-dom";
import { StyledButton } from "./components/utility/StyledButton";
import TermsAndConditions from "./components/Policies/TermsAndConditions";
import PrivacyPolicy from "./components/Policies/PrivacyPolicy";
import RefundPolicy from "./components/Policies/RefuncPolicy"
function App() {
  return (
    <div>
      <AuthProvider>
        <AllCode />
      </AuthProvider>
    </div>
  );
}

function AllCode() {
  const requestProcessed = React.useContext(RequestContext);

  if (requestProcessed)
    return (
      <ThemeProvider theme={customTheme}>
        <Router history={history}>
          <Switch>
            <Route exact path="/">
              <NavBar />
              <Home />
              <Footer />
            </Route>

            <Route exact path="/profile">
              <NavBar />
              <Profile />
              <Footer />
            </Route>

            <Route exact path="/login">
              <NavBar />
              <Login />
            </Route>
            <Route exact path="/register">
              <NavBar />
              <Register />
            </Route>
            <Route
              exact
              path="/catalog"
              render={(props) => (
                <>
                  <NavBar />
                  <Catalog {...props} />
                  <Footer />
                </>
              )}
            ></Route>
            <Route exact path="/cart">
              <NavBar />
              <ShoppingCart />
              <Footer />
            </Route>
            <Route
              exact
              path="/product/:family/:id"
              render={(props) => (
                <>
                  <NavBar />
                  <ProductDetails {...props} />
                  <Footer />
                </>
              )}
            ></Route>

            <Route
              exact
              path="/purchase/:family/:id"
              render={(props) => (
                <>
                  <NavBar />
                  <DirectPurchase {...props} />
                  <Footer />
                </>
              )}
            ></Route>

            <Route
              exact
              path="/buynow"
              render={(props) => (
                <>
                  <NavBar />
                  <CartPurchase {...props} />
                  <Footer />
                </>
              )}
            ></Route>

            <Route
              exact
              path="/contact"
              render={(props) => (
                <>
                  <NavBar />
                  <Contact {...props} />
                  <Footer />
                </>
              )}
            ></Route>
            <Route
              exact
              path="/myOrders"
              render={(props) => (
                <>
                  <NavBar />
                  <MyOrders />
                  <Footer />
                </>
              )}
            ></Route>

            <Route
              exact
              path="/termsAndConditions"
              render={(props) => (
                <>
                  <NavBar />
                  <TermsAndConditions {...props} />
                </>
              )}
            ></Route>

            <Route
              exact
              path="/privacyPolicy"
              render={(props) => (
                <>
                  <NavBar />
                  <PrivacyPolicy {...props} />
                </>
              )}
            ></Route>

            <Route
              exact
              path="/refundPolicy"
              render={(props) => (
                <>
                  <NavBar />
                <RefundPolicy {...props} />
                </>
              )}
            ></Route>

            <Route
              exact
              path="/error"
              render={(props) => (
                <>
                  <h1>Server Crashed</h1>
                </>
              )}
            ></Route>

            <Route
              exact
              path="/404"
              render={(props) => (
                <div style={{ textAlign: "center" }}>
                  {/* <NavBar/> */}
                  <h1 style={{ marginBottom: "30px" }}>Please Login First</h1>
                  <Link to="/">
                    <StyledButton style={{ marginRight: "20px" }}>
                      Home
                    </StyledButton>
                  </Link>
                  <Link to="/login">
                    <StyledButton>Login</StyledButton>
                  </Link>
                </div>
              )}
            ></Route>

            <Route render={() => <Redirect to={{ pathname: "/" }} />} />
          </Switch>
        </Router>
      </ThemeProvider>
    );
  else return <MyLoader />;
}

export default App;
