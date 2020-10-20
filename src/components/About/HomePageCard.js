import React from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import BackgroundImage from './decor_bg.jpg'

export default function HomePageCard(){
   
    return <Card variant="outlined" style={{color:'white',backgroundImage:`url(${BackgroundImage})`}}>
        <CardContent>
            <h2>100% Pure</h2>
            <h1>RED<br/>SANDLEWOOD<br/>PRODUCTS</h1>
            <p>Select from our exotic red sandalwood products to decorate your home.</p>
        </CardContent>
    </Card>
}