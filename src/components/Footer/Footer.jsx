import React from 'react'
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { Link } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => {
        // console.log(theme.palette)
        return   {
            footerContainer:{
                color:'white',
                backgroundColor:'#352f2a',
                padding:'40px 0px',
                               
            },
            footerLink:{
                margin:'5px',
                fontSize: 15,
                color:'white',
                "&:hover": {
                    // backgroundColor: theme.palette.secondary.main,
                    color: theme.palette.primary.dark,
                    textDecoration: "none",
                  }
            },
            gridItem:{
                boxSizing:'border-box',
                padding:'5px',
            },
            map:{
                width:'200px',
                height:'200px',
                border:0,
                [theme.breakpoints.up('md')]: {
                    height:'300px',
                    width:'400px'       
                }
            }
        }
})
export default function Footer(){
    const classes=useStyles()
    return <>
        <Grid container justify={"space-around"} className={classes.footerContainer}>
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d248849.55224420098!2d77.49085232434939!3d12.954294599027378!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sBengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1604656064028!5m2!1sen!2sin" 
         className={classes.map}   ></iframe>
            <Box display="flex" flexDirection="column" className={classes.gridItem}>
                <Typography  variant="h6">My Account</Typography>
                <Link to="/myOrders" className={classes.footerLink} >
                    My Orders
                </Link>
                <Link to="/cart" className={classes.footerLink} >
                   Cart
                </Link>
            </Box>
            <Box display="flex" flexDirection="column" className={classes.gridItem}>
                <Typography  variant="h6">COMPANY</Typography>
                <Link to="/contact" className={classes.footerLink} >
                    Contact Us
                </Link>
                <Link to="/" className={classes.footerLink} >
                    Home
                </Link> 
                <Link to="#" className={classes.footerLink} >Blog</Link>         
                </Box>
            <Box display="flex" flexDirection="column" className={classes.gridItem}>
                <Typography  variant="h6">Need Help?</Typography>
                <Link to="/contact" className={classes.footerLink} >
                    Contact Us
                </Link>
            </Box>
            
            
        </Grid>
    </>
}