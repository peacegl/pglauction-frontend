import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import {Typography} from '@mui/material';
import {TiFolderOpen} from 'react-icons/ti';
import IntlMessages from '@crema/utility/IntlMessages';
import {useThemeContext} from '@crema/utility/AppContextProvider/ThemeContextProvider';

const UploadModern = ({
  uploadText,
  dropzone,
  isMinImagesValid,
  isMaxImagesValid,
  error,
}) => {
  const {theme} = useThemeContext();
  return (
    <Box
      sx={{
        position: 'relative',
        mb: 4,
        '& ul': {
          listStyle: 'none',
          padding: 0,
        },
      }}
    >
      <Box
        {...dropzone.getRootProps({className: 'dropzone'})}
        sx={{
          cursor: 'pointer',
          border: (theme) =>
            `dashed 2px 
            ${
              isMinImagesValid && isMaxImagesValid
                ? theme.palette.divider
                : theme.palette.error.main
            }
            `,
          borderRadius: 2.5,
          p: 5,
          mb: 1,
          textAlign: 'center',
          color: 'text.secondary',
          backgroundColor: 'background.default',
        }}
      >
        <input {...dropzone.getInputProps()} />
        <TiFolderOpen
          style={{
            fontSize: 40,
            marginBottom: 4,
            color: theme.palette.primary.main,
          }}
        />
        <p>{uploadText}</p>
      </Box>
      {!isMinImagesValid && (
        <Typography color='error' sx={{ml: 1}}>
          <IntlMessages id='auction.atleastOneImageRequired' />
        </Typography>
      )}
      {!isMaxImagesValid && (
        <Typography color='error' sx={{ml: 1}}>
          <IntlMessages id='auction.max20ImageAllowed' />
        </Typography>
      )}
      {error && (
        <Typography color='error' sx={{ml: 1}}>
          <IntlMessages id='common.oneOrMoreMaxSizeError' />
        </Typography>
      )}
    </Box>
  );
};

export default UploadModern;

UploadModern.propTypes = {
  uploadText: PropTypes.string || PropTypes.object,
  dropzone: PropTypes.object,
  isMinImagesValid: PropTypes.bool,
  isMaxImagesValid: PropTypes.bool,
  error: PropTypes.bool,
};
