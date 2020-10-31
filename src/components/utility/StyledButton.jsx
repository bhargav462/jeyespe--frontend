import { styled,withTheme  } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


export const StyledButton= styled(withTheme(Button))(props => {
    const backgroundcol=props.mode=="light"?props.theme.palette.primary.light:props.theme.palette.primary.main
    const hovercol=props.mode=="light"?props.theme.palette.primary.main:props.theme.palette.primary.dark
    const fontColor= props.mode=="light"? props.theme.palette.primary.dark: 'white'
    return {
        backgroundColor: backgroundcol,
        color:fontColor,
        "&:hover":{
                backgroundColor:hovercol
             } 
        }
})

