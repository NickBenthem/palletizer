
onmessage = function(e) {


  //
  const hexToRgb = hex => {
    if (hex) {
      const normal = hex.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);
      if (normal) return normal.slice(1).map(e => parseInt(e, 16));

      const shorthand = hex.match(/^#([0-9a-f])([0-9a-f])([0-9a-f])$/i);  
      if (shorthand) return shorthand.slice(1).map(e => 0x11 * parseInt(e, 16));

      return null;
  }
}


  const palleteArray = e.data.palleteArray;
  const pixelsArray = e.data.pixelsArray; // Represents a chunk of the image - will be ~67 rows.

  console.log('Worker: Message received from main script');

  const euclideanDistance = (color1, color2) => {
    return Math.sqrt(
      Math.pow(color1[0] - color2[0], 2) +
        Math.pow(color1[1] - color2[1], 2) +
        Math.pow(color1[2] - color2[2], 2)
    );
  }
 const closestColor = (color,pallete) => {
   // Find the closest RGB color in the pallete given euclidean distance
   // Use a map to store the distance of each color in the pallete
   // Return the color with the smallest distance
   let distances = {};
   for (let i = 0; i < pallete.length; i++) {
     distances[i] = euclideanDistance(color, hexToRgb(pallete[i].color));
   }
  //  console.log(distances);
   return pallete[Object.keys(distances).reduce((a, b) => distances[a] < distances[b] ? a : b)];

 }
let results = [];
for (let i = 0; i < pixelsArray.length; i++) {
  const row = [];
  for(let column = 0; column < pixelsArray[i].length; column++) {
    let rgbhex = closestColor(pixelsArray[i][column], palleteArray);
    
    row.push(([...hexToRgb(rgbhex.color),255]));
  }
  results.push(row);
}

 
// console.log(results);

// console.log('Worker: Posting message back to main script');
postMessage(results);

}
