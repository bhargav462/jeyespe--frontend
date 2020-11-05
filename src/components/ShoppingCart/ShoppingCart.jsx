import React, { Component, useState } from 'react'
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import StripeCheckout from 'react-stripe-checkout';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Cookies from 'js-cookie'

export default function ShoppingCart(){
        const matches = useMediaQuery(theme => theme.breakpoints.up('md'));
        // const [product,setProduct] = useState({
        //     productId: "",
        //     productFamily: ""
        // })

        const checkOutButtonStyles = {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop:'20px'
        }

        const products = [{
            id: "PHS01",
            productFamily: "PhoneAccessories",
            quantity: 1
        },{
            id: "car02",
            productFamily: "CarDecors",
            quantity: 2
        },{
            id: "id03",
            productFamily: "Idols",
            quantity: 3
        }];

        fetch(process.env.REACT_APP_API_URL+'/getCartItems',{
            method: "POST",
            headers:{
                "Content-Type": "application/json",
                "token": Cookies.get('token')
            }
            // send the body by using JSON.stringify
        }).then(response => {
            if(!response.ok){
                alert('Please Login')
            }else{
                response.json().then(cart => {
                    //cart Items
                    console.log('cart',cart);
                })
            }
        });



        let authentication = function(response) {
            if (!response.ok) {
              if (response.status === 403) {
                response.json().then((element) => {
                  if (element.error === "Login") {
                    // TODO : Route to login page
                    console.log("routing")
                  }else{
                    renderData(element);     
                  }
                });
              }
            }
          };

          let renderData = function(products){
            // TODO: Do something with response 
          }

        // TODO: "add the products of the cart to product variable"

        const makePayment = token => {
            const body = {
                token,
                products
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
                authentication(response)
                
            })
            .catch(error => console.log(error));
        }
        if(matches)
        return (
            
            <Box style={{minHeight:'100vh'}} elevation={3}
                m={4} component={Paper}>
                <Box fontSize='h4.fontSize' m={3}>
                Items in Your Bag
                </Box>
                <Divider variant="middle" />

                <Box display="flex">
                    <img style={{margin:'10px 70px',width:'150px', height:'150px'}} src='https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-pro-12-11-select-202003_FMT_WHH?wid=2000&hei=2000&fmt=jpeg&qlt=80&op_usm=0.5%2C0.5&.v=1583433236838'></img>
                    <Box style={{flexGrow:1}}>
                        <Box mt={3} mx={3}  display="flex" justifyContent="space-between">
                        <h5>Red Wood Phone Stand</h5>
                        <h5>Rs. 12000</h5>
                        <h5>Qty. <input type="text" value="10" readOnly size={3}></input></h5>
                        <h5> $120000</h5>
                        </Box>
                        <Box variant="h5" mx={3}>
                            Order By 5pm to avail the best offers
                        </Box>
                    </Box>
                
                </Box>
                <Divider variant="middle"/>
                <div style={checkOutButtonStyles}>
                    <StripeCheckout
                    stripeKey="pk_test_51HgaW6HISAjMedpx6Rx65qvbEpNdhHsyyayo021HcDwMsSHmk9Ei4FnZsEZ1bogeCeG9gPTSdu9FBxgarfA5hlKQ00EJ3URML8"
                    token={makePayment}
                    >
                    </StripeCheckout>
                </div>
            </Box>
        )
        else
        {
            return (
                <Box style={{minHeight:'100vh'}} elevation={3}
                 m={4} component={Paper}>
                <Box fontSize='h4.fontSize' m={3}>
                Items in Your Bag
                </Box>
                <Divider variant="middle" />
                <div>
                    <Box display="flex">
                        <img style={{margin:'10px 10px',width:'120px', height:'120px'}} src='https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-pro-12-11-select-202003_FMT_WHH?wid=2000&hei=2000&fmt=jpeg&qlt=80&op_usm=0.5%2C0.5&.v=1583433236838'></img>
                        <div style={{flexGrow:1,paddingLeft:'10px',paddingTop:'10px'}}>
                        
                            <Typography variant="h3">Red Wood Phone Stand</Typography>
                            <Typography variant="p" component="div">Rs. 12000</Typography>
                            <Typography variant="p" component="div"> $120000</Typography>
                        </div>

                    </Box>
                
                    <Typography variant="p" style={{paddingLeft:'30px',paddingTop:'10px'}}>
                        Qty. <input type="text" value="10" readOnly size={3}></input>
                    </Typography>

                    <Divider variant="middle" style={{marginTop:'20px'}}/>
                </div>  


                <div style={checkOutButtonStyles}>
                    <StripeCheckout
                    stripeKey="pk_test_51HgaW6HISAjMedpx6Rx65qvbEpNdhHsyyayo021HcDwMsSHmk9Ei4FnZsEZ1bogeCeG9gPTSdu9FBxgarfA5hlKQ00EJ3URML8"
                    token={makePayment}
                    >
                    </StripeCheckout>
                </div>
            </Box>
            )
        }
    
}
