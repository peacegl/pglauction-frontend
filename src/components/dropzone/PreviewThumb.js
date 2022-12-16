import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import PropsTypes from 'prop-types';
import {Box} from '@mui/material';
import React from 'react';

const PreviewThumb = ({file, onDeleteUploadFile}) => {
  return (
    <Box
      sx={{
        zIndex: 100000,
        position: 'relative',
        display: 'inline-flex',
        borderRadius: 2,
        border: '1px solid #eaeaea',
        marginBottom: 2,
        marginRight: 2,
        width: 200,
        height: 150,
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
            console.log('esdfa', e);
            onDeleteUploadFile(file);
          }}
        />
      </Box>
      <img alt='preview' src={file?.preview} />
    </Box>
  );
};

export default PreviewThumb;
PreviewThumb.propTypes = {
  file: PropsTypes.object,
  onDeleteUploadFile: PropsTypes.func,
};
