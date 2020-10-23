import React from 'react'
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => {
        console.log(theme.palette)
        return   {
            FooterStyle:{
                color:'white',
                backgroundColor:'#1d2547',
            }
        }
})
export default function Footer(){
    const classes=useStyles()
    return <>
        <Grid container className={classes.FooterStyle}>
            <Grid item>
                <p style={{padding:'20px'}}>All copyrights reserved</p>
            </Grid>
        </Grid>
    </>
}