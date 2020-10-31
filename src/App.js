import React from "react";
import NavBar from './components/NavBar/NavBar'
import CustomCorousel from './components/Corousel/CustomCorousel'
import Home from './components/Home/Home'
import Footer from './components/Footer/Footer'
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import {Redirect,BrowserRouter as Router,Route} from 'react-router-dom'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import Catalog from './components/Catalog/Catalog'
import ShoppingCart from './components/ShoppingCart/ShoppingCart'
import {AuthProvider} from './components/utility/AuthProvider'
import customTheme from './components/utility/customTheme'
import { MuiThemeProvider,StylesProvider } from "@material-ui/core/styles";

function App() {
 
  return (
    <div>
    <AuthProvider>
    
    <ThemeProvider theme={customTheme}>
    <Router>
        <Route exact path="/">
          <NavBar/>
          <CustomCorousel/>
          <Home/>
          <Footer/>
        </Route>
        <Route exact path="/login">
          <NavBar/>
          <Login/>
        </Route>
        <Route exact path="/Register">
          <NavBar/>
          <Register/>
        </Route>
        <Route exact path="/catalog">
          <NavBar/>
          <Catalog/>
          <Footer/>
        </Route>
        <Route exact path="/cart">
          <NavBar/>
          <ShoppingCart/>
          <Footer/>
        </Route>
    </Router>
    
    </ThemeProvider>

 
    </AuthProvider>
    </div>
  );
}

export default App;
