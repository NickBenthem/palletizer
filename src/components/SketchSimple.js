
import React from 'react'
import reactCSS from 'reactcss'
import { SketchPicker } from 'react-color'

// class SketchSimple extends React.Component {


//   handleClick = () => {
//     this.setState({ displayColorPicker: !this.state.displayColorPicker })
//   };

//   handleClose = () => {
//     this.setState({ displayColorPicker: false })
//   };

//   handleChange = (color) => {
//     this.setState({ color: color.rgb })
//   };

//   render() {


//   }
// }

const SketchSimple = ({colorDict, handleChangeComplete}) => {
  
    // convert HEX string to RGB dictionary
    const hexToRgb = (hex) => {
      var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : null;
    }

    // convert RGB dictionary to HEX string
    const rgbToHex = (rgb) => {
      return "#" + ((1 << 24) + (rgb.r << 16) + (rgb.g << 8) + rgb.b).toString(16).slice(1);
    }

  const [state, setState] = React.useState({
    displayColorPicker: false,
    color: hexToRgb(colorDict.color),
  });
  
  const handleClick = () => {
    setState({ displayColorPicker: !state.displayColorPicker , color: state.color})
    handleChangeComplete(colorDict.id, rgbToHex(state.color));
  };

  const handleClose = () => {
    setState({ displayColorPicker: false , color: state.color});
    handleChangeComplete(colorDict.id,rgbToHex(state.color));
  };

  const handleChange = (color) => {
    setState({ color: color.rgb , displayColorPicker: state.displayColorPicker});
    
    handleChangeComplete(colorDict.id,rgbToHex(state.color));

  };




  
  const styles = reactCSS({
    'default': {
      color: {
        width: '75px',
        height: '75px',
        borderRadius: '2px',
        background: `rgb(${ state.color.r }, ${ state.color.g }, ${ state.color.b })`,
      },
      swatch: {
        padding: '5px',
        background: '#fff',
        borderRadius: '1px',
        boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
        display: 'inline-block',
        cursor: 'pointer',
      },
      popover: {
        position: 'absolute',
        zIndex: '2',
      },
      cover: {
        position: 'fixed',
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px',
      },
    },
  });


  return (
    <div>
      <div style={ styles.swatch } onClick={ handleClick }>
        <div style={ styles.color } />
      </div>
      { state.displayColorPicker ? <div style={ styles.popover }>
        <div style={ styles.cover } onClick={ handleClose }/>
        <SketchPicker color={ state.color } disableAlpha onChange={ handleChange  } />
      </div> : null }

    </div>
  )
}

export default SketchSimple
