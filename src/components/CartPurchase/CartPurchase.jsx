import React,{useState} from 'react'
import { makeStyles } from "@material-ui/core/styles";
import { useFormik } from 'formik';
import * as yup from 'yup';
import {StyledButton} from '../utility/StyledButton'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import makePayment from '../utility/PaymentGateway'
import {MyBackDrop} from '../utility/MyBackDrop'
import { MyLoader } from '../utility/MyLoader';
import Cookies from 'js-cookie'
import { authentication } from '../utility/APISecurity';
import {MESSAGES} from '../utility/Messages'
import { Link} from "react-router-dom";
import {currencySymbols} from '../utility/countries'


function roundedValue(input)
{
    return Math.round((input + Number.EPSILON) * 100) / 100
}

function calculateSubTotal(items){
    let total=0;
    for(let i=0;i<items.length;i++)
    {
        total+=Number(items[i].price)*Number(items[i].quantity)
    }
    return roundedValue(total)
}


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

const useStyles = makeStyles((theme) => ({
    container:{
        width:'80%',
        minHeight:'60vh',
        margin:'80px auto'
    },
    paper:{
        padding: theme.spacing(2),
        margin:'10px'
    },
    productContainer:{
        display:'flex',
        marginBottom:'20px',
        [theme.breakpoints.down('sm')]:{
            flexWrap:'wrap'
        }
    },
    emptyCart:{
        padding:'20px 40px'
    },
    addressForm:{
        position:'sticky',
        top:'100px'
    },
    productList:{
        // maxHeight:'80vh',
        // overflow:'scroll'
    }
}))


export default function CartPurchase(props){
    const classes=useStyles()
    const [state,setState]=useState({products:[],
                            currency:'INR',
                            loading:true,
                            activeBackdrop:false,
                            isCartEmpty:false})
    const {products,currency,loading,activeBackdrop,isCartEmpty}=state
    function setBackdrop(status){
        setState(prevState=>{
            return {...prevState,loading:false,activeBackdrop:status}
        })
    }
    const formik = useFormik({
        initialValues: {
          country:'',
          zipcode:'',
          city:'',
          addressLine1:''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
                makePayment({address:values},setBackdrop,true)
        },
      });
    
      React.useEffect(()=>{
        //To set scroll bar to top
        window.scrollTo(0, 0)
          
        fetch(process.env.REACT_APP_API_URL+'/getCartItems',{
            method: "POST",
            headers:{
                "Content-Type": "application/json",
                "token": Cookies.get('token')
            }
            // send the body by using JSON.stringify
        }).then( (response) => {
            authentication(response,(data)=>{
                    if(data===MESSAGES.LOGIN_ERROR)
                    {
                        setState(prevState=> {
                            return {...prevState,loading:false}
                        })
                        return
                    }
                    else if(data.cart !== false)
                    {
                        // console.log('hey bhavuk',data)
                        setState(prevState=>{
                            return {...prevState,
                                    loading:false,
                                    products:data.items,
                                    isCartEmpty:false,
                                    quantities:data.items.map(item=> item.quantity),
                                    currency: data.currency}
                        })
                    }else{
                        setState(prevState=>{
                            return {
                                ...prevState,
                                isCartEmpty:true,
                                loading:false
                            }
                        })
                    }
                   
                })
            })
        
        },[])

        if (loading)
    {
        return <MyLoader/>
    }
    else if(isCartEmpty==true)
    {
        return <>
        <h1 className={`${classes.container} ${classes.emptyCart}`}>Your Cart is Empty</h1>
        </>
    }
   
    else    return     <div className={classes.container}>
           <MyBackDrop open={activeBackdrop}/>
    <Grid container className={classes.root}  spacing={2}>

    <Grid item xs={12} md={6} className={classes.productList}>  
      
            {
                products.map(prod=>{
                    return   <Paper className={classes.paper}>
                          <div className={classes.productContainer} >
                        <Link to={`/product/${prod.itemFamily}/${prod.itemId}`}><img style={{width:'150px', height:'120px'}} 
                    src={process.env.REACT_APP_API_URL+`/image/${prod.itemFamily}/${prod.itemId}`}></img></Link>
                   <div style={{padding:'10px'}}>
                        <h5>{prod.name}</h5>
                        <h5>{`${currencySymbols[currency]} ${prod.price}`}</h5>
                        <h5>Qty. {prod.quantity}</h5>
                    </div>
                    </div>
                    </Paper>
                })
            }
           
            </Grid>
   

        <Grid item xs={12} md={6} >  
        <Paper className={`${classes.paper} ${classes.addressForm}`}>
        <h5>Total : {`${currencySymbols[currency]} ${calculateSubTotal(products)}`}</h5>
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