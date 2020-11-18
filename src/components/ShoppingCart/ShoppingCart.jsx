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
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { Link, NavLink } from "react-router-dom";
import { StripePayment } from '../utility/StripePayment';
import { authentication } from '../utility/APISecurity';
import {MESSAGES} from '../utility/Messages'


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
    },
    button: {
        padding:'4px',
        backgroundColor: theme.palette.warning.dark,
        color:'white'
    },
}))
function calculateSubTotal(items){
    let total=0;
    for(let i=0;i<items.length;i++)
    {
        total+=Number(items[i].price)*Number(items[i].quantity)
    }
    return total
}
function deleteFromCart(id,setProducts){
    fetch(process.env.REACT_APP_API_URL+'/cart/deleteItem',{
        method: "POST",
        body: JSON.stringify({itemId: id})
        ,
        headers:{
            "Content-Type": "application/json",
            "token": Cookies.get('token'),
        }
    }).then(response=>{
        authentication(response,data=> setProducts(data.cartItems))
    })

}
export default function ShoppingCart(){
    const matches = useMediaQuery(theme => theme.breakpoints.up('md'));
    const classes=useStyles()
    const [products,setProducts]=useState([])
    const [quantities,setQuantities]=useState([])
    const [isCartEmpty,setCartEmpty]=useState(false)
    const [loading,setLoading]=useState(true)
    useEffect(()=>{
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
                        return
                    }
                     if(data.cart !== false)
                    {
                        // console.log('hey bhavuk',data.items)
                        setProducts(data.items)
                        setQuantities(data.items.map(item=> item.quantity))
                    }else{
                        setCartEmpty(true)
                    }
                   
                })
            })
        
        },[])
     
    function updateQuantityAtIndex(newQuantity,idx)
    {
        const updatedQuantities=[...quantities]
        updatedQuantities[idx]=newQuantity
        setQuantities(updatedQuantities)
    }

    function quantityChange(e,idx){
            console.log(typeof e.target.value)
            //If user removes all input, let him do it
            if(e.target.value=='') {       
               updateQuantityAtIndex('',idx)
            }
            //If non numeral is entered return
            let numericalValue=Number(e.target.value)
            if(Number.isNaN(numericalValue)) 
               return;
            console.log('here:',numericalValue)
            updateQuantityAtIndex(numericalValue,idx)
    }

    function checkEmpty(e,idx){
        //If user left empty input set it back to 0
        if(e.target.value==='')  
            updateQuantityAtIndex(0,idx)
        
        //If user entered negative quantity make it positive
        else if(parseInt(e.target.value)<0)
            updateQuantityAtIndex(quantities[idx]*-1,idx)
    }

    function updateQuantity(itemId,idx){    
        fetch(process.env.REACT_APP_API_URL + "/updateQuantity",{
            method: "POST",
            headers:{
                    "Content-Type": "Application/json",
                    token: Cookies.get("token")
            },
            body:JSON.stringify({itemId,quantity:quantities[idx]})
        }).then(response=>  authentication(response,data=> {
            alert(data)
            const prevProducts=[...products]
            prevProducts[idx].quantity=quantities[idx]
            setProducts(prevProducts)
        }))

    }

      
    if(isCartEmpty==true)
    {
        return <h1 className={classes.container}>Your Cart is Empty</h1>
    }
    if(matches)
    return (
        <Box className={classes.container} elevation={3}
                m={4} component={Paper}>
                <Box fontSize='h4.fontSize' className={classes.heading}>
                Items in Your Bag
                </Box>
                <Divider variant="middle" />
                {products.map((item,idx) => {
                    return    <>
                    <Box display="flex">
                    <Link to={`/product/${item.itemFamily}/${item.itemId}`}><img style={{margin:'10px 70px',width:'150px', height:'120px'}} 
                    src={process.env.REACT_APP_API_URL+`/image/${item.itemFamily}/${item.itemId}`}></img></Link>
                    <Box style={{flexGrow:1}} mt={3} mx={3}>
                        <Grid container>
                            <Grid item md={4}>
                                <h5>{item.name}</h5>
                                <Box variant="h5">
                                    {item.itemFamily}
                                </Box>
                            </Grid> 
                            <Grid item md={3}><h5>Rs. {item.price}</h5></Grid>
                            <Grid item md={2}>
                                <h5>Qty. <input type="number" min="0" value={quantities[idx]} size={3} onChange={e=> quantityChange(e,idx)}
                                        onBlur={e=> checkEmpty(e,idx)}></input></h5>
                                {
                                    (item.quantity!=quantities[idx])  &&
                                    <Button className={classes.button} size="small" variant="contained"
                                            onClick={()=>updateQuantity(item.itemId,idx)}>
                                      Update
                                    </Button>
                                }
                                </Grid>
                            <Grid item md={2}><h5> {`$${item.quantity*item.price}`}</h5></Grid>
                            <Grid item md={1}>
                                <IconButton size="large" onClick={()=> deleteFromCart(item.itemId,setProducts)}>
                                    <DeleteIcon/>
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Box>
                
                </Box>
                    <Divider variant="middle"/>
                    </>
                }   )}
                
                <Box> 
                    <h3 style={{textAlign:'right',marginRight:'12%'}}>Subtotal : ${calculateSubTotal(products)}</h3>
                </Box>
                  <div className={classes.checkOutButtonStyles}>
                    <StripePayment/>
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
                { products.map((item,idx)=> {
                   return <div>
                    <Box display="flex">
                    <Link to={`/product/${item.itemFamily}/${item.itemId}`}><img style={{margin:'10px 10px',width:'120px', height:'120px'}} 
                         src={process.env.REACT_APP_API_URL+`/image/${item.itemFamily}/${item.itemId}`}>    
                        </img></Link>
                        <div style={{flexGrow:1,paddingLeft:'10px',paddingTop:'10px'}}>
                        
                            <Typography style={{marginBottom:'10px'}} variant="h3">{item.name}</Typography>
                            <Typography  variant="p" component="div">{item.itemFamily}</Typography>
                            <Typography variant="p" component="div"> {`$${item.price}`}</Typography>
                            <Button size="small" variant="contained" onClick={()=> deleteFromCart(item.itemId)}>
                                Delete
                            </Button>
                                    
                        </div>

                    </Box>
                    
                    <Typography variant="p" style={{paddingLeft:'30px',paddingTop:'10px'}}>
                    Qty. <input type="number" min="0" value={quantities[idx]} size={3} onChange={e=> quantityChange(e,idx)}
                                        onBlur={e=> checkEmpty(e,idx)}></input>
                  </Typography>
                    <br/>
                    {
                            (item.quantity!=quantities[idx])  &&
                            <Button style={{marginLeft:'30px',marginTop:'10px'}} className={classes.button} 
                                    size="small" variant="contained"
                                    onClick={()=>updateQuantity(item.itemId,idx)}>
                                Update
                            </Button>
                    }

                    <Divider variant="middle" style={{marginTop:'20px'}}/>
                  </div>  
                  })
                }

                <div className={classes.checkOutButtonStyles}>
                   <StripePayment/>
                </div>
            </Box>
        )
    
    
    }



}
