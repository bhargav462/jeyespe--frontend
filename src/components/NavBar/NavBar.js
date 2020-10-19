import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import logo from './images/logo.png'
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid'
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" >
        <Toolbar >
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <img src={logo} width='250px' height='100px'></img>
          {/* <div display="flex" style={{backgroundColor:'red',alignSelf:'stretch',alignItems:'flex-end'}}> */}
            <a>Real SandleWood Products</a>
            <a>About Us</a>
            <a>Contact Us</a>
          {/* </div> */}
            <a>Browse Our Products ShOP NOW</a>
        </Toolbar>
      </AppBar>

    </div>
  );
}
