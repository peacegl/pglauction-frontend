import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import OrderDropDown from './OrderDropDown';
import PropsTypes from 'prop-types';
import {Box} from '@mui/material';
import React from 'react';

const PreviewThumb = ({
  file,
  onDeleteUploadFile,
  total,
  setImages,
  setfieldvalue,
  images,
}) => {
  return (
    <Box
      sx={{
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
          left: 10,
          top: 10,
        }}
      >
        <OrderDropDown
          total={total}
          selectedItem={file.order ? file.order : 0}
          onChanged={(order) => {
            setImages((d) =>
              d.map((image) => {
                if (image.preview == file.preview) {
                  image.order = order;
                }
                return image;
              }),
            );
            // setfieldvalue('image_order');

            // setfieldvalue;
            // image_order;
          }}
        />
      </Box>
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
  total: PropsTypes.number,
  setImages: PropsTypes.func,
  setfieldvalue: PropsTypes.func,
  images: PropsTypes.array,
};
