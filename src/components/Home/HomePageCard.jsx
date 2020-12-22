import React from 'react'
import BackgroundImage from './decor_bg.jpg'
import Grid from '@material-ui/core/Grid';
import { useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from "@material-ui/core/styles";
import {StyledButton} from '../utility/StyledButton'

export default function HomePageCard(){
    const theme = useTheme();

    // console.log('theme',theme)
    return <Grid container spacing={0}>
            <Grid item md={6} xs={12}>
                <img src={BackgroundImage} style={{width:'100%',height:'100%'}}></img>
            </Grid>
            <Grid item md={6} xs={12} style={{color:'white',
                            backgroundColor:theme.palette.primary.dark,
                            padding:'30px'}}>
                <Typography variant='h3'>
                    Quality Assurance Work
                </Typography>
                <Typography variant='h5' component="p" style={{margin:'5% 0px'}}>
                We Market forest Products and provide land management in many countries</Typography>
             
                <StyledButton mode="light">
                   View Products
                </StyledButton>
             </Grid>
    </Grid>
}