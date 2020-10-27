import React, { Component } from 'react'
import MediaCard from './MediaCard/MediaCard'
import Grid from '@material-ui/core/Grid';
import Drawer from '@material-ui/core/Drawer';


export default class Catalog extends Component {
    constructor(){
        super()
        this.state={
            products:{}
        }
    }
    componentDidMount(){
        
        fetch('https://jeyespe-backend.herokuapp.com/getItemList')
        .then(data=> data.json())
        .then(products=> {
            console.log(products)
            this.setState({products})
        })
    }
    render() {
       

        return (<>
            <Grid container direction='column' style={{width:'80%', margin:'20px auto'}}>
            {
                Object.keys(this.state.products).map(prod=> {
                    return <> 
                    <h1>{prod}</h1>
                        
                    <Grid container>
                        {
                            this.state.products[prod].map(subItem=> {
                                return <Grid item >
                                    <MediaCard item={subItem}/>
                                    </Grid>
                            })
                        }
                    </Grid>
                    </>
                })
            }
            </Grid>


            </>
        )
    }
}
