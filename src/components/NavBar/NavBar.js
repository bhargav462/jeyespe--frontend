import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import logo from './images/logo.png'
import Drawer from '@material-ui/core/Drawer';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';

import {List,ListItem,ListItemIcon,ListItemText}  from '@material-ui/core'

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
  link:{
    padding:'20px',
    color:'white',
    textDecoration:'none',
    "&:hover":{
      backgroundColor:'pink'
    }
  },
  conditionalDisplay:{
    [theme.breakpoints.down('sm')]: {
      display:'none'
    }
  }
}));


export default function ButtonAppBar() {
  const classes = useStyles();
  const [openState,setOpen]=React.useState(false)

  return (
    <div className={classes.root}>
      <AppBar position="static" >
        <Toolbar >
          <IconButton edge="start" className={classes.menuButton}
                      color="inherit" 
                      aria-label="menu"
                      onClick={()=>setOpen(true)}>
            <MenuIcon />
          </IconButton>
          <img src={logo} width='150px' height='50px'></img>
          <div className={classes.title}></div>
          <div className={classes.conditionalDisplay}>
            <a className={classes.link} href="#">Real SandleWood Products</a>
            <a className={classes.link} href="#">About Us</a>
            <a className={classes.link} href="#">Contact Us</a> 
          </div>
        </Toolbar>
        <Drawer anchor={'left'} open={openState} onClose={()=>setOpen(!openState)}>
            <List component="nav" style={{width:'250px'}}>
            <ListItem button>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Inbox" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <DraftsIcon />
              </ListItemIcon>
              <ListItemText primary="Drafts" />
            </ListItem>
          </List>
          </Drawer>
      </AppBar>

    </div>
  );
}
