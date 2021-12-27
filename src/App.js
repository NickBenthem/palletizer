// import { Image } from "@mui/icons-material";
import CameraIcon from "@mui/icons-material/PhotoCamera";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";
import "./App.css";
import ExecuteCard from "./components/ExecuteCard";
import HelperCards from "./components/HelperCards";
import MainImage from "./components/MainImage";
import Pallete from "./components/Pallete";
import SecondHeader from "./components/SecondHeader";
import _ from "lodash";

import { useWorker, WORKER_STATUS } from "@koale/useworker";



const cards = [1, 2, 3];
const theme = createTheme();

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

function App() {
  const [palleteColors, setPalleteColors] = useState([
    { id: 1, color: "#000000" },
    { id: 2, color: "#FFFFFF" },
    { id: 3, color: "#FF0000" },
    { id: 4, color: "#00FF00" },
    { id: 5, color: "#0000FF" },
    { id: 6, color: "#FFFF00" },
    { id: 7, color: "#FF00FF" },
    { id: 8, color: "#00FFFF" },
  ]);

  const [image, setImage] = useState(null);
  const [imageInfo, setImageInfo] = useState(null);

  useEffect(() => {
    const kickoffWorker =  () => {

      // create a pool of workers that can accept an argument and return a result
      const workerPool = [];
      var maxWorkers = navigator.hardwareConcurrency || 4;

      for (let i = 0; i < maxWorkers; i++) {
        workerPool.push(new Worker("./worker.js"));
      }

      const chunkedData = _.chunk(imageInfo, parseInt(800 / maxWorkers));
      // shallow copy of chunkedData
      const chunkedDataCopy = chunkedData.slice();


      // when a worker is available, send it the image data
      workerPool.forEach((worker,index) => {

        // console.log(chunkedData[index]);
        worker.postMessage({ 
          palleteArray: palleteColors, 
          pixelsArray: chunkedData[index]
      })
  
        worker.onmessage = function(e) {
          console.log('Message received from worker', e.data);
          chunkedDataCopy[index] = e.data;
          setImage(createImageData(_.flatten(chunkedDataCopy)));
      }  
      

        // worker.onmessage = (e) => {
        //   if (e.data.status === WORKER_STATUS.RECEIVED) {
        //     worker.postMessage(imageInfo);
        //   } else if (e.data.status === WORKER_STATUS.DONE) {
        //     console.log("Worker: Message received from main script");
        //     console.log(e.data.results);
        //   }
        // };
      });
    

    //   const myWorker = new Worker("./worker.js");
    //   myWorker.postMessage({ 
    //     palleteArray: palleteColors, 
    //     pixelsArray: _.chunk(imageInfo,200)[0]
    // })

    //   console.log('Message posted to worker');
  
    //   myWorker.onmessage = function(e) {
    //       console.log('Message received from worker', e.data);
    //   }  
      
    };
    if (imageInfo) {
      kickoffWorker();
    }
  }, [imageInfo]);
  // Turn an array of RGB pixels into an image data object
  const createImageData = (pixels) => {
     // get the canvas
     const loadNewCanvas = (pixels) =>{
      return new Promise((resolve, reject) => {
        const canvas = document.createElement("canvas");
        canvas.width = 800;
        canvas.height = 800;
        const ctx = canvas.getContext("2d");

        var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        var data = imageData.data;
        var flattenedPixels = _.flatten(_.flatten(pixels));
        // prepare data
        // for(var i = 0; i < data.length; i++) {
        //   data[i] = flattenedPixels[i]
        // }

        // draw newly modified pixels back onto the canvas
        ctx.putImageData(new ImageData(new Uint8ClampedArray(flattenedPixels),800,800), 0, 0  );
        let returnValue = canvas.toDataURL();
        resolve(returnValue);
        return returnValue;
      });
  }
  loadNewCanvas(pixels).then(
    (value) => {
      setImage(value);
    }
  )

    // get the data URL from the image data
 
    // setImageInfo(dataURL);
  };


  const kickeroffer = () => {
    // Convert data URL to image data
    // convertURIToImageData
    const loadImage = (url) =>
      new Promise((resolve, reject) => {
        const img = new Image();
        img.addEventListener("load", () => resolve(img));
        img.addEventListener("error", (err) => reject(err));
        img.src = url;
        return img;
      });
    const loadCanvas = (img) =>
      new Promise((resolve, reject) => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        let returnVals = _.chunk(
          _.chunk(ctx.getImageData(0, 0, img.width, img.height).data, 4),
          800
        );
        resolve(returnVals);
        return returnVals;
      });
      // Load the image into the react state ... 
    loadImage(image).then((img) => {
          loadCanvas(img).then((vals) => {
            setImageInfo(vals);
            }
          ).catch((err) => {
            console.log(err)
          }
        );
        // console.log(somval);
      })
      .catch((err) => console.error(err));
      

    // const htmlCanvas = document.createElement("canvas");
    // const offscreen = htmlCanvas.transferControlToOffscreen();
    
    // worker.postMessage({ canvas: offscreen }, [offscreen]);

    //   await image.decode();
    //   image.onload = function(){
    //     returnVals = _.chunk(_.chunk(ctx.getImageData(0, 0, image.width, image.height).data,4),800);
    //     console.log(returnVals);
    //   };
    //   return returnVals;
    // })();

    // convertURIToImageData(image).then(function(imageData){
    //   console.log(imageData);
    // });
  };
  //https://stackoverflow.com/questions/779379/why-is-settimeoutfn-0-sometimes-useful/4575011#4575011

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <CameraIcon sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" noWrap>
            Palletizier
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        {SecondHeader()}
        <Box>
          <Container maxWidth={false}>
            <Grid>
              <Grid
                container
                direction="row"
                wrap="nowrap"
                justifyContent="space-evenly"
                // padding={0}
              >
                <Box>
                  <MainImage
                    image={image}
                    setImage={setImage}
                    xs={8}></MainImage>
                </Box>
                <Box>
                  <Grid item>
                    <Grid
                      container
                      spacing={4}
                      direction="column"
                      xs={4}
                      sx={{ ml: "5vw" }}>
                      <Pallete
                        palleteColors={palleteColors}
                        setPalleteColors={setPalleteColors}></Pallete>
                      <ExecuteCard kickeroffer={kickeroffer}></ExecuteCard>
                      {cards.map((card) => (
                        <HelperCards image={image}></HelperCards>
                      ))}
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p">
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );

  // <Container maxWidth="l">
  //   <Container className="App-header">
  //     <img src={logo} className="App-logo" alt="logo" />
  //     <a
  //       className="App-link"
  //       href="https://reactjs.org"
  //       target="_blank"
  //       rel="noopener noreferrer"
  //     >
  //       Learn React
  //     </a>
  //   </Container>
  //   <Container className="App-body">
  //   <Button variant="contained" align="center" >Hello World</Button>;
  //     <Container className="image-show"></Container>
  //     <Box sx={{ bgcolor: 'background.glass', p: 6 }} className="image-options-grid">
  //       <div className="image-options-colors"> a </div>
  //       <div className="image-options-chooser"> b  </div>
  //       <div className="image-options-options"> c </div>
  //     </Box>
  //     </Container>
  //   <footer className="App-footer">
  //     something
  //   </footer>
  // </Container>
  // );
}

export default App;
