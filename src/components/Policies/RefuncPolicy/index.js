import React from 'react'
import { makeStyles } from "@material-ui/core/styles";
import Box from '@material-ui/core/Box';


const useStyles = makeStyles((theme) => ({
  container:{
    minHeight:'100vh',
    marginTop:'80px'
  },
}))

export default function RefundPolicy(props)
{
    const classes = useStyles();

    React.useEffect(()=>    //To set scroll bar to top
        window.scrollTo(0, 0)
    ,[])

    return <Box className={classes.container} m={4} elevation={3}>
                <h1>Return & Refund Policy</h1>
    <p>Updated at 2021-01-20</p>

    <h1>Definitions and key terms</h1>
    <p>To help explain things as clearly as possible in this Return & Refund Policy, every time any of these terms are referenced, are strictly defined as:</p>
    <ul>
        <li><strong>Company:</strong> when this policy mentions “Company,” “we,” “us,” or “our,” it refers to Jeyespe Impex, L.B.P Agraharam village, Narsipatnam road, vaddadi post, Butcheyyapeta mandal, Visakhapatnam dt, A.P PIN: 531026, India. that is responsible for your information under this Return & Refund Policy.</li>
        <li><strong>Customer:</strong> refers to the company, organization or person that signs up to use the Service to manage the relationships with your consumers or service users.</li>
        <li><strong>Device:</strong> any internet connected device such as a phone, tablet, computer or any other device that can be used to visit and use the services.</li>
        <li><strong>Service:</strong> refers to the service provided by www.redcarvings.com as described in the relative terms (if available) and on this platform</li>
        <li><strong>Website:</strong> www.redcarvings.com ’s site, which can be accessed via this URL: .</li>
        <li><strong>You:</strong> a person or entity that is registered with www.redcarvings.com to use the Services.</li>
    </ul>

    <h1>Return & Refund Policy</h1>
    <p>Thanks for shopping at www.redcarvings.com. We appreciate the fact that you like to buy the stuff we build. We also want to make sure you have a rewarding experience while you’re exploring, evaluating, and purchasing our products. As with any shopping experience, there are terms and conditions that apply to transactions at www.redcarvings.com. We’ll be as brief as our attorneys will allow. The main thing to remember is that by placing an order or making a purchase at www.redcarvings.com, you agree to the terms set forth below along with www.redcarvings.com’s Privacy Policy. If there’s something wrong with the product you bought, or if you are not happy with it, you have () to issue a refund and return your item. If you would like to return a product, the only way would be if you follow the next guidelines:</p>
    <ul>
        <li>The product has to be damage free, if we find any damage on the product we will cancel your refund immediately.</li>
    </ul>

    <h1>Refunds</h1>
    <p>
        We at www.redcarvings.com commit ourselves to serving our customers with the best products. Every single product that you choose is thoroughly inspected, checked for defects and packaged with utmost care. We do this to ensure that you fall in love with our products. Sadly, there are times when we may not have the product(s) that you choose in stock, or may face some issues with our inventory and quality check. In such cases, we may have to cancel your order. You will be intimated about it in advance so that you don't have to worry unnecessarily about your order. If you have purchased via Online payment (not Cash on Delivery), then you will be refunded once our team confirms your request. We carry out thorough quality check before processing the ordered item. We take utmost care while packing the product. 
        At the same time we ensure that the packing is good such that the items won’t get damaged during transit. Please note that www.redcarvings.com is not liable for damages that are caused to the items during transit or transportation. We will revise your returned product as soon as we receive it and if it follows the guidelines addressed above, we will proceed to issue a refund of your purchase. Your refund may take a couple of days to process but you will be notified when you receive your money.
    </p>

    <h1>Shipping</h1>
    <p>
        www.redcarvings.com is responsible for return shipping costs. Every returning shipping is paid by www.redcarvings.com, even if the item didn’t have free shipping in the first place.
    </p>
    
    <h1>Product Availability and Limitations</h1>
    <p>
        Given the popularity and/or supply constraints of some of our products, www.redcarvings.com may have to limit the number of products available for purchase. Trust us, we’re building them as fast as we can. www.redcarvings.com reserves the right to change quantities available for purchase at any time, even after you place an order. Furthermore, there may be occasions when www.redcarvings.com confirms your order but subsequently learns that it cannot supply the ordered product. In the event we cannot supply a product you ordered, www.redcarvings.com will cancel the order and refund your purchase price in full.
    </p>

    <h1>Your Consent</h1>
    <p>
        By using our platform, registering an account, or making a purchase, you hereby consent to our Return & Refund Policy and agree to its terms.
    </p>

    <h1>Changes To Our Return & Refund Policy</h1>
    <p>
        Should we update, amend or make any changes to this document so that they accurately reflect our Service and policies. Unless otherwise required by law, those changes will be prominently posted here. Then, if you continue to use the Service, you will be bound by the updated Return & Refund Policy. If you do not want to agree to this or any updated Return & Refund Policy, you can delete your account.
    </p>

    <h1>Contact Us</h1>
    <p>If, for any reason, You are not completely satisfied with any good or service that we provide, don't hesitate to contact us and we will discuss any of the issues you are going through with our product.</p>
    <ul>
        <li>Via Email: jasti_saiji@yahoo.co.in</li>
        <li>Via Phone Number: 6300215057</li>
        <li>Via this Link: redcarvings.com/contact</li>
        <li>Via this Address: LBP Agraharam village narsipatnam road vadadi post butcheyyapeta mandal visakhapatnam dt pin 531026</li>
    </ul>
    
    </Box>
    
}