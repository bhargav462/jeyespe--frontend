import React from 'react'
import { makeStyles } from "@material-ui/core/styles";
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import {currencySymbols} from '../utility/countries'
import {StyledButton} from '../utility/StyledButton'
import { MyLoader } from '../utility/MyLoader';
import makePayment from '../utility/PaymentGateway'
import Paper from '@material-ui/core/Paper';
import {MyBackDrop} from '../utility/MyBackDrop'
import { authentication } from '../utility/APISecurity';
import Cookies from 'js-cookie'
import { Link } from "react-router-dom";



const useStyles = makeStyles((theme) => ({
    container:{
        width:'80%',
        minHeight:'60vh',
        margin:'80px auto'
    },
    paper:{
        padding: theme.spacing(2),
    },
    productContainer:{
        display:'flex',
        marginBottom:'20px',
        [theme.breakpoints.down('sm')]:{
            flexWrap:'wrap'
        }
    }
}))

const validationSchema = yup.object({
    country: yup.string('Enter Country')
    .required('Country is Required')
    .max(20,'Enter valid Country'),
    
    zipcode: yup.number('Enter Valid zipcode')
        .required('Field is Required'),
    city: yup
           .string('Enter City')
           .required('City is  Required')
           .max(40,'Enter valid city'),
    
    addressLine1: yup.string('Enter Address')
            .required('Field cannot be emnpty')
            .max(256, 'Cannot be more than 256 characters')
   
  });

export default function DirectPurchase(props){
    const params=props.match.params;
    const {id,family}=params
    const classes=useStyles()
    const [state,setState]=React.useState({productDetails:null,loading:true,invalidURL:false,activeBackDrop:false})
    const {productDetails,loading,invalidURL,activeBackDrop}=state

    function setBackdrop(status){
        setState(prevState=>{
            return {...prevState,loading:false,activeBackDrop:status}
        })
    }
    React.useEffect(()=>{
        fetch(process.env.REACT_APP_API_URL + `/images1/getChildImages/${family}/${id}`, {
            method: "GET",
            headers:{
                "Content-Type": "application/json",
            }
          }).then(res=> authentication(res, data=>{
              try{
                const {name,img,price,length,weight,height,currency}=data
                setState(prevState=>{
                    return {...prevState,loading:false,
                            productDetails:{name,img,price,length,weight,height,currency}}
                })
                
            }
            catch(e){
                setState(prevState=>{
                    
                    return{ ...prevState,loading:false,invalidURL:true}
                })
            }
          })
    )},[])
    const formik = useFormik({
        initialValues: {
          country:'',
          zipcode:'',
          city:'',
          addressLine1:''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
                
            makePayment({address:values,userItem:{itemId:id,itemFamily:family}},setBackdrop)
            
        },
      });

    //   console.log(state)
    
      if(loading)   return <MyLoader/>
      else if(invalidURL==true) return <div className={classes.container}>
                                <h1>Try Again...</h1>
                                </div>
return     <div className={classes.container}>
           <MyBackDrop open={activeBackDrop}/>
    <Grid container className={classes.root}  spacing={2}>

    
    <Grid item xs={12} md={6}>
    <Paper className={classes.paper}>
        <div className={classes.productContainer} >
        <img src={`${process.env.REACT_APP_API_URL}/images/${state.productDetails?.img}`}
                   width='230px' height='230px'/>
                   
         <div style={{padding:'10px'}}>
            <h5>{state.productDetails?.name}</h5>
            <h5>{`${currencySymbols[state.productDetails?.currency]} ${state.productDetails?.price}`}</h5>
            <h5>Qty. 1</h5>
        </div>
        </div>
        </Paper>
        </Grid>

        <Grid item xs={12} md={6}>  
        <Paper className={classes.paper}>
            <form onSubmit={formik.handleSubmit}>
        
            <TextField
            fullWidth
            id="country"
            name="country"
            label="country"
            type="text"
            value={formik.values.country}
            onChange={formik.handleChange}
            error={formik.touched.country && Boolean(formik.errors.country)}
            helperText={formik.touched.country && formik.errors.country}
            />

            <TextField
            fullWidth
            id="city"
            name="city"
            label="city"
            type="text"
            value={formik.values.city}
            onChange={formik.handleChange}
            error={formik.touched.city && Boolean(formik.errors.city)}
            helperText={formik.touched.city && formik.errors.city}
            />

            <TextField
            fullWidth
            id="addressLine1"
            name="addressLine1"
            label="AddressLine 1"
            type="text"
            value={formik.values.addressLine1}
            onChange={formik.handleChange}
            error={formik.touched.addressLine1 && Boolean(formik.errors.addressLine1)}
            helperText={formik.touched.addressLine1 && formik.errors.addressLine1}
            />
            
            <TextField
            fullWidth
            id="zipcode"
            name="zipcode"
            label="zipcode"
            type="zipcode"
            value={formik.values.zipcode}
            onChange={formik.handleChange}
            error={formik.touched.zipcode && Boolean(formik.errors.zipcode)}
            helperText={formik.touched.zipcode && formik.errors.zipcode}
            />
            <Link to="/refundPolicy">Check Our Refund Policy</Link>
            <br/>
                <StyledButton  variant="outlined" style={{marginTop:'10px'}} type="submit">
                Pay Now
                </StyledButton>
            </form> 
        </Paper>
        </Grid>
    </Grid>

        </div>
    

}