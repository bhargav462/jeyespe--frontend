import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useTheme } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    width: "220px",
    height: "360px",
    margin: "20px",
  },
  media: {
    height: "200px",
  },
});

export default function MediaCard({ item }) {
  const classes = useStyles();
  const theme = useTheme();
  var itemImage = "http://localhost:3001/images/"+item.img;
  console.log(item);
  return (
    <Card  raised className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={itemImage}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="p">
            {item.name}
          </Typography>
          <Typography variant="body1" component="p">
            Price Rs. {item.price}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <div style={{ textAlign: "center" }}>
          {/* <Button  disableElevation variant="contained" style={{backgroundColor:theme.palette.success.light}}
       size="small" color="primary">
            Buy Now
          </Button> */}

          <Button
          
            disableElevation
            variant="contained"
            style={{ backgroundColor: theme.palette.info.light }}
            size="medium"
            color="primary"
          >
            Add to Cart
          </Button>
        </div>
      </CardActions>
    </Card>
  );
}
