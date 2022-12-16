import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import PropsTypes from 'prop-types';
import {alpha, Box} from '@mui/material';
import React from 'react';
import {sortableHandle} from 'react-sortable-hoc';

const DragHandle = sortableHandle(() => (
  <Box
    sx={{
      position: 'absolute',
      left: 10,
      top: 10,
    }}
  >
    <DragIndicatorIcon
      sx={{
        fontSize: '20px',
        color: 'primary.contrastText',
        borderRadius: '50%',
        backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.6),
        padding: '3px',
        '&:hover, &:focus': {
          backgroundColor: 'info.main',
        },
      }}
    />
  </Box>
));
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
          cursor: 'default',
          display: 'block',
          width: 'auto',
          objectFit: 'cover',
          overflow: 'hidden',
          height: '100%',
        },
      }}
    >
      <DragHandle />
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
          onClick={() => onDeleteUploadFile(file)}
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
