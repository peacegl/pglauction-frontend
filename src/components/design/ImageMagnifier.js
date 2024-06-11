import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import {Box, Fab, alpha} from '@mui/material';
import {PropTypes} from 'prop-types';
import {useLayoutEffect, useState} from 'react';

const ImageMagnifier = ({
  src,
  magnifierHeight = 120,
  magnifieWidth = 160,
  zoomLevel = 4,
  showPrev = true,
  showNext = true,
  onPrev,
  onNext,
  topCustom,
  leftCustom,
}) => {
  const [[x, y], setXY] = useState([0, 0]);
  const [[right, top], setTopRight] = useState([0, 0]);
  const [[Mheight, Mwidth], setHeightWidth] = useState([0, 0]);
  const [[imgWidth, imgHeight], setSize] = useState([0, 0]);
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [innerWidth, setInnerWidth] = useState([0]);

  useLayoutEffect(() => {
    function updateSize() {
      setInnerWidth([window.innerWidth]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
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
          src={src}
          style={{width: '100%'}}
          onMouseEnter={(e) => {
            // update image size and turn-on magnifier
            const elem = e.currentTarget;
            const {top, right, width, height} = elem.getBoundingClientRect();
            setTopRight([right + window.pageXOffset, top + window.pageYOffset]);
            setHeightWidth([height, width]);
            setSize([width, height]);
            setShowMagnifier(true);
          }}
          onMouseMove={(e) => {
            // update cursor position
            const elem = e.currentTarget;
            const {top, left} = elem.getBoundingClientRect();

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
        {innerWidth > 900 && (
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
          />
        )}
      </Box>
      {innerWidth > 900 && (
        <Box
          sx={{
            mx: 2,
            position: 'absolute',
            top: topCustom ?? `${top}px`,
            left: leftCustom ?? `${right + 10}px`,
            zIndex: 100,
            display: {xs: 'none', md: showMagnifier ? 'block' : 'none'},
            height: `${imgHeight}px`,
            width: `${imgWidth}px`,
            opacity: '1', // reduce opacity so you can verify position
            border: '1px solid lightgray',
            backgroundColor: 'white',
            backgroundImage: `url('${src}')`,
            backgroundRepeat: 'no-repeat',
            //calculate zoomed image size
            backgroundSize: `${imgWidth * zoomLevel}px ${
              imgHeight * zoomLevel
            }px`,
            //calculete position of zoomed image.
            backgroundPositionX: `${-x * zoomLevel + Mwidth / 2}px`,
            backgroundPositionY: `${-y * zoomLevel + Mheight / 2}px`,
          }}
        />
      )}
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
  topCustom: PropTypes.string,
  leftCustom: PropTypes.string,
};
