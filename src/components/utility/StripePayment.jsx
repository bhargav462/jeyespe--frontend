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
    }).then( response => {
        authentication(response,async (data)=>{
            setLoading(false);
           
            if(data==MESSAGES.LOGIN_ERROR)
           {
               return
           }

         if(data.status==true) 
            await swal("Your Payment is Successful ",
                            "Thankyou for shopping with us, Your order will be delivered soon",
                                "success")
         else 
            await swal('Payment Failed','Sorry for the inconvinience',"error")
            window.location.reload()
       })
    })
    .catch(error => swal('ERROR!','Something went wrong','error').then(
        setLoading(false)
    ));
}

export  function StripePayment(props){
    return  <StripeCheckout
    shippingAddress
    stripeKey={process.env.REACT_APP_STRIPE_KEY}
    token={(token)=>makePayment(token,props.isCart,props.productDetails,props.setLoading)}
    >
        <StyledButton size={props.size || 'medium'} style={{marginRight:'10px',marginBotton:'10px'}}>
            Buy Now
        </StyledButton>
    </StripeCheckout>
}