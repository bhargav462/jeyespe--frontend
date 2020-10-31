import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles({
  stripeContainer: {
    color: "white",
    height: "400px",
    width: "100%",
    backgroundSize: "100% 100%",
    backgroundRepeat: "no-repeat",
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "100px 0px",
  },
  content: {
    
    width: "80%",
  },
});

export default function Stripe(props) {
  const classes = useStyles();
  console.log('in stripe',props)
  return (
    <div style={props.style} className={classes.stripeContainer} 
          style={{backgroundImage:`url(${props.image})`}}>
      <div className={classes.content}>  
          {props.children}
      </div>
    </div>
  );
}
