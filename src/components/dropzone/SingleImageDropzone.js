import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import AvatarViewWrapper from '../main/AvatarViewWrapper';
import ImageIcon from '@mui/icons-material/Image';
import {useDropzone} from 'react-dropzone';
import {Typography} from '@mui/material';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';

const SingleImageDropzone = ({
  width,
  image,
  name,
  setfieldvalue,
  setImage,
  text,
  isImageValid,
  setIsImageValid,
  errorMessage,
  deleteImage,
}) => {
  const {getRootProps, getInputProps} = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      setImage({preview: URL.createObjectURL(acceptedFiles[0])});
      setfieldvalue(name, acceptedFiles[0]);
      if (setIsImageValid) setIsImageValid(true);
    },
  });
  return (
    <Box sx={{position: 'relative'}}>
      <AvatarViewWrapper {...getRootProps({className: 'dropzone'})}>
        <input {...getInputProps()} />
        <label htmlFor='icon-button-file'>
          <Box
            sx={{
              width: width ? width : {xs: 50, lg: 80},
              height: width ? width : {xs: 50, lg: 80},
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
            {!image.preview && (
              <Box
                sx={{
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
            {image.preview && (
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
                      setfieldvalue(name, '');
                    }}
                  />
                </Box>
                <img alt='preview' src={image.preview} />
              </>
            )}
          </Box>
        </label>
      </AvatarViewWrapper>
      {!isImageValid && (
        <Typography color='error' sx={{ml: 1}}>
          {errorMessage}
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
  image: PropTypes.object,
  text: PropTypes.string,
  isImageValid: PropTypes.bool,
  setIsImageValid: PropTypes.func,
  errorMessage: PropTypes.string,
  setImage: PropTypes.func,
  deleteImage: PropTypes.func,
};
