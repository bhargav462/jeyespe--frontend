
import Cookies from 'js-cookie'
import swal from 'sweetalert'
import history from '../utility/history'

function loadScript(src) {
	return new Promise((resolve) => {
		const script = document.createElement('script')
		script.src = src
		script.onload = () => {
			resolve(true)
		}
		script.onerror = () => {
			resolve(false)
		}
		document.body.appendChild(script)
	})
}

async function makePayment(user,setLoading,isCart=false) {
    setLoading(true)
    console.log(setLoading)
    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

    if (!res) {
        alert('Razorpay SDK failed to load. Are you online?')
        return
    }

    let url='/purchase'
    if(isCart){
        url='/buyNow'
    }
    console.log(user)
    console.log('url',url)
    const data = await fetch(`${process.env.REACT_APP_API_URL}${url}`, 
    { 
        method: 'POST',
        body:JSON.stringify(user),
        headers:{
            "Content-Type": "application/json",
            "token": Cookies.get('token'),
        }
    
        }).then((t) =>
        t.json()
    )
    
    console.log(data)
    if(data.status==false)  {
        setLoading(false)
        alert('something went wrong')
        return
    }
    const options = {
        key: process.env.REACT_APP_PAYMENT_KEY,
        currency: data.currency,
        amount: data.amount.toString(),
        order_id: data.id,
        notes:{
            receipt: data.receipt,
            cart : isCart
        },
        name: 'Jeyspe Impex',
        description: 'Red Sandalwood Products',
        image: `${process.env.REACT_APP_API_URL}/logo.png`,
        handler: function (response) {
          swal('success','Your Payment is Successful').then(()=>{
              setLoading(false)
              history.push('/catalog')
          })
        },
        prefill: {
            address: user.address
        },
        "modal": {
            "ondismiss": function(){
                console.log('dismissed')
                setLoading(false)
            }
        }
    }
    // console.log(options)
    const paymentObject = new window.Razorpay(options)
    paymentObject.on('payment.failed', function (response){
    //   alert(response.error.description)
    console.log('failed payment')
      setLoading(false)
    })
    paymentObject.open()
}


export default makePayment