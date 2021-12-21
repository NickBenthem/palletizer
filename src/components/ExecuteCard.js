import { Button } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import React from "react";

const ExecuteCard = ({kickeroffer}) => {
  return (
    <Grid item >
      <Card
        sx={{
          height: "10%",
          display: "flex",
          flexDirection: "column",
          borderRadius: "10px",
        }}
      >
        {/* <CardMedia
      component="img"
      sx={{
        // 16:9
        pt: "6.25%",
      }}
      image="https://source.unsplash.com/random"
      alt="random"
    /> */}
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h5" component="h2">
            EXECUTE
          </Typography>
          <Typography>
            This is a media card. You can use this section to describe the
            content.
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="sm" onClick={kickeroffer} >Run</Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default ExecuteCard;