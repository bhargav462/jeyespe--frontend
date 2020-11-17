import React from 'react'
import Cookies from "js-cookie";
import StripeCheckout from 'react-stripe-checkout';
import { StyledButton } from './StyledButton';
import {authentication} from './APISecurity'
const makePayment = token => {
    const body = {
        token
    }
    
    const headers = {
        "Content-Type": "application/json",
        "token": Cookies.get('token')
    }

    return fetch(process.env.REACT_APP_API_URL+"/purchase",{
        method: "POST",
        headers,
        body: JSON.stringify(body)
    }).then(response => {
       return authentication(response,(data)=>{
         if(data.status==true)  alert('Payment Successful')
         else alert('Payment Failed')
       })
    })
    .catch(error => console.log(error));
    
}

export  function StripePayment(){
    return  <StripeCheckout
    shippingAddress
    stripeKey="pk_test_51HgaW6HISAjMedpx6Rx65qvbEpNdhHsyyayo021HcDwMsSHmk9Ei4FnZsEZ1bogeCeG9gPTSdu9FBxgarfA5hlKQ00EJ3URML8"
    token={makePayment}
    >
        <StyledButton style={{marginRight:'10px',marginBotton:'10px'}}>
            Buy Now
        </StyledButton>
    </StripeCheckout>
}