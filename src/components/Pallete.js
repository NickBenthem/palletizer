import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import SketchSimple from "./SketchSimple";
import { Button } from "@mui/material";
import { Box } from "@mui/material";
// const [state, setState] = useState('#fff')

const Pallete = ({ palleteColors, setPalleteColors }) => {
  
  const changeColor = (id, color) => {
    setPalleteColors(() => {
      let copy = palleteColors.slice();
      copy[palleteColors.findIndex((obj => obj.id === id))].color = color;
      setPalleteColors(copy);
    });
  }
  const deleteColor = (id) => {
    console.log(id);
    // console.log(palleteColors);
    // console.log(palleteColors.filter(item => item.id !== id));
    setPalleteColors(palleteColors.filter(item => item.id != id));
    };
  


  return (
    <div>
      <Card>
        <CardContent>
          <Typography variant="h4" gutterBottom align="center">
            Palletes
          </Typography>
          <Grid container>
              <Grid container align="center" xs={4} minWidth={"15vw"}>
                { 
                palleteColors.map( (color) => (
                  <Grid item key={color.id} sx={{ margin: "0.1rem" , p: "5px"}}>
                    <SketchSimple colorDict={color} handleChangeComplete={changeColor} > </SketchSimple>
                    <Button variant="outlined" color="primary" onClick={() => deleteColor(color.id)}>X</Button> 
                  </Grid>
                ))
                }
              </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
};


export default Pallete;

// color={ state.background }
// onChangeComplete={ handleChangeComplete }
