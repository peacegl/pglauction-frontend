import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import {Box, Fab, alpha} from '@mui/material';
import {useEffect, useState} from 'react';
import {PropTypes} from 'prop-types';

const ImageMagnifier = ({
  src,
  magnifierHeight = 100,
  magnifieWidth = 150,
  zoomLevel = 2.5,
  showPrev = true,
  showNext = true,
  onPrev,
  onNext,
}) => {
  const [[x, y], setXY] = useState([0, 0]);
  const [[right, top, Mheight, Mwidth], setTopRight] = useState([
    0, 0, 100, 150,
  ]);
  const [[imgWidth, imgHeight], setSize] = useState([0, 0]);
  const [showMagnifier, setShowMagnifier] = useState(false);

  useEffect(() => {
    const container = document.getElementById('main_image');
    const {top, right, width, height} = container.getBoundingClientRect();
    setTopRight([right, top, height, width]);
  }, []);
  return (
    <Box>
      <Box
        sx={{
          position: 'relative',
          width: '100%',
        }}
      >
        {showPrev && (
          <Fab
            onClick={() => {
              if (onPrev) onPrev();
            }}
            size='small'
            sx={{
              position: 'absolute',
              top: '50%',
              left: '1%',
              transform: ' translate(-50%, -50%)',
              backgroundColor: alpha('#000', 0.5),
              color: (theme) => theme.palette.primary.contrastText,
              '&:hover': {
                backgroundColor: alpha('#000', 0.8),
              },
            }}
          >
            <ArrowBackIosNewIcon />
          </Fab>
        )}
        <img
          id='main_image'
          src={src}
          style={{width: '100%'}}
          onMouseEnter={(e) => {
            // update image size and turn-on magnifier
            const elem = e.currentTarget;
            const {width, height} = elem.getBoundingClientRect();
            setSize([width, height]);
            setShowMagnifier(true);
          }}
          onMouseMove={(e) => {
            // update cursor position
            const elem = e.currentTarget;
            const {top, left, right, bottom} = elem.getBoundingClientRect();

            // calculate cursor position on the image
            const x = e.pageX - left - window.pageXOffset;
            const y = e.pageY - top - window.pageYOffset;
            setXY([x, y]);
          }}
          onMouseLeave={() => {
            // close magnifier
            setShowMagnifier(false);
          }}
          alt={'img'}
        />
        {showNext && (
          <Fab
            onClick={() => {
              if (onNext) onNext();
            }}
            size='small'
            sx={{
              position: 'absolute',
              top: '50%',
              left: '99%',
              transform: ' translate(-50%, -50%)',
              backgroundColor: alpha('#000', 0.5),
              color: (theme) => theme.palette.primary.contrastText,
              '&:hover': {
                backgroundColor: alpha('#000', 0.8),
              },
            }}
          >
            <ArrowForwardIosIcon />
          </Fab>
        )}
        <Box
          sx={{
            display: showMagnifier ? '' : 'none',
            position: 'absolute',
            // prevent maginier blocks the mousemove event of img
            pointerEvents: 'none',
            // set size of magnifier
            height: `${magnifierHeight}px`,
            width: `${magnifieWidth}px`,
            // move element center to cursor pos
            top: `${y - magnifierHeight / 2}px`,
            left: `${x - magnifieWidth / 2}px`,
            opacity: '1', // reduce opacity so you can verify position
            border: '1px solid lightgray',
            backgroundColor: 'white',
            backgroundImage: `url('${src}')`,
            backgroundRepeat: 'no-repeat',
            //calculate zoomed image size
            backgroundSize: `${imgWidth * 1}px ${imgHeight * 1}px`,
            //calculete position of zoomed image.
            backgroundPositionX: `${-x * 1 + magnifieWidth / 2}px`,
            backgroundPositionY: `${-y * 1 + magnifierHeight / 2}px`,
          }}
        ></Box>
      </Box>
      <Box
        sx={{
          mx: 2,
          position: 'absolute',
          top: `${top}px`,
          left: `${right + 10}px`,
          zIndex: 100,
          display: {xs: 'none', md: showMagnifier ? 'block' : 'none'},
          pointerEvents: 'none',
          height: `${Mheight}px`,
          width: `${Mwidth}px`,
          opacity: '1', // reduce opacity so you can verify position
          border: '1px solid lightgray',
          backgroundColor: 'white',
          backgroundImage: `url('${src}')`,
          backgroundRepeat: 'no-repeat',
          //calculate zoomed image size
          backgroundSize: `${Mwidth * zoomLevel}px ${Mheight * zoomLevel}px`,
          //calculete position of zoomed image.
          backgroundPositionX: `${-x * zoomLevel + Mwidth / 2}px`,
          backgroundPositionY: `${-y * zoomLevel + Mheight / 2}px`,
        }}
      ></Box>
    </Box>
  );
};
export default ImageMagnifier;
ImageMagnifier.propTypes = {
  src: PropTypes.any,
  magnifierHeight: PropTypes.number,
  magnifieWidth: PropTypes.number,
  zoomLevel: PropTypes.number,
  showPrev: PropTypes.bool,
  showNext: PropTypes.bool,
  onPrev: PropTypes.func,
  onNext: PropTypes.func,
};
