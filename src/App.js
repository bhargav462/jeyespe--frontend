import React from "react";
import NavBar from './components/NavBar/NavBar'
import CustomCorousel from './components/Corousel/CustomCorousel'
import About from './components/About/About'
import Footer from './components/Footer/Footer'
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { green, orange } from '@material-ui/core/colors';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import Login from './components/Login/Login'
console.log('hey here')
console.log(green)
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
    </Router>
    </ThemeProvider>
  );
}

export default App;