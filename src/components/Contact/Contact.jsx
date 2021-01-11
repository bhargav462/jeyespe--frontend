import React from 'react'
import Stripe from '../utility/Stripe'
import Parallax from './parallax1.jpg'
import {StyledButton} from '../utility/StyledButton'
import {Link} from 'react-router-dom'
import { makeStyles } from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
const useStyles = makeStyles(theme=>({
    map:{
        width:'100%',
        height:'300px',
        border:0,
        [theme.breakpoints.up('md')]: {
            height:'500px'       
        }
    },
    addressContainer:{
        padding:'10%'
    }
}))
export default function Contact(){
    const classes=useStyles()
    
    React.useEffect(() => {
        window.scrollTo(0, 0)
      }, [])

    return <div>
    <Stripe image={Parallax}>
        <h1 style={{ marginBottom: "50px" }}>
         Contact Us
        </h1>
        <Link to="/"><StyledButton mode="dark">Home</StyledButton></Link>
      </Stripe>
      
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15192.013682186607!2d82.85130145376645!3d17.83847458452887!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTfCsDQ5JzU0LjYiTiA4MsKwNTEnMzYuMSJF!5e0!3m2!1sen!2sin!4v1610370078136!5m2!1sen!2sin" 
        className={classes.map} ></iframe>

         <div className={classes.addressContainer}>
        
         <Typography variant="h3" component="span">Founder</Typography>
         <p>JASTI SAI PRABHAKAR</p>
         <Divider/>
         <Typography variant="h3" component="span">Phone Numbers</Typography>
         <p>+91 9494992255 / +91 7013934774</p>
         <Divider/>
         <Typography variant="h3" component="span">Address</Typography>
            <address>
                    JEYESPE impex,<br/>
                    L.B.P Agraharam village,<br/>
                    Narsipatnam road,<br/>
                    vaddadi post, Butcheyyapeta mandal, <br/>
                    Visakhapatnam dt, A.P<br/>
                    PIN: 531026, India.
            </address>
        
         <Divider/>
         <br/>
         <Typography variant="h3">Email</Typography>
         <p>jasti_saiji@yahoo.co.in, jeyespeimpex@gmail.com</p>
         <Divider/>
         <br/>
         <Typography variant="h3">Website</Typography>
         <p><a href="https://www.redcarvings.com">www.redcarvings.com</a></p>
         <p><a href="http://www.jeyespe.com">www.jeyespe.com</a></p>
         </div>
    </div>
}