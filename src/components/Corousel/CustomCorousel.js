import "primeicons/primeicons.css";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.css";
import 'primeflex/primeflex.css';
import Page1 from "./page1.png";
import Page2 from "./page2.png";
import React, { Component } from "react";
import { Carousel } from "primereact/carousel";
import { Button } from "primereact/button";

function Page1JSX() {
  return (
    <>
      <h1>100% Pure, Precious & Auspicious</h1>
      <h1>Red Sandle Wood</h1>
      <h3>(Pterocarpus santalinus)</h3>
      <p>
        {" "}
        products of Car Decors, Home Decors, Phone accessories, Idols,
        Sculptures, Bowls and many more.
      </p>
    </>
  );
}
function Page2JSX() {
  return (
    <>
      <h1>Real Sandle Health Products</h1>
    </>
  );
}
export default class CustomCarousel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pages: [
        {
          content: <Page1JSX />,
          imgURL: Page1,
        },
        {
          content: <Page2JSX />,
          imgURL: Page2,
        },
      ],
    };
  }

  pageTemplate(page) {
    console.log(page);
    return (
      <div style={{ backgroundImage: `url(${page.imgURL})` }}>
        {page.content}
        <img src={page.imgURL}></img>
      </div>
    );
  }

  render() {
    return (
      <div>
        <Carousel
          value={this.state.pages}
          itemTemplate={this.pageTemplate}
          circular
          autoplayInterval={3000}
          header={<h5>Circular, AutoPlay, 3 Items per Page and Scroll by 1</h5>}
        />
      </div>
    );
  }
}
