import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import AvatarViewWrapper from '../main/AvatarViewWrapper';
import IntlMessages from '@crema/utility/IntlMessages';
import ImageIcon from '@mui/icons-material/Image';
import ImageCropModal from './ImageCropModal';
import {useDropzone} from 'react-dropzone';
import {Typography} from '@mui/material';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import {useState, useEffect} from 'react';

const SingleImageDropzone = ({
  width,
  height,
  image,
  name,
  setfieldvalue,
  setImage,
  text,
  isImageValid,
  setIsImageValid,
  errorMessage,
  deleteImage,
  disableCrop = false,
}) => {
  const [error, setError] = useState(false);
  const [imagesForCrop, setImagesForCrop] = useState([]);
  const [openImageCrop, setOpenImageCrop] = useState(false);
  const [isPdf, setIsPdf] = useState(false);
  const {getRootProps, getInputProps} = useDropzone({
    accept: 'image/*,.pdf',
    multiple: false,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles[0].size > 6291456) {
        setError(true);
        if (setIsImageValid) setIsImageValid(false);
      } else {
        setError(false);
        if (!disableCrop) {
          setImagesForCrop(acceptedFiles);
          setOpenImageCrop(true);
        } else {
          if (acceptedFiles[0].type.includes('pdf')) {
            setIsPdf(true);
            setImage(acceptedFiles[0]);
          } else {
            setImage({preview: URL.createObjectURL(acceptedFiles[0])});
          }
          setfieldvalue(name, acceptedFiles[0]);
          if (setIsImageValid) setIsImageValid(true);
        }
      }
    },
  });
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);
  const addImage = (croptedImages) => {
    if (acceptedFiles[0].type.includes('pdf')) {
      setIsPdf(true);
    } else {
      setImage({preview: URL.createObjectURL(acceptedFiles[0])});
    }
    setfieldvalue(name, croptedImages[0]);
    if (setIsImageValid) setIsImageValid(true);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box sx={{position: 'relative'}}>
        <AvatarViewWrapper {...getRootProps({className: 'dropzone'})}>
          <input {...getInputProps()} />
          <label htmlFor='icon-button-file'>
            <Box
              sx={{
                width: width ? width : {xs: 60, lg: 80},
                height: height ? height : {xs: 60, lg: 80},
                cursor: 'pointer',
                position: 'relative',
                display: 'inline-flex',
                borderRadius: 2,
                border: (theme) =>
                  `dashed 2px 
            ${!isImageValid ? theme.palette.error.main : theme.palette.divider}
            `,
                marginBottom: 2,
                marginRight: 2,
                padding: 1,
                boxSizing: 'border-box',
                '& img': {
                  display: 'block',
                  width: 'auto',
                  objectFit: 'cover',
                  overflow: 'hidden',
                  height: '100%',
                },
              }}
            >
              {!image?.preview && !isPdf && (
                <Box
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    mx: 'auto',
                    alignItems: 'center',
                  }}
                >
                  <ImageIcon
                    style={{
                      fontSize: 40,
                      marginBottom: 4,
                      color: (theme) => theme.palette.primary.main,
                    }}
                  />
                  <Typography>{text}</Typography>
                </Box>
              )}
              {!isPdf && image?.preview && (
                <>
                  <Box
                    sx={{
                      position: 'absolute',
                      right: 10,
                      top: 10,
                    }}
                  >
                    <DeleteOutlineOutlinedIcon
                      sx={{
                        color: 'warning.main',
                        borderRadius: '50%',
                        padding: 1,
                        '&:hover, &:focus': {
                          backgroundColor: 'primary.contrastText',
                        },
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (setIsImageValid) setIsImageValid(false);
                        if (deleteImage) deleteImage(image.id);
                        setImage({});
                        setIsPdf(false);
                        setError(false);
                        setfieldvalue(name, '');
                      }}
                    />
                  </Box>
                  <img alt='preview' src={image.preview} />
                </>
              )}
              {isPdf && (
                <Box>
                  <Box
                    sx={{
                      position: 'absolute',
                      right: 10,
                      top: 10,
                    }}
                  >
                    <DeleteOutlineOutlinedIcon
                      sx={{
                        color: 'warning.main',
                        borderRadius: '50%',
                        padding: 1,
                        '&:hover, &:focus': {
                          backgroundColor: 'primary.contrastText',
                        },
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (setIsImageValid) setIsImageValid(false);
                        if (deleteImage) deleteImage(image.id);
                        setImage({});
                        setIsPdf(false);
                        setError(false);
                        setfieldvalue(name, '');
                      }}
                    />
                  </Box>
                  <Box>{image?.name}</Box>
                  <Box>{image?.size}</Box>
                </Box>
              )}
            </Box>
          </label>
        </AvatarViewWrapper>

        {disableCrop && openImageCrop && (
          <ImageCropModal
            open={openImageCrop}
            toggleOpen={() => setOpenImageCrop((d) => !d)}
            images={imagesForCrop}
            saveImages={addImage}
          />
        )}
      </Box>
      {!isImageValid && (
        <Typography color='error' sx={{ml: 1}}>
          {errorMessage}
        </Typography>
      )}
      {error && (
        <Typography color='error' sx={{ml: 1}}>
          <IntlMessages id='common.maxFileSize' />
        </Typography>
      )}
    </Box>
  );
};

export default SingleImageDropzone;
SingleImageDropzone.propTypes = {
  setfieldvalue: PropTypes.func,
  name: PropTypes.string,
  width: PropTypes.object,
  height: PropTypes.object,
  image: PropTypes.object,
  text: PropTypes.string,
  isImageValid: PropTypes.bool,
  setIsImageValid: PropTypes.func,
  errorMessage: PropTypes.string,
  setImage: PropTypes.func,
  deleteImage: PropTypes.func,
  disableCrop: PropTypes.bool,
};
