import "primeicons/primeicons.css";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.css";
import 'primeflex/primeflex.css';
import Page1 from "./page1.png";
import Page2 from "./page2.png";
import React, { Component } from "react";
import { Carousel } from "primereact/carousel";

function Page1JSX() {
  return (
    <>
      <h1>100% Pure, Precious & Auspicious</h1>
      <h1>Red Sandle Wood</h1>
      <h3>(Pterocarpus santalinus)</h3>
      <p>
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
      <p>
        products of Car Decors, Home Decors, Phone accessories, Idols,
        Sculptures, Bowls and many more.
      </p>
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
      <div style={{ backgroundImage: `url(${page.imgURL})`, color:'white',
                  height:'500px',backgroundColor:'#4b693c', backgroundRepeat:'no-repeat',
                  backgroundPosition:'right', 
                  backgroundSize:'550px 500px' }}>
        <p style={{padding:'30px'}}>{page.content}</p>
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
        />
      </div>
    );
  }
}
