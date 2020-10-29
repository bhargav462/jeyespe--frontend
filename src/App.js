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

const innerTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#e53935',
      dark:'#ab000d',
      light: '#ff6e60'
    },
    secondary:{
      main : '#5c6bc0',
      light: '#ffc08d',
      dark: '#c56033'
    }
  },
  typography: {
    fontSize: 16,
    // fontFamily: [
    //   "Comic Sans MS", 'cursive', 'sans-serif'
    // ].join(','),
  }
});

function App() {
 
  return (
    <div>
    <AuthProvider>
    <ThemeProvider theme={innerTheme}>
    <Router>
        <Route exact path="/">
          <NavBar/>
          <CustomCorousel/>
          <About/>
          
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
        {/* <AuthCheck> */}
          <NavBar/>
          <ShoppingCart/>
          <Footer/>
          {/* </AuthCheck> */}
        </Route>
    </Router>
    
    </ThemeProvider>
    </AuthProvider>
    </div>
  );
}

export default App;
