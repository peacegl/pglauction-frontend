import {useState, useLayoutEffect, useCallback} from 'react';
import {Card, Box, Modal, Typography} from '@mui/material';
import Cropper from 'react-easy-crop';
import PropTypes from 'prop-types';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import {Opacity} from '@mui/icons-material';

const CustomModal = ({open, toggleOpen, width, image, ...rest}) => {
  const [size, setSize] = useState([0]);
  const [crop, setCrop] = useState({x: 0, y: 0});
  const [zoom, setZoom] = useState(1);
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    console.log(croppedArea, croppedAreaPixels);
  }, []);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return (
    <Modal {...rest} open={open}>
      <Card
        sx={{
          mt: 50,
          mx: 'auto',
          width: width
            ? size >= width
              ? width
              : size - 10
            : size >= 600
            ? 600
            : size - 10,
          bgcolor: 'background.paper',
          boxShadow: 1,
          borderRadius: 2,
        }}
      >
        <IconButton
          aria-label='close'
          onClick={toggleOpen}
          sx={{display: 'flex', justifyContent: 'flex-end'}}
        >
          <CloseIcon sx={{fontSize: 18}} />
        </IconButton>
        <Box>
          <Box
            sx={{
              mt: 2,
              mx: 'auto',
              position: 'relative',
              borderRadius: 3,
              width: size >= 500 ? '500px' : size - 20,
              height: size >= 500 ? '500px' : size - 20,
            }}
          >
            <Cropper
              image={URL.createObjectURL(image)}
              crop={crop}
              zoom={zoom}
              aspect={4 / 3}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
            />
          </Box>
          <div>
            <input
              type='range'
              value={zoom}
              min={1}
              max={3}
              step={0.1}
              aria-labelledby='Zoom'
              onChange={(e) => {
                setZoom(e.target.value);
              }}
              className='zoom-range'
            />
          </div>
        </Box>
      </Card>
    </Modal>
  );
};

export default CustomModal;

CustomModal.propTypes = {
  open: PropTypes.bool.isRequired,
  width: PropTypes.number,
  toggleOpen: PropTypes.func.isRequired,
  image: PropTypes.string.isRequired,
};
