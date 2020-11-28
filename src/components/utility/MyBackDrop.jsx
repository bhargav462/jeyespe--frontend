import React from 'react'
import { makeStyles } from "@material-ui/core/styles";
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
      }
    }))

export function MyBackDrop(props){
    const classes=useStyles();

   return <Backdrop className={classes.backdrop} open={props.open}>
    <CircularProgress color="inherit" />
   </Backdrop>
}