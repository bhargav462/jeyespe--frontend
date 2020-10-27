import React, { Component } from 'react'
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';

export default class ShoppingCart extends Component {
    render() {
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
                
            </Box>
        )
    }
}
