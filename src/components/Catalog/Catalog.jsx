import React, {  useState,useEffect } from "react";
import MediaCard from "./MediaCard/MediaCard";
import Grid from "@material-ui/core/Grid";
import Drawer from "@material-ui/core/Drawer";
import "./CatalogStyles.css";
import { StyledButton } from "../utility/StyledButton";
import CircularProgress from "@material-ui/core/CircularProgress";
import Cookies from "js-cookie";
import { Link, NavLink } from "react-router-dom";
import { MyLoader } from "../utility/MyLoader";
import {MyBackDrop} from '../utility/MyBackDrop'
import swal from 'sweetalert'
import {currencySymbols} from '../utility/countries'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Divider from '@material-ui/core/Divider';
import space from 'to-space-case'
import { capitalCase } from "capital-case";
import { Accordion, AccordionSummary } from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
      productCategoriesSmall:{
        marginTop:'75px',
        position:'fixed',
        width:'100%',
        zIndex:'100',
        [theme.breakpoints.up('md')]:{
          display:'none'
        },
      },              
      productHeadingsAccordion:{
        color:'black',
        textDecoration:'none',
        display:'block',
        width:'100%',
        paddingTop:'3px',
        paddingbottom:'3px',
        paddingLeft:'10px',
        '&:hover':{
          backgroundColor:'#c8a781',
          textDecoration:'none',
          color:'white'
        }
      } ,
      accordionContainer:{
        maxHeight:'200px',
        overflow:'scroll'
      }
}))
const loadState={

  loading: 'loading',
  redirect: 'redirect',
  showPage: 'showPage'
}

export default function Catalog(){
 
    const [state,setState]= useState( {
      products: {},
      loading: true,
      activeBackDrop:false,
      currencySymbol:'Rs'
    })

    const {products,loading,activeBackDrop,currencySymbol}=state
    const classes=useStyles();

  useEffect(()=> {
    window.scrollTo(0, 0)
    const headers = {
      "Content-Type": "Application/json",
      "token": Cookies.get('token') || '',
    };

    fetch(process.env.REACT_APP_API_URL + `/getItemList`, {
      method: "GET",
      headers
    }).then((response) => response.json())
    .then(({products,currency}) => { 
        // console.log('hereeeeee',products)
            let currencySymbol= currencySymbols[currency]
            setState({ products, loading: false,currencySymbol }); 
          })
      
  },[])

   function addToCart(productId,itemFamily,name,price) {
  
    const headers = {
      "Content-Type": "Application/json",
      token: Cookies.get("token"),
    };

    // TODO : create the item object
    let item = {
      itemId:productId,
      itemFamily:itemFamily,
      quantity:1,
      name,
      price
    }

    setState(prevState=>{
      return { ...prevState, loading:false,activeBackDrop:true}
    })

    fetch(process.env.REACT_APP_API_URL + "/addToCart",{
      method: "POST",
      headers,
      body:JSON.stringify(item)
    }).then(data => {
      if(!data.ok)
      {
        swal('please login')
        return new Promise((resolve,reject)=> {
          resolve(null)
        })
      }else{

      return data.json();
      }
    }).then((response) => {
        setState(prevState=>{
            return {...prevState,loading:false,activeBackDrop:false}
        })
        if(response===null) 
        {
          return;
        }
      if(response && response.itemPresent){
        //TODO: Item is already present in the cart
        swal('Item is already present in the cart');
      }
      else{
      console.log(response);
      swal('item added')}
    })
  }

 

    if (loading)
      return (
        <MyLoader/>
      );
    else
      return (
        <div>
          <MyBackDrop open={activeBackDrop}/>

          <Accordion style={{margin:'75px 0px 20px 0px'}} className={classes.productCategoriesSmall}>
                  <AccordionSummary  expandIcon={<ExpandMoreIcon />}>
                    Product Categories
                  </AccordionSummary>
                
                    <div className={classes.accordionContainer}>
                    {products && Object.keys(products).map((prod) => {
                      return   <a className={classes.productHeadingsAccordion} href={"#" + prod}>{capitalCase(space(prod))}</a>
                        
                    })}
                    </div>
                  
                </Accordion>
         
          <div className={`categories__container productCat`}>
            <div class="categories">
              <h4>Product Categories</h4>
              <ul>
                {products && Object.keys(products).map((prod) => {
                  return <a href={"#" + prod}>{capitalCase(space(prod))}</a>;
                })}
              </ul>
            </div>
          </div>
           
               
            
          <div class="cardogiries">
          
            {products && Object.keys(products).map((prod) => {
                return (
                <>
                  <div id={prod} style={{marginBottom:'100px'}}/>
                  <h2  class="item__family">
                    {capitalCase(space(prod))}
                  </h2>
                  <main>
                    <section class="cards">
                      {products[prod].map((subItem) => {
                       
                       if(subItem==null || subItem.img=='') {
                        return
                       } 
                        return (
                          <div class="card">
                            <div class="card__image-container">
                              <Link to={`product/${prod}/${subItem.id}`}>
                                <img
                                  src={
                                    "https://jeyespe-backend.herokuapp.com/images/" +
                                    subItem.img
                                  }
                                />
                              </Link>
                            </div>
                            <div class="card__content">
                              <p class="card__title text--medium">
                                {subItem.name}
                              </p>
                              <p class="card__price text--medium">
                                 {`${currencySymbol} ${subItem.price}`}
                              </p>
                              <div class="card__info addToCartButton">
                                <a>
                                  <button
                                    onClick={() => addToCart(subItem.id,prod,subItem.name,subItem.price)}
                                    class="add__to__cart text--medium "
                                  >
                                    {" "}
                                    Add to Cart{" "}
                                  </button>
                                </a>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </section>
                  </main>
                </>
              );
            })}
          </div>
        </div>
      );
  
}
