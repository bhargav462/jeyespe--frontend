import React, { Component } from "react";
import MediaCard from "./MediaCard/MediaCard";
import Grid from "@material-ui/core/Grid";
import Drawer from "@material-ui/core/Drawer";
import "./CatalogStyles.css";
import { StyledButton } from "../utility/StyledButton";
import CircularProgress from "@material-ui/core/CircularProgress";
import Cookies from "js-cookie";
import { Link, NavLink } from "react-router-dom";

export default class Catalog extends Component {
  constructor() {
    super();
    this.state = {
      products: {},
      loading: true,
    };
  }
  componentDidMount() {
    const headers = {
      "Content-Type": "Application/json",
      token: Cookies.get("token"),
    };

    let authentication = function (response) {
      if (!response.ok) {
        if (response.status === 403) {
          response.json().then((check) => {
            if (check === "Login") {
              // TODO : Route to login page
            }
          });
        }
      }
    };

    fetch(process.env.REACT_APP_API_URL + "/getItemList", {
      method: "GET",
      headers,
    })
      .then((data) => {
        authentication(data);
        return data.json();
      })
      .then((products) => {
        console.log(products);
        this.setState({ products, loading: false });
      });
  }

  addToCart(productId) {
    // Todo: make post request
  }

  render() {
    if (this.state.loading)
      return (
        <h1 class="loading">
          <CircularProgress size={80} />
        </h1>
      );
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
                              <Link to={`product/${subItem.id}`}>
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
                              <div class="card__info">
                                <a>
                                  <button
                                    onClick={this.addToCart(subItem.id)}
                                    class="add__to__cart text--medium"
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
