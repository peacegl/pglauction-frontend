import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import AvatarViewWrapper from '../main/AvatarViewWrapper';
import IntlMessages from '@crema/utility/IntlMessages';
import ImageIcon from '@mui/icons-material/Image';
import {BsFillFilePdfFill} from 'react-icons/bs';
import AppTooltip from '@crema/core/AppTooltip';
import {useDropzone} from 'react-dropzone';
import {useState, useEffect} from 'react';
import {IconButton, Typography} from '@mui/material';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import useDownloader from 'react-use-downloader';

const SingleFileDropzone = ({
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
}) => {
  const [clientError, setClientError] = useState(false);
  const {size, elapsed, percentage, download, cancel, error, isInProgress} =
    useDownloader();

  const {getRootProps, getInputProps} = useDropzone({
    accept: `image/*,.pdf`,
    multiple: false,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles[0].size > 6291456) {
        setClientError(true);
        if (setIsImageValid) setIsImageValid(false);
      } else {
        setClientError(false);
        setImage(acceptedFiles[0]);
        setfieldvalue(name, acceptedFiles[0]);
        if (setIsImageValid) setIsImageValid(true);
      }
    },
  });
  useEffect(() => {
    if (clientError) {
      const timer = setTimeout(() => {
        setClientError(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [clientError]);

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
            ${
              !isImageValid
                ? theme.palette.clientError.main
                : theme.palette.divider
            }
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
              {!image?.name && (
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
              {image?.name && (
                <Box>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      p: 1,
                    }}
                  >
                    <BsFillFilePdfFill style={{fontSize: '30px'}} />
                    <Box sx={{mx: 1}}>
                      <Box
                        sx={{
                          display: 'flex',
                          width: width ? width - 70 : '220px',
                        }}
                      >
                        <AppTooltip
                          title={
                            image?.name ? image?.name : 'Identification Proof'
                          }
                        >
                          <Typography noWrap>
                            {image?.name ? image?.name : 'Identification Proof'}
                          </Typography>
                        </AppTooltip>
                      </Box>
                      {image?.size && (
                        <Box>{Math.ceil(image?.size / 1024)}KB</Box>
                      )}
                      <Box
                        sx={{
                          position: 'absolute',
                          right: 0,
                          bottom: 0,
                        }}
                      >
                        {image?.url && (
                          <IconButton
                            onClick={(e) => {
                              e.stopPropagation();
                              download(image?.url, image?.name);
                            }}
                            size='small'
                          >
                            <FileDownloadIcon fontSize='inherit' />
                          </IconButton>
                        )}
                        <IconButton
                          onClick={(e) => {
                            e.stopPropagation();
                            if (setIsImageValid) setIsImageValid(false);
                            if (deleteImage) deleteImage(image.id);
                            setImage({});
                            setClientError(false);
                            setfieldvalue(name, '');
                          }}
                          size='small'
                        >
                          <DeleteOutlineOutlinedIcon
                            sx={{color: 'warning.main'}}
                            fontSize='inherit'
                          />
                        </IconButton>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              )}
            </Box>
          </label>
        </AvatarViewWrapper>
      </Box>
      {!isImageValid && (
        <Typography color='clientError' sx={{ml: 1}}>
          {errorMessage}
        </Typography>
      )}
      {clientError && (
        <Typography color='clientError' sx={{ml: 1}}>
          <IntlMessages id='common.maxFileSize' />
        </Typography>
      )}
    </Box>
  );
};

export default SingleFileDropzone;
SingleFileDropzone.propTypes = {
  setfieldvalue: PropTypes.func,
  name: PropTypes.string,
  width: PropTypes.any,
  height: PropTypes.any,
  image: PropTypes.object,
  text: PropTypes.any,
  isImageValid: PropTypes.bool,
  setIsImageValid: PropTypes.func,
  errorMessage: PropTypes.string,
  setImage: PropTypes.func,
  deleteImage: PropTypes.func,
};
