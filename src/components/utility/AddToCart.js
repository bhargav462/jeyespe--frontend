import Cookies from 'js-cookie'

export function addToCart(productId,itemFamily,name,price) {
  
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
    console.log('item bro',item)
    fetch(process.env.REACT_APP_API_URL + "/addToCart",{
      method: "POST",
      headers,
      body:JSON.stringify(item)
    }).then(data => {
      if(!data.ok)
      {
        alert('please login')
      }else{

      return data.json();
      }
    }).then((response) => {
      if(response && response.itemPresent){
        //TODO: Item is already present in the cart
        alert('Item is already present in the cart');
      }
      else{
      console.log(response);
      alert('item added')}
    })
  }
