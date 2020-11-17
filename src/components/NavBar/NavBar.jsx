import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import logo from "./images/logo.jpeg";
import Drawer from "@material-ui/core/Drawer";
import InboxIcon from "@material-ui/icons/Inbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import InfoIcon from "@material-ui/icons/Info";
import ListIcon from "@material-ui/icons/List";
import MenuIcon from "@material-ui/icons/Menu";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PermContactCalendarIcon from "@material-ui/icons/PermContactCalendar";
import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import StyledLink from "../utility/StyledLink";
import { AuthContext, AuthUpdateContext } from "../utility/AuthProvider";
import { Link, NavLink } from "react-router-dom";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Cookies from 'js-cookie'
import HomeIcon from '@material-ui/icons/Home';
import Box from "@material-ui/core/Box";
import WorkIcon from '@material-ui/icons/Work';
import ListAltIcon from '@material-ui/icons/ListAlt';
import CreateIcon from '@material-ui/icons/Create';

const useStyles = makeStyles((theme) => {
  return {
    appBar: {
      flexGrow: 1,
      backgroundColor: theme.palette.primary.main,
    },
    logo: {
      [theme.breakpoints.down("sm")]: {
        width: "70px",
        height: "60px",
      },
      width: "200px",
      height: "80px",
      marginTop: "5px",
      marginBottom: "5px",
    },
    displayBelowMedium: {
      [theme.breakpoints.up("md")]: {
        display: "none",
      },
    },
    title: {
      flexGrow: 1,
    },
    link: {
      padding: "10px",
      color: "white",
      "&:hover": {
        // backgroundColor: theme.palette.secondary.main,
        color: theme.palette.primary.dark,
        textDecoration: "none",
      },
    },
    activeLink:{
      color:theme.palette.primary.dark
    },
    linksGroup: {
      display: "flex",
      justifyContent: "center",
      flexGrow: 1,
      [theme.breakpoints.down("sm")]: {
        display: "none",
      },
    },
  };
});

function handleLogout(setUser) {
  Cookies.remove('token')
  setUser("");
}

export default function ButtonAppBar() {
  const classes = useStyles();
  const [openState, setOpen] = React.useState(false);
  const user = React.useContext(AuthContext);
  const setUser = React.useContext(AuthUpdateContext);
  console.log("In NavBar", user);
  return (
    <div>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Box flexGrow={1} display="flex" justifyContent="space-between" className={classes.displayBelowMedium}>
          <NavLink to="/">
              <img src={logo} className={classes.logo}></img>
            </NavLink>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => setOpen(true)}
            >
              <MenuIcon />
            </IconButton>
          </Box>

          <div className={classes.linksGroup}>
            <NavLink
              to="/"
              className={classes.link}
              activeClassName={classes.activeLink}
              exact={true}
            >
              Home
            </NavLink>
            <NavLink
              to="/catalog"
              className={classes.link}
              activeClassName={classes.activeLink}
              exact={true}
            >
              Catalog
            </NavLink>
           
            <NavLink to="/contact"  className={classes.link}
              activeClassName={classes.activeLink}
              exact={true}>
              Contact Us
            </NavLink>

            {!user ? (
              <>
                <NavLink
                  to="/login"
                  className={classes.link}
                  activeClassName={classes.activeLink}
                  exact={true}
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  className={classes.link}
                  activeClassName={classes.activeLink}
                  exact={true}
                >
                  Register
                </NavLink>
              </>
            ) : (
              <>
               <NavLink
                  to="/cart"
                  className={classes.link}
                  activeClassName={classes.activeLink}
                  exact={true}
                >
                Cart
                </NavLink>
                
                <NavLink to="/myOrders"  className={classes.link}
                activeClassName={classes.activeLink}
                exact={true}>
                  My Orders
                </NavLink>
                <NavLink
                  to="/login"
                  className={classes.link}
                  activeClassName={classes.activeLink}
                  exact={true}
                  onClick={() => handleLogout(setUser)}
                >
                  Logout
                </NavLink>

               
              </>
            )}

          </div>
        </Toolbar>
        {/* This is drawer Area */}
        <Drawer
          anchor={"right"}
          open={openState}
          onClose={() => setOpen(!openState)}
        >
          <List component="nav" style={{ width: "250px" }} >
              <StyledLink to="/">
                  <ListItem button>
                    <ListItemIcon>
                      <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary="Home" />
                  </ListItem>
                </StyledLink>

            {
              !user ?  <>
                  <StyledLink to="/login">
                  <ListItem button>
                    <ListItemIcon>
                      <ExitToAppIcon />
                    </ListItemIcon>
                    <ListItemText primary="Login" />
                  </ListItem>
                </StyledLink>
                <StyledLink to="/register">
                  <ListItem button>
                    <ListItemIcon>
                      <CreateIcon />
                    </ListItemIcon>
                    <ListItemText primary="Register" />
                  </ListItem>
                </StyledLink>
              </>
              :

            <StyledLink to="/login"> 
            <ListItem button onClick={()=>handleLogout(setUser)}>
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
            </StyledLink>
          }
            <StyledLink to="/catalog">
              <ListItem button>
                <ListItemIcon>
                  <ListAltIcon />
                </ListItemIcon>
                <ListItemText primary="Catalog" />
              </ListItem>
            </StyledLink>

           {user &&  <>

            <StyledLink to="/myOrders">
                    <ListItem button>
              <ListItemIcon>
                <WorkIcon />
              </ListItemIcon>
              <ListItemText primary="My Order" />
            </ListItem>
            </StyledLink>
              
            <StyledLink to="/cart">
              <ListItem button>
              <ListItemIcon>
                <ShoppingCartIcon />
              </ListItemIcon>
              <ListItemText primary="Cart" />
            </ListItem>
            </StyledLink>
            </>
          }
           <StyledLink to="/contact">
            <ListItem button>
              <ListItemIcon>
                <PermContactCalendarIcon />
              </ListItemIcon>
              <ListItemText primary="Contact Us" />
            </ListItem>
            </StyledLink>
          </List>
        </Drawer>
      </AppBar>
    </div>
  );
}
