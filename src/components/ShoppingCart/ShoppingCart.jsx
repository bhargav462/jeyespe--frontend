import React, { Component, useState } from 'react'
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import StripeCheckout from 'react-stripe-checkout';

export default class ShoppingCart extends Component {

    render() {

        // const [product,setProduct] = useState({
        //     productId: "",
        //     productFamily: ""
        // })

        const checkOutButtonStyles = {
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
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

        // TODO: "add the products of the cart to product variable"

        const makePayment = token => {
            const body = {
                token,
                products
            }
            const headers = {
                "Content-Type": "application/json"
            }

            return fetch("http://localhost:3001/purchase",{
                method: "POST",
                headers,
                body: JSON.stringify(body)
            }).then(response => {
                console.log("response",response);
                console.log("status",response.status);
            })
            .catch(error => console.log(error));
        }
        return (
            <Box elevation={3}
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
    }
}
