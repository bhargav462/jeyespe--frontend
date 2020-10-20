import React from 'react'
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => {
        console.log(theme.palette)
        return   {
            FooterStyle:{
                backgroundColor:theme.palette.primary.main,
                color:'white'
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