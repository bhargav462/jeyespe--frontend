import React, { Component, useEffect, useState } from 'react'
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import StripeCheckout from 'react-stripe-checkout';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from "@material-ui/core/styles";
import Cookies from 'js-cookie'

function authentication(response) {
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

function renderData(products){
  // TODO: Do something with response 
}

const makePayment = (token,products) => {
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

const useStyles = makeStyles((theme) => ({
    checkOutButtonStyles:{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop:'20px'
    },
    container:{
        minHeight:'100vh',
        marginTop:'80px'
    },
    heading:{
        textAlign:'center',
        padding:'15px'
    }
}))
function calculateSubTotal(items){
    let total=0;
    for(let i=0;i<items.length;i++)
    {
        total+=(items[i].price-0)
    }
    return total
}

export default function ShoppingCart(){
    const matches = useMediaQuery(theme => theme.breakpoints.up('md'));
    const classes=useStyles()
    const [products,setProducts]=useState([])
    useEffect(()=>{
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
                console.log(response.body);
                    
                response.json().then(cart => {
                    //cart Items
                    if(cart.cart !== false)
                    {
                        console.log('hey bhavuk',cart.items)
                        setProducts(cart.items)
                    }else{
                        // Empty cart
                        console.log('empty');
                    }
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
              console.log(products,products)
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
        <Box className={classes.container} elevation={3}
                m={4} component={Paper}>
                <Box fontSize='h4.fontSize' className={classes.heading}>
                Items in Your Bag
                </Box>
                <Divider variant="middle" />
                {products.map(item => {
                    return    <Box display="flex">
                    <img style={{margin:'10px 70px',width:'150px', height:'120px'}} src='https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-pro-12-11-select-202003_FMT_WHH?wid=2000&hei=2000&fmt=jpeg&qlt=80&op_usm=0.5%2C0.5&.v=1583433236838'></img>
                    <Box style={{flexGrow:1}}>
                        <Box mt={3} mx={3}  display="flex" justifyContent="space-between">
                        <h5>{item.name}</h5>
                        <h5>Rs. {item.price}</h5>
                        <h5>Qty. <input type="text" value={item.quantity} readOnly size={3}></input></h5>
                        <h5> {`$${item.quantity*item.price}`}</h5>
                        </Box>
                        <Box variant="h5" mx={3}>
                            {item.itemFamily}
                        </Box>
                    </Box>
                
                </Box>
                // <Divider variant="middle"/>
                }   )}
                
                <div style={{display:'flex',justifyContent:'flex-end'}}>
                    <h3 style={{padding:'20px'}}> ${calculateSubTotal(products)}</h3>
                </div>
                <div className={classes.checkOutButtonStyles}>
                    <StripeCheckout
                    stripeKey="pk_test_51HgaW6HISAjMedpx6Rx65qvbEpNdhHsyyayo021HcDwMsSHmk9Ei4FnZsEZ1bogeCeG9gPTSdu9FBxgarfA5hlKQ00EJ3URML8"
                    token={makePayment}
                    shippingAddress
                    >
                    </StripeCheckout>
                </div>
            </Box>
        )
        else
        {
            return (
                <Box className={classes.container} elevation={3}
                 m={4} component={Paper}>
                
                <h3 className={classes.heading}>Items in Your Bag</h3>
                
                <Divider variant="middle" />
                { products.map(item=> {
                   return <div>
                    <Box display="flex">
                        <img style={{margin:'10px 10px',width:'120px', height:'120px'}} src='https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-pro-12-11-select-202003_FMT_WHH?wid=2000&hei=2000&fmt=jpeg&qlt=80&op_usm=0.5%2C0.5&.v=1583433236838'></img>
                        <div style={{flexGrow:1,paddingLeft:'10px',paddingTop:'10px'}}>
                        
                            <Typography style={{marginBottom:'10px'}} variant="h3">{item.name}</Typography>
                            <Typography  variant="p" component="div">{item.itemFamily}</Typography>
                            <Typography variant="p" component="div"> {`$${item.price}`}</Typography>
                        </div>

                    </Box>
                
                    <Typography variant="p" style={{paddingLeft:'30px',paddingTop:'10px'}}>
                        Qty. <input type="text" value={item.quantity} readOnly size={3}></input>
                    </Typography>

                    <Divider variant="middle" style={{marginTop:'20px'}}/>
                  </div>  
                  })
                }

                <div className={classes.checkOutButtonStyles}>
                    <StripeCheckout
                    stripeKey="pk_test_51HgaW6HISAjMedpx6Rx65qvbEpNdhHsyyayo021HcDwMsSHmk9Ei4FnZsEZ1bogeCeG9gPTSdu9FBxgarfA5hlKQ00EJ3URML8"
                    token={makePayment}
                    >
                    </StripeCheckout>
                </div>
            </Box>
        )
    }
    
})

function UI(matches,classes,item){
    console.log('called for ',item)
    
}

}