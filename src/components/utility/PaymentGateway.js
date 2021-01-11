
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
async function checkPinCode(pincode){
  try{
    const data=await fetch(process.env.REACT_APP_API_URL + '/pincode/verify', {
        method:"POST",
        headers:{
            "Content-Type": "application/json",
            "token": Cookies.get('token'),
        },
        body:JSON.stringify({pincode})
        }).then(res=>{
            return res.json()
        })
        let isServiceable=false
        isServiceable=data.delivery_codes.reduce((acc,curLocation)=> acc||(curLocation.postal_code.pin==pincode),isServiceable)
        return isServiceable
    }
    catch(e){
        throw e
    } 
}
async function razorPayPayment(user,setLoading,isCart)
{
    
    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

    if (!res) {
        throw new Error('Payment Gateway failed to load. Are you online?')
    }

    let url='/purchase'
    if(isCart){
        url='/buyNow'
    }
    // console.log(user)
    // console.log('url',url)
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
    
    // console.log(data)
    if(data.status==false)  {
        // setLoading(false)
        throw new Error('something went wrong')
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
        handler:  function (response) {
        
            fetch(`${process.env.REACT_APP_API_URL}/place/order`, 
            { 
                method: 'POST',
                body:JSON.stringify({orderId:data.receipt}),
                headers:{
                    "Content-Type": "application/json",
                    "token": Cookies.get('token'),
             }})
             .then(res=> res.json())
             .then(data=> {
                if(data.success==true)
                    return swal('Payment Successful, Your order will be delivered')
                else
                {
                    // console.log(data)
                    if(data.deliveryRemarks==null)  throw new Error('Payment Successful but we have trouble with delivery, Contact administor')
                    else    throw new Error(data.deliveryRemarks)    
                }   
            })
             .catch(err=> swal(err.message))
             .finally(()=> {
                //  console.log('finally of success executed')
                 setLoading(false)
                  history.push('/myOrders')
             })
            
        },
        prefill: {
            address: user.address
        },
        "modal": {
            "ondismiss": function(){
                // console.log('dismissed')
                setLoading(false)
            }
        }
    }
    const paymentObject = new window.Razorpay(options)
    paymentObject.on('payment.failed', function (response){
        setLoading(false)
    })
    paymentObject.open()
    // console.log('completed execution of payment')

}
async function makePayment(user,setLoading,isCart=false) {

    setLoading(true)
    try{
        const isServiceable=await checkPinCode(user.address.zipcode)
        // console.log(isServiceable)
        if(isServiceable==false)
            throw new Error("We are currently not delivering in your location")
        
        await razorPayPayment(user,setLoading,isCart)
    }
    catch(e){
        alert(e.message)
        setLoading(false)
    }
}


export default makePayment