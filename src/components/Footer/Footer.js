import React from 'react'
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => {
        console.log(theme.palette)
        return   {
            footerContainer:{
                color:'white',
                backgroundColor:'#352f2a',
                padding:'40px 0px',
                               
            },
            footerLink:{
                margin:'5px',
                fontSize: 12
            }
        }
})
export default function Footer(){
    const classes=useStyles()
    return <>
        <Grid justify='space-around' container className={classes.footerContainer}>
            <Box display="flex" flexDirection="column">
                <Typography  variant="h6">My Account</Typography>
                <Typography className={classes.footerLink} >Orders and Returns</Typography>
                <Typography className={classes.footerLink} >Email Preference</Typography>
                <Typography className={classes.footerLink} >Account Settings</Typography>
            </Box>
            <Box display="flex" flexDirection="column">
                <Typography  variant="h6">COMPANY</Typography>
                <Typography className={classes.footerLink}  variant="span">About Us</Typography>
                <Typography className={classes.footerLink} variant="span">Core Values</Typography>
                <Typography className={classes.footerLink} variant="span">Careers</Typography>
                <Typography className={classes.footerLink} variant="span">Blog</Typography>         
            </Box><Box display="flex" flexDirection="column">
                <Typography  variant="h6">Need Help?</Typography>
                <Typography className={classes.footerLink}  variant="span">FAQ</Typography>
                <Typography className={classes.footerLink} variant="span">Contact Us</Typography>
                <Typography className={classes.footerLink} variant="span">Chat</Typography>
            </Box>
            <Box display="flex" flexDirection="column">
                <Typography  variant="h6">Subsribe</Typography>
                <form style={{marginTop:'10px'}}>
                <input type="text"></input>
                <button type="submit">Subscribe</button>
                </form>
                <Typography className={classes.footerLink}  variant="span">
                Register now to get updates 
                </Typography>
                
            </Box>
            
            
        </Grid>
    </>
}