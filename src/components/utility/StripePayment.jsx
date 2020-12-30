import React from 'react'
import Cookies from "js-cookie";
import StripeCheckout from 'react-stripe-checkout';
import { StyledButton } from './StyledButton';
import {authentication} from './APISecurity'
import { MESSAGES } from './Messages';
import swal from 'sweetalert'


const makePayment = (token,isCart,productDetails,setLoading) => {
    setLoading(true);
    console.log(productDetails)
    let body = {
        token
    }
    let route='/purchase'
    if(!isCart) {
        route='/buyNow'
        body={...body,userItem:{itemId:productDetails.id,
                itemFamily:productDetails.family}}
    }

    const headers = {
        "Content-Type": "application/json",
        "token": Cookies.get('token')
    }

    return fetch(process.env.REACT_APP_API_URL+route,{
        method: "POST",
        headers,
        body: JSON.stringify(body)
    }).then(response => {
        authentication(response,(data)=>{
            setLoading(false);
           
            if(data==MESSAGES.LOGIN_ERROR)
           {
               return
           }

         if(data.status==true) 
            swal("Your Payment is Successful ","Thankyou for shopping with us ","success");
         else 
            swal('Payment Failed','Sorry for the inconvinience',"error")
       })
    })
    .catch(error => swal('ERROR!','Something went wrong','error'));
    setLoading(false);
}

export  function StripePayment(props){
    return  <StripeCheckout
    shippingAddress
    stripeKey="pk_test_51HgaW6HISAjMedpx6Rx65qvbEpNdhHsyyayo021HcDwMsSHmk9Ei4FnZsEZ1bogeCeG9gPTSdu9FBxgarfA5hlKQ00EJ3URML8"
    token={(token)=>makePayment(token,props.isCart,props.productDetails,props.setLoading)}
    >
        <StyledButton size={props.size || 'medium'} style={{marginRight:'10px',marginBotton:'10px'}}>
            Buy Now
        </StyledButton>
    </StripeCheckout>
}