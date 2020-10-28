import React from "react";
import NavBar from './components/NavBar/NavBar'
import CustomCorousel from './components/Corousel/CustomCorousel'
import About from './components/About/About'
import Footer from './components/Footer/Footer'
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import {Redirect,BrowserRouter as Router,Route} from 'react-router-dom'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import Catalog from './components/Catalog/Catalog'
import ShoppingCart from './components/ShoppingCart/ShoppingCart'
import {AuthProvider} from './components/utility/AuthProvider'
import AuthCheck from './components/utility/AuthCheck'
const innerTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#f2e1d9',
      dark:'#bfafa8',
      light: '#ffffff'
    },
    secondary:{
      main : '#fd8f5f',
      light: '#ffc08d',
      dark: '#c56033'
    }
  },
  typography: {
    fontSize: 16,
    fontFamily: [
      "Comic Sans MS", 'cursive', 'sans-serif'
    ].join(','),
  }
});

function App() {
 
  return (
    <AuthProvider>
    <ThemeProvider theme={innerTheme}>
    <Router>
        <Route exact path="/">
          <NavBar/>
          <CustomCorousel/>
          <About/>
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
        </Route>
        <Route exact path="/cart">
        {/* <AuthCheck> */}
          <NavBar/>
          <ShoppingCart/>
          {/* </AuthCheck> */}
        </Route>
    </Router>
    </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
