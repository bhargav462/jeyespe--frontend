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
import Box from '@material-ui/core/Box';

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
  console.log(item);
  return (
    <Card  raised className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxISEhUTExAQEhMVEBYVEhIVEA8PEBUVFRIXFhcVFRUYHSggGBolGxUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OFxAQGC0dHR0rLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0rLS0tLS0tLS0tLS0tK//AABEIAOEA4QMBEQACEQEDEQH/xAAcAAEAAQUBAQAAAAAAAAAAAAAAAwECBAYHBQj/xABFEAACAQIEAQkECAMDDQAAAAAAAQIDEQQSITEFBgcTIkFRYXGhMoGRsRQjM0JSYnLBkrLRCCRzFRYlQ0RTY5Oio7PC4f/EABoBAQADAQEBAAAAAAAAAAAAAAABAgMEBQb/xAAqEQEAAgIBAwQCAgIDAQAAAAAAAQIDESEEEjEiMkFRBRMUI2FxM0KxUv/aAAwDAQACEQMRAD8A7MAAAAAAAAAAVSKzaINLujKTlj4TpVQKftk0rlRXvn7TpWy7iO+fs0WXcO+fs0plXcT3zBpTIvEt+2UaUcC0ZDS1o0i0ShQsAAAAAAAAAAAAAAAAAAAujFlLZIhOl6iYzkmfBpUolUgUANk6Hn4/juFo/a4mhT/VVhF/C5MUmfhrXBkt4rLBp8tOHSdljsNf/FivmT+u30mcGSP+r2MPi6dRXhUhNd8ZRkvRldSzmsx5hMQqBIPAo4l4vMI0scTauSJVWmgAAAAAAAAAAAAAAJETMQJIwOe2TfEJ0uM0gAABicU4lTw9N1Ks1GK7e/wXeyYhrhw3zX7KRy4ly05xa1eTjTnKlS2UE0pPxlJfI6KYt+X0FelwdJXdo7rOb4viEpu7bfjd3OuuOIcObrLWnUeGOqzLTWGH7Z+WXhOJ1abvCpOD/LKUfkVmsNP2b8w2/gPOdxCg1et08PwVUpP3TWq+LMrYayicWO/+HbeRXKiHEKHSxg6coyyzg7Oz30farHJevbOnHnwzinTYTNgAALZRuaVyTBpG0dEWiVQkAAAAAAAAAACsVcra0QRCRKxzWtMraXFRQAAAMDkPPZXqRqUleXRuDaWuXNf5m+GNy+g/FZaY8F5+XJ8NgquInlgr6XbbUYRXfKT2R1WvXHG5Z37sttQ2LA8jKUpKDlVrVGrqELUk++ycXNrxskc9upv51qGf6MNJ9duf8J8fyGnBaYSS8qlRsrTqInzZE0xa4eBiOT0loozhK3szs4vwUux+ZvXKp+uJ8MHA4Kc5xgotylJRUba5m7W+JrNo1tWsTv8A0+m+RHJ9YHCQpbz9qo++UtX8Nvcefe2525M+X9l9/EPfKMAAAANFq2mBHKNjoraLI0tLoAAAAAAAAKpXK2tqCISpHLM7WCAAAAAADyOU/J6ljqLo1V4xnbrRl2NGlbzE7hpjyWpO4cI5T4CrwlSoJxnVm88ZrZQ0Sll773sux3Z1UrGW3dLut13Zh1TzLYea6nKlgMRiXndetVcektmqZYK2jfi27nJ1kxOWKQwwU3G5RcJ5R4h1ujcateM8zhmlCVWm07NtreHnqiMmCnbtvTJO9Qv47xzDyfR6yq9yi3OL8PAY8V4jfwvbJWJ18to5uORtOLWOqSjUlU69KKj1YXb11+98jW951py5s/dxDo6MHIAAAAAEhMTpCOUbHVW0SqtLAAAAAABIiZ1AlSsctrd0rRCpUAAAAAAAQ4zFRpQlUm1GEIuUn3JK7LREzOoHzByt5VPG4qrX2zRyUU/uU43yrz1u/M9THTsrEK7dS4DUVLhtCOzjQi3rbVxvJv4niZo7s0vYw0itIQcF4j0dRVJ01CE3lU8kUrfinJeyrotekzGoXmYmOGoTjTliZTjaeaTV000032fBHZEzFIiXPNa2nbqvNDXcuHRUndwrVoX/AE1GUzRy8+3mW6GKAAAAAAABotWdEomjqrO4VUJAAAAASQRzZLb4TC4zSAAAAAAAAcK57eWU6lWWAozy06bXTvVOc3FPJf8ACk17z0Omx6julWZcooU+tH9Sv5XOy3tlFfLrLxLlTjBPq3jdeCaPHmupmXq1txpPylcKcV0c3JSWsZpytdbKS1t5lcO5nla2ohrtOp0fXyxSyytZp6qPx+J0+6WczNYmW7/2feLKphq9Bvr06/SW/LVV7/xJkdTWYmJedE8urnKkAAAAAAAApJF6W1JKI6lQAAAuiimSdQmISHKkAAAAAAAAAcJ56eQ9ZV5Y6hTlUp1LdNGEXKUJqNs9lrZpLyPQ6bNHb2yrMOR5mntZ399/I69qxtvHDsdOOWMtXlV+2+nccd6w9DH3TqIjlLxHjkX1Mjk+60r/APwzrSI522/Xkm0V7Z3Ly8TTmotZ3du9m31Vba/eTW8TZ3X6KaYu2Z5lPzWcTqYbidBRelWqqNSPZKM3bbts7NHRmiLUfPWr22mH1Ejy0gAAAAAAAACOaOnHbcI0tNEAAbEsEc2SdymFTNIAAAAAAAAZI17lRyrpYOnnadT6zJlTSbdtd+4tG98Ovpektnydm9Ob8a49hsZRdSfD40o9J9p0cMksslo6kestWldK12JtlrbVZ4dsdBjx37bW3Ly1R4fODeTEQf4rSrQV/wA0G7LzI78m+ZTOOKW44eNUrRi+pOEoJaWbfwb11L2jb1+iveKzN/HxLx8Xibtt6LsSNaxw5+pyxuZluHI3l3g8Dh1Grg3Vrqq5qajSvGLs42k9botalreJeHlp+y8z4h0TgXOrw/ENRcqlCT2VSKUd/wASdjK2G1WNsFqxuOYbzCSaummns1qn5GMsVSAAAAAAABSSL0tqSUR1KgFYoradQmEpypCAAAAAAAAAixSeV20bTSfc32krU13Rtwji3FY1MPLC1W416NWq05aZm6jnv36tGlaz3b+H0OSs481c2PmsxH/jwqXHV9EnhpuyyzdJ2e87NwfhdXNv1+ruhn1OPuyd9XhwdSl0c4Sac3JQyScZ3g0mn4ao1msX3EsL5oruJejX426j6OslK3coqUX2uMktfJmH8bs5qY+sreNV4n6QYvBxp0ukc05OVqNnpKP3m12WLVt3W1CM28mnixp3T7f6nT4RXH6Z29LgmH6RypvbJKV7axai3816lbzwwiPVEx8u+80NVy4fC8szUmt27aLT5HFk9zn6inZkmG7GTECAAAAAAAEUlY6qTuFVDRK+mY5Z40QvOdIAAAAAAABUDy+U2LdHC16idnCjNxfanl09bExG22Cn7Mla/cvnvlbGrOaxElGUa0FLpYfZzklZ3/DNNNNM6sWojT6Cmq7pWfHwxuLRpU4U6VKEX9XGdas0pTnOSzZYv7sEraLdl8ETaZtZ4vVZrd+o4eXHqR6S/Wd401+Ffel57ep0a5ctslpjl56g3eXds+25a3hXHEzbjzC+dWUrXb22vdLy7jKK6evHKTD738SJdGOu1VjUpyd3HM3e127X7UvIntmYcX8imKda3qX0rzbYFUeH0UrPOnUbXa5Pf4WODJPqly9VljLlm0NnM2AEAAAAAAALKhtin4RKw30hJTWhz5Z5TC4ySAAAAAAAAANL528f0XD5q+tSUYe7d+iNMccvR/GV3m7p+OXz5/lKpHq55KlN9eG8fOz2fijsika38urLkrGeLT4lJPFuFoVFeNtJdtuzzLU1pz9b0tq339sXiM1paSaexvV5domPKNXypJXvq/2K2dXTR27lXDx6yzLMr6rXTx0M7TqNur12nh6XFeGyoT0anFwU4SXbFq5jiyxdrXvx1mzxeive+79DsiNPGvbumZfSHM5xDpeHQi3eVKbpvyVmvmeb1EauQ3gwSAAAAAAAAUnsaY55JQnWqmjscV/K0KlQAAAAAAAAEjkPP7jrRw9LvzzfwUV82dGCHpdD6aXt9uL4n2UdcJ6jmsS9OhUUqcG9Wr6d7W3oY+J09jDaMuGk2+GRTlSisuSLzWWZ2zSm97N7RV9yJ7vtlM4qxMTVBUcY9kbdlu3yJ5llP668xDE+ldy/Yt2yx/d9Q9PGYpSjShe7hRyuzvq+z3GdK6tKtd2raIbLhOabiE1GSVFRlFSTdS1k1dXRrbqaw8W1Z261zdclZ8OoSpzqRnKdTO8t8q6qVtd9jjzZO+UtrMgAAAAAAAAMtXyShsdKuk0djmt5WgKgAAAAAAAAJHz5z34zPj3C+lOlGPvfWfzR24I4epgjWD/bnVRdU3hXLHpS4LE5U42v2r9yvbuV+n6z9NNTBOvK602TtrtctGNzX63unwmwVF1p5dssLqyvs0rK/mRbVNIjqpt8JamHSjJqUuqluo23t2E2pNZiJ+UU62Z9vwn4FTz4rDwbTjPE0Yy03UqsU/RkXpqsr/zsj6whBJWWy0R5kuOZ3yqQgAAAAAAAAAGTHkRG4ljsY28kBUAAAAAAAABI+XecPF9Lj8TO/wDtM4ryg8n/AKnfh8PYmO3DSGuPb3M1ZZOaq4Cmm2+5fMibaOm6aubu7vhkvDp9r9B3y6I/G402HXRtuLabTT2ejtp6FLT3NK/j8VVmIqSaab0e6SSEeVLdLjr4hLyaVsXh2t1iqLXmqsbE3tPbLGcNNTx8PrM86XkhAAAAAAAAAADJjyIjoEkdjG/khUoAAAAAAAAFleeWMpd0W/grkwmI3L5K41VzVJy/FVnL4zb/AHPRx+Hs541Ssf4YT9kuytHoZHCl1ZvxSKX8uv8AGx6LyyERp2TKlxpG+UUyWN52zOTMlHG4ZvZYqi/+7Ei/tc1uIt/p9Xo8+XiBCAAAAAAAAAAZavkQnTpG0lNmGWNSQuM0gAAAAAAAHm8pa2TCYiXdQn/Ky1fLTHG7RD5Pxr1XkejR6vVz6oj6Ua6pZW8f17ZPCl9U/GfyRnb3O78ZX+i0/cpWS2n6UluFbIWtQx+UvDJ5a9KXdWpv4TTFo3DG8eX1tTldJ96TPOl4c+VSEAAAAAAAAACkti+OOSUdzqVXU2Y5YTC8wSAAAAAAAAa7zhYjJw7Ey/4LX8TS/c1x82b9NG8tYfLuL3O+rt6id3lVS6q94+V7W/qh7/JXh8pQhUcFKn0ss17W0hvur66eZxdVnrWZrE86dvQ2/o1/ln8V4ZGc4SpqFKm421cYtO9leCd9bow6fqO2s1vzLa06lh0eCtwld/XWk4xz08jUZxT1vvaTfuNrdV6uPClZ3O2RjcLFxyZaal1btZIqyte0+17mWPLO5nfCkvHwmDvUTjeynHK99b31djqtl1VjEbl9V4J3pwf5I/I5HiX90pgoAAAAAAAAALahtiRKOx0IVizO8cCU5VwIAAAAAAAalzqytwyv49GvjViaY/dDp6SP7qvmfGe0z0aurP75UT09xKsz6HqcL4xWp0MlNqKU3f2b3lrva5z26XHkt3Svj62uHHFe3k/zgxFvtZJR2V77+ZP8PF9Kz+Sm08wsp8p66v15f9P9CP4WL/5Xr+Q7f+q2fHqzd3OV2rb9m9i8dLjiNaZz+R5nhh1sVPR5ne993fzNP118Mq9Xa0+H1XyOxfTYHDVPxYeD9LfsebkjttMOW87mZewUVAAAAAAAAAEc3qdVI1CsrTQCBLFnLeNStCpQAAAAAAAaPzxztw6S769JP+NP9jbD7nX0X/LEvnLFe0/M76ujL7pUWz8iVLe1Pgfs5frX8pMOLJ4Y8np5v5FlKQxwt8pLfIlnPlWt3flXqRLXE+keZjGdJwqir605VKb90216NHm549UpyRqzeTBmAAAAAAAAGyaxuRCdkeFQABfBmeSu+UrzmSAAAAAAA0Dnql/cYrvxEPS7N8PudvQR/Y+ecV7T8zvhrk90rVs/IK29rIwUrU5eMv2RMOHJLGq6O3cvUsUjhjpBEPTjTXRwstZbu/joIVv5YVZ9aX6mvhoRLanw7b/Z8x16WJoN+zONRLwksr9UcXUxztfNHiXXTkc4AAAAAAABZUZ0Yq6RKw1QAAAEsZXOW9dStCpQAAAAAA59z1P+50/8dfys3w+Xd+P/AOR894r2n5nfXw0yxq0rZytF+QUyzqiShHqou87ygqKzYaV8IkEQz7uyXda3uDPyxKis353Ilvil0XmN4h0XEcj2rUJR98WpL5M5uojddt80bq+hjgcgAAAAAAA2WpXukQnXpUAAAAFYuxFo3AlTOSY1OlggAAAABoPPPC+Bi+6vG/waNsM+p29B/wAr54xPtPzO+PDbN75W1PZJhlm9mlMPJ23LvOWTle7DbxCxBWGWm+/0DNiObb1Ilvih73JHiX0bGYes9FCtHM9uq3aXo2ZZI3WYdsxuun1gmebLzggAAAAAJiN8CKTudVa6hEqFkAAAAAAXQlYpem+UpDmmNJCAAAANO52l/o2p+un/AORGuP3OzoJ/uh814n2n5noR4b5Z9cqVfYJjyxyz6UVN9Vmjgha3oQ2twtQVhkOWnuDP5Y0dw3pxLLhBtGcvRx0m0PqrkXxH6RgsPVvdujFS/VFWfyPNyRq0vMy17bTD2yigAAAAI5yOimPUco2tNUAAAAAAAAF0ZFLU2mJSI5piY4SEAAA1LnSw86nD6kacJTlmpvLFOUmlNbI1xz6nT0tork2+ep8ncZKWmExDd/8AdT/od3fXXlte0TMztnVOQ2P+j1K86HQUqUc05VpKm2vyrdv+ojJXeoYZLxrUPN5McnMTj59Fh4KU1HM80lCKiu9vzNL3iscuavl0DhfMjiJwbxGIp0ZXdowXSprsbehz26mPEQ0mXm4/mZ4lB/VvD1l2NVejfvUi0dTT5V21Lh3BJ1cXDBuUadSdV0nJ2nGMle+2+qtoazeIrtXfLqGE5iY/6zHSv+SlFL1ZzT1XHENItqds5cydJaLG1f8AlwM/5Drr1s1jWm+8keT8cBho4eNSVRRlJqUkk+s7tadhje3dO3Lkv3229oozAABkxG/AjlM6KY9eUStNEAAAAAAAAAABdGRW1YkXqVzntSYWVKJAgsBg8W4xh8LDPiK9OjHsc5xjfwS3fuL1ra3gmXCOdznDhjsuGwspPDxalUnrHpJW0Vvwr5nb0+Ht5nyrLY/7PHDLU8RiGnrNUoO3ZFZnZ+cre4p1c+ITDsRxJYHHsZ0OGrVb2yUZyT8VF2LUjdoHybhMZUp1IVk71ITVS77ZJ318z15jjSj6E5Hc6WDxmWFWSw1d2WSckoSl+SezPPy4LVlbbfbnNpIAAAGy0UmSUTZ01rEKqFgAAAAAAAAAAAAAJjYvjMytj34TtemYzWY8pCo59zp8gZ8SVOrSqKNajGSjCd+jmpNO1/uy03OjDlinlEw59wLmYxlSqvpLp0KSfWcZ9JUl4RSVvezov1VYjhEQ7nwPhFLCUYUKMctOCsle7fe2+1s4rXm07laGeUEGPwcK1OdKpHNCcXGa1V099iYmY5gcq41zJUmm8JiZ05dkKv1kP4lqvU66dV9q6axh+ZviTlaUsLFX9rpZy0vvZRNf5NDTtvJXhdTC4WlQqVumnTi1Kprr1m1v3LT3HDe0TO1nrFAbLREyLJT7jauL7RtYaxx4QAAAAAAAAAAAAAAAAAAC5TZnOOE7XdIZzik2qpFZpMG1SupTANANAIiRRyLdsm1HMtGOUbWubNIxxCNrS8QBIAAAAAAAAAAAAAAAAAAAAJBkAghVGVl48LkZipIskXgkRrVUZEihayAhIAAAAAAAAAAf/9k="
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
        <Box width="100%" style={{ textAlign: "center" }}>
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
        </Box>
      </CardActions>
    </Card>
  );
}
