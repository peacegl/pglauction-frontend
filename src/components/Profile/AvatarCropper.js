import {useState, useLayoutEffect, useRef} from 'react';
import IntlMessages from '@crema/utility/IntlMessages';
import CloseIcon from '@mui/icons-material/Close';
import AvatarEditor from 'react-avatar-editor';
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import {LoadingButton} from '@mui/lab';
import PropTypes from 'prop-types';
import {
  Card,
  Box,
  Modal,
  Typography,
  Paper,
  IconButton,
  Chip,
} from '@mui/material';

const AvatarCropper = ({
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
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const imageRef = useRef();

  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const convasToBlob = async (canvas, filename) => {
    return new Promise((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          resolve(new File([blob], filename, {type: 'image/jpeg'}));
        },
        'image/jpeg',
        0.8,
      );
    });
  };

  const showCroppedImage = async () => {
    try {
      setIsLoading(true);
      const canvas = imageRef.current.getImage();
      const croppedImage = await convasToBlob(canvas, images[imageIndex].name);
      if (images.length - 1 == imageIndex) {
        saveImages([...croppedImages, croppedImage]);
        toggleOpen(false);
      } else {
        setImageIndex(imageIndex + 1);
      }
      setCroppedImages((d) => [...d, croppedImage]);
      setIsLoading(false);
    } catch (e) {
      console.error(e);
      setIsLoading(false);
    }
  };

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
        <Box sx={{display: 'flex', flexDirection: 'row-reverse'}}>
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
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <AvatarEditor
              ref={imageRef}
              image={
                typeof images[imageIndex] == 'object'
                  ? URL.createObjectURL(images[imageIndex])
                  : images[imageIndex]
              }
              width={size > 500 ? 450 : size - 100}
              height={size > 500 ? 450 : size - 100}
              color={[0, 0, 0, 0.6]} // RGBA
              scale={zoom}
              rotate={rotation}
              borderRadius={(size > 500 ? 450 : size - 100) / 2}
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
              <LoadingButton
                onClick={showCroppedImage}
                variant='contained'
                sx={{
                  borderRadius: 1,
                  width: '100%',
                }}
                loading={isLoading}
              >
                {images.length == imageIndex + 1 ? (
                  <IntlMessages id='common.save' />
                ) : (
                  <IntlMessages id='common.next' />
                )}
              </LoadingButton>
            </Box>
          </Paper>
        </Box>
      </Card>
    </Modal>
  );
};

export default AvatarCropper;

AvatarCropper.propTypes = {
  open: PropTypes.bool.isRequired,
  width: PropTypes.number,
  toggleOpen: PropTypes.func.isRequired,
  images: PropTypes.array.isRequired,
  saveImages: PropTypes.func.isRequired,
};
