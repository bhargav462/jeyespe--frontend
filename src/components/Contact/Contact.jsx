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
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.1853729064837!2d83.21559614949287!3d17.68631534330372!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTfCsDQxJzEyLjMiTiA4M8KwMTInNTYuOSJF!5e1!3m2!1sen!2sin!4v1609323500386!5m2!1sen!2sin" 
        className={classes.map} ></iframe>
      {/* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d248849.55224420098!2d77.49085232434939!3d12.954294599027378!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sBengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1604656064028!5m2!1sen!2sin" 
         className={classes.map}   ></iframe> */}
         <div className={classes.addressContainer}>
        
         <Typography variant="h3" component="span">Phone Numbers</Typography>
         <p>+91 949-499-2255 / +91 807-490-4565</p>
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
         <p><a href="http://www.jeyespe.com">www.jeyespe.com</a></p>
         </div>
    </div>
}