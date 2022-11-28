import {useState, useLayoutEffect, useCallback} from 'react';
import IntlMessages from '@crema/utility/IntlMessages';
import CloseIcon from '@mui/icons-material/Close';
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import getCroppedImg from './cropImage';
import Cropper from 'react-easy-crop';
import PropTypes from 'prop-types';
import {
  Card,
  Box,
  Modal,
  Typography,
  Paper,
  IconButton,
  Button,
  Chip,
} from '@mui/material';

const SignInModal = ({
  open,
  toggleOpen,
  width,
  images,
  saveImages,
  ...rest
}) => {
  const [croppedImages, setCroppedImages] = useState([]);
  const [imageIndex, setImageIndex] = useState(0);
  const [size, setSize] = useState([0]);
  const [crop, setCrop] = useState({x: 0, y: 0});
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(
        URL.createObjectURL(images[imageIndex]),
        croppedAreaPixels,
        rotation,
        images[imageIndex].name,
      );
      if (images.length - 1 == imageIndex) {
        saveImages([...croppedImages, croppedImage]);
        toggleOpen(false);
      } else {
        setImageIndex(imageIndex + 1);
      }
      setCroppedImages((d) => [...d, croppedImage]);
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels, rotation, imageIndex]);

  return (
    <Modal {...rest} open={open}>
      <Card
        sx={{
          mt: 30,
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
        <Box sx={{float: 'right'}}>
          <IconButton aria-label='close' onClick={toggleOpen}>
            <CloseIcon sx={{fontSize: 18}} />
          </IconButton>
        </Box>
        {images.length > 1 && (
          <Chip
            label={
              <Box sx={{display: 'flex'}}>
                <Typography variant='h3'>{imageIndex + 1}</Typography> /
                <Typography variant='body1'>{images.length}</Typography>
              </Box>
            }
            size='small'
            color='primary'
            sx={{mx: 3, mt: 2}}
          />
        )}
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
              image={URL.createObjectURL(images[imageIndex])}
              crop={crop}
              zoom={zoom}
              rotation={rotation}
              aspect={4 / 3}
              onCropChange={setCrop}
              onRotationChange={setRotation}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
            />
          </Box>
          <Paper
            sx={{
              mt: 4,
              py: 2,
            }}
          >
            <Stack
              spacing={{xs: 1, lg: 4}}
              direction={{xs: 'column', lg: 'row'}}
              justifyContent='center'
              alignItems='center'
              sx={{mx: 3}}
            >
              <Stack direction='row' alignItems='center' spacing={5}>
                <Typography>
                  <IntlMessages id='common.zoom' />
                </Typography>
                <Slider
                  value={zoom}
                  min={1}
                  max={3}
                  step={0.1}
                  aria-labelledby='Zoom'
                  onChange={(e) => {
                    setZoom(e.target.value);
                  }}
                  sx={{width: '200px'}}
                />
              </Stack>
              <Stack direction='row' alignItems='center' spacing={5}>
                <Typography>
                  <IntlMessages id='common.rotation' />
                </Typography>
                <Slider
                  value={rotation}
                  min={0}
                  max={360}
                  step={1}
                  aria-labelledby='Rotation'
                  onChange={(e, rotation) => setRotation(rotation)}
                  sx={{width: '200px'}}
                />
              </Stack>
            </Stack>
            <Box
              sx={{
                my: 2,
                mx: 3,
              }}
            >
              <Button
                onClick={showCroppedImage}
                variant='contained'
                sx={{
                  borderRadius: 1,
                  width: '100%',
                }}
              >
                {images.length == imageIndex + 1 ? (
                  <IntlMessages id='common.save' />
                ) : (
                  <IntlMessages id='common.next' />
                )}
              </Button>
            </Box>
          </Paper>
        </Box>
      </Card>
    </Modal>
  );
};

export default SignInModal;

SignInModal.propTypes = {
  open: PropTypes.bool.isRequired,
  width: PropTypes.number,
  toggleOpen: PropTypes.func.isRequired,
  images: PropTypes.array.isRequired,
  saveImages: PropTypes.func.isRequired,
};
