import React, { Component } from "react";
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

const loadState={
  loading: 'loading',
  redirect: 'redirect',
  showPage: 'showPage'
}

export default class Catalog extends Component {
  constructor() {
    super();
    this.state = {
      products: {},
      loading: true,
      activeBackDrop:false,
      currencySymbol:'Rs'
    };
  }


  componentDidMount() {
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
            let currencySymbol= currencySymbols[currency]
            this.setState({ products, loading: false,currencySymbol }); 
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
              <h4>Product Categories</h4>
              <ul>
                {Object.keys(this.state.products).map((prod) => {
                  return <a href={"#" + prod}>{capitalCase(space(prod))}</a>;
                })}
              </ul>
            </div>
          </div>
          <div class="cardogiries">
          
            {Object.keys(this.state.products).map((prod) => {
                return (
                <>
                  <h2 id={prod} class="item__family">
                    {capitalCase(space(prod))}
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
                                 {`${this.state.currencySymbol} ${subItem.price}`}
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
