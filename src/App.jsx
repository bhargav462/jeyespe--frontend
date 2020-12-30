import React from "react";
import NavBar from './components/NavBar/NavBar'
import Home from './components/Home/Home'
import Footer from './components/Footer/Footer'
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import {Redirect,BrowserRouter as Router,Route} from 'react-router-dom'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import Catalog from './components/Catalog/Catalog'
import ShoppingCart from './components/ShoppingCart/ShoppingCart'
import {AuthProvider, RequestContext} from './components/utility/AuthProvider'
import customTheme from './components/utility/customTheme'
import ProductDetails from './components/ProductDetails/ProductDetails'
import Contact from './components/Contact/Contact'
import {MyLoader} from './components/utility/MyLoader'
import MyOrders from './components/MyOrders/MyOrders'
import Profile from './components/Profile'
import { useLocation } from "react-router-dom";

function App() {
  return (
    <div>
    <AuthProvider>
      <AllCode/>
    </AuthProvider>
    </div>
  );
}

function AllCode(){
  const requestProcessed=React.useContext(RequestContext)
  // console.log('hey----------',requestProcessed)
  
  // React.useEffect(() => {
    //   window.scrollTo(0, 0);
    // }, [pathname]);
    
    if(requestProcessed) 
    return (
      <ThemeProvider theme={customTheme}>
      <Router>
        
          <Route exact path="/">
            <NavBar/>
            <Home/>
            <Footer/>
          </Route>

          <Route exact path="/profile">
            <NavBar/>
            <Profile/>
            <Footer/>
          </Route>
       
          <Route exact path="/login">
            <NavBar/>
            <Login/>
          </Route>
          <Route exact path="/register">
            <NavBar/>
            <Register/>
          </Route>
          <Route exact path="/catalog"render={(props) => <>
               <NavBar/>
               <Catalog {...props} />
               <Footer/>
               </>
           }>
          </Route>
          <Route exact path="/cart">
            <NavBar/>
            <ShoppingCart/>
            <Footer/>
          </Route>
          <Route exact path="/product/:family/:id"
          render={(props) => <>
               <NavBar/>
               <ProductDetails {...props} />
               <Footer/>
               </>
           }>   
          </Route>
  
          <Route exact path="/contact"
          render={(props) => <>
               <NavBar/>
               <Contact {...props} />
               <Footer/>
               </>
           }>   
          </Route>
          <Route exact path="/myOrders"
          render={(props) => <>
               <NavBar/>
                <MyOrders/>
               <Footer/>
               </>
           }>   
          </Route>
      

      </Router>
      
      </ThemeProvider>
  )
  else
     return  <MyLoader/>
}

export default App;
