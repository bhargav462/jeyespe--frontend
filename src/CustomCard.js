import React from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    marginCenter:{
        margin: '5%'
    }
})
export default function CustomCard(){
    const classes=useStyles()
    return <Card variant="outlined" className={classes.marginCenter}>
        <CardContent>
            <h3>100% Pure</h3>
            <h1>RED<br/>SANDLEWOOD<br/>PRODUCTS</h1>
            <p>Select from our exotic red sandalwood products to decorate your home.</p>
        </CardContent>
    </Card>
}