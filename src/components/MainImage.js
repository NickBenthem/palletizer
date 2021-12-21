import { Button, Input } from "@mui/material";
import Grid from "@mui/material/Grid";
import React, { useEffect } from "react";
import Resizer from "react-image-file-resizer";

const UploadAndDisplayImage = ({ image, setImage }) => {
  // Resize a File to a given height and width and return an object URL
  const resizeFile = (file, width, height) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        width,
        height,
        "JPEG",
        100,
        0,
        (uri) => {
          resolve(uri);
        },
        "base64"
      );
    });

  // check if a string is a image url or data url
  const isImageUrl = (url) => {
    return url.startsWith("data:image/") || url.startsWith("http");
  };

  // download an image from a url and return a data url
  const downloadImage = async (url) => {
    const response = await fetch(url);
    const blob = await response.blob();
    const file = new File([blob], "image.jpg", { type: "image/jpeg" });
    const dataUrl = await resizeFile(file, 800, 800);
    return dataUrl;
  };

  useEffect(() => {
    const getDefaultImageData = async (url) => {
      let imageData = null;
      // if the url is null
      if (!url) {
        url = "https://picsum.photos/800"
      }
      if (isImageUrl(url)) {
        imageData = await downloadImage(url);
      } else {
        imageData = url;
      }
      setImage(imageData);
    };

    const dataURL = getDefaultImageData(image);
    // Update the document title using the browser API
    // if (!dataURL.ok) throw new Error(dataURL.status);
    // console.log(dataURL.result);
  });

  return (
    <Grid item sx={{ maxWidth: "800px", maxHeight: "800px" }}>
      <h1>Select an image</h1>
      <img src={image} />
      <br />

      <br />
      <Button component="label" variant="contained" sx ={{px :"30px"}}>
        Upload Photo
        <Input
          accept="image/*"
          id="icon-button-file"
          style={{ display: 'none' }}
          variant="contained"
          type="file"
          hidden
          onChange={async (event) => {
            setImage(await resizeFile(await event.target.files[0], 800, 800));
          }}
        ></Input>
      </Button>
    </Grid>
  );
};
export default UploadAndDisplayImage;
