import React, { Component } from "react";
import MediaCard from "./MediaCard/MediaCard";
import Grid from "@material-ui/core/Grid";
import Drawer from "@material-ui/core/Drawer";
import "./CatalogStyles.css";
import { StyledButton } from "../utility/StyledButton";
import { NavLink } from "react-router-dom";
import CircularProgress from '@material-ui/core/CircularProgress';

export default class Catalog extends Component {
  constructor() {
    super();
    this.state = {
      products: {},
      loading: true
    };
  }
  componentDidMount() {
    fetch("https://jeyespe-backend.herokuapp.com/getItemList")
      .then((data) => data.json())
      .then((products) => {
        console.log(products);
        this.setState({ products,loading:false });
      });
  }
  render() {
    if (this.state.loading)
     return <h1 class="loading"><CircularProgress size={80} /></h1>;
    else
      return (
        <div>
          <div class="categories__container">
            <div class="categories">
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
                              <img
                                src={
                                  "https://jeyespe-backend.herokuapp.com/images/" +
                                  subItem.img
                                }
                              />
                            </div>
                            <div class="card__content">
                              <p class="card__title text--medium">
                                {subItem.name}
                              </p>
                              <p class="card__price text--medium">
                                Rs {subItem.price}.00
                              </p>
                              <div class="card__info">
                                <a class="add__to__cart text--medium">
                                  Add to Cart
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
