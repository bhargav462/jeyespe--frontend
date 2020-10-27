import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import logo from "./images/logo.png";
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

const useStyles = makeStyles((theme) => {
  return {
    appBar: {
      flexGrow: 1,
      backgroundColor: theme.palette.primary.main,
    },
    logo: {
      [theme.breakpoints.down("sm")]: {
        width: "100px",
        height: "50px",
      },
      width: "200px",
      height: "80px",
      marginTop: "5px",
      marginBottom: "5px",
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up("md")]: {
        display: "none",
      },
    },
    title: {
      flexGrow: 1,
    },
    link: {
      padding: "20px",
      color: "black",
      textDecoration: "none",
      "&:hover": {
        // backgroundColor: theme.palette.secondary.main,
        color: theme.palette.secondary.main,
      },
    },
    leftLinksGroup: {
      [theme.breakpoints.down("sm")]: {
        display: "none",
      },
    },
    myAccountLink: {
      padding: "10px",
      color: "black",
      textDecoration: "none",
      "&:hover": {
        // backgroundColor: theme.palette.secondary.main,
        color: theme.palette.secondary.main,
      },
      [theme.breakpoints.down("sm")]: {
        display: "none",
      },
    },
  };
});

export default function ButtonAppBar() {
  const classes = useStyles();
  const [openState, setOpen] = React.useState(false);

  return (
    <div>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={() => setOpen(true)}
          >
            <MenuIcon />
          </IconButton>
          <StyledLink to="/">
            <img src={logo} className={classes.logo}></img>
          </StyledLink>
          <div className={classes.leftLinksGroup}>
            <StyledLink to="/catalog" style={{ textDecoration: "none" }}>
              <Typography component="span" className={classes.link}>
                Real SandleWood Products
              </Typography>
            </StyledLink>
            <Typography component="span" className={classes.link}>
              About Us
            </Typography>
            <Typography component="span" className={classes.link}>
              Contact Us
            </Typography>
          </div>
          <div className={classes.title}></div>

          <StyledLink to="login" className={classes.myAccountLink}>
            <Typography component="span">Login</Typography>
          </StyledLink>
          <StyledLink to="register" className={classes.myAccountLink}>
            <Typography component="span">Register</Typography>
          </StyledLink>
          <IconButton>
            <ShoppingCartIcon />
          </IconButton>
        </Toolbar>
        <Drawer
          anchor={"left"}
          open={openState}
          onClose={() => setOpen(!openState)}
        >
          <List component="nav" style={{ width: "250px" }}>
            <StyledLink to="/login">
              <ListItem button>
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary="Login" />
              </ListItem>
            </StyledLink>
            <ListItem button>
              <ListItemIcon>
                <DraftsIcon />
              </ListItemIcon>
              <ListItemText primary="Drafts" />
            </ListItem>
            <StyledLink to="/catalog">
              <ListItem button>
                <ListItemIcon>
                  <ListIcon />
                </ListItemIcon>
                <ListItemText primary="Real SandleWood Products" />
              </ListItem>
            </StyledLink>

            <StyledLink to="/register">
              <ListItem button>
                <ListItemIcon>
                  <ListIcon />
                </ListItemIcon>
                <ListItemText primary="Register" />
              </ListItem>
            </StyledLink>

            <ListItem button>
              <ListItemIcon>
                <InfoIcon />
              </ListItemIcon>
              <ListItemText primary="About Us" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <PermContactCalendarIcon />
              </ListItemIcon>
              <ListItemText primary="Contact Us" />
            </ListItem>
          </List>
        </Drawer>
      </AppBar>
    </div>
  );
}
