import React, { Component } from "react";
import MediaCard from "./MediaCard/MediaCard";
import Grid from "@material-ui/core/Grid";
import Drawer from "@material-ui/core/Drawer";
import "./CatalogStyles.css";
import { StyledButton } from "../utility/StyledButton";
import CircularProgress from "@material-ui/core/CircularProgress";
import Cookies from "js-cookie";
import { Link, NavLink } from "react-router-dom";
import {addToCart} from '../utility/AddToCart'
import { MyLoader } from "../utility/MyLoader";
import {MyBackDrop} from '../utility/MyBackDrop'
import swal from 'sweetalert'
import countries from './countries'
import {defaultCountry} from './countries'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Divider from '@material-ui/core/Divider';

const loadState={
  loading: 'loading',
  redirect: 'redirect',
  showPage: 'showPage',
  country: countries[0].name
}

export default class Catalog extends Component {
  constructor() {
    super();
    this.state = {
      products: {},
      loading: true,
      activeBackDrop:false,
      country: defaultCountry
    };
  }


  componentDidMount() {
    const headers = {
      "Content-Type": "Application/json"
    };

    fetch(process.env.REACT_APP_API_URL + `/getItemList/${this.state.country}`, {
      method: "GET",
      headers
    }).then((response) => response.json())
    .then((products) => {
            this.setState({ products, loading: false }); 
          })
      
  }

   addToCart(productId,itemFamily,name,price) {
  
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

    this.setState(prevState=>{
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
        this.setState(prevState=>{
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

  // handleCountryChange=(e)=>{
    
  //   const headers = {
  //     "Content-Type": "Application/json"
  //   };


  //     console.log(e.target.value)
  //     this.setState(prevState=>{
  //       return {...prevState,country:e.target.value}
  //     }) 
      
  // }

  render() {

    if (this.state.loading)
      return (
        <MyLoader/>
      );
    else
      return (
        <div>
          <MyBackDrop open={this.state.activeBackDrop}/>
         
          <div class="categories__container">
            <div class="categories">
              

            {/* <h4>Filters:</h4>
            <FormControl>
              <InputLabel id="demo-simple-select-helper-label">Country</InputLabel>
              <Select
                value={this.state.country}
                onChange={this.handleCountryChange}
                style={{width:'100%', padding:'5px'}}
              >
                {
                  countries.map(country=> {
        
                    return <MenuItem value={country.code}>{country.name}</MenuItem>
                  })
                }
                
              </Select>
            </FormControl>
              
              <br/>
              <br/>
              <Divider></Divider>
              <br/> */}

              <h4>Product Categories</h4>
              <ul>
                {Object.keys(this.state.products).map((prod) => {
                  return <a href={"#" + prod.replace(" ", "")}>{prod}</a>;
                })}
              </ul>
            </div>
          </div>
          <div class="cardogiries">
          
            {Object.keys(this.state.products).map((prod) => {
              return (
                <>
                  <h2 id={prod.replace(" ", "")} class="item__family">
                    {prod}
                  </h2>
                  <main>
                    <section class="cards">
                      {this.state.products[prod].map((subItem) => {
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
                                Rs {subItem.price}.00
                              </p>
                              <div class="card__info addToCartButton">
                                <a>
                                  <button
                                    onClick={() => this.addToCart(subItem.id,prod,subItem.name,subItem.price)}
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
}
