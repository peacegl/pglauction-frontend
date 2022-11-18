import IntlMessages from '@crema/utility/IntlMessages';
import ImageCropModal from './ImageCropModal';
import {useDropzone} from 'react-dropzone';
import UploadModern from './UploadModern';
import PreviewThumb from './PreviewThumb';
import {useEffect, useState} from 'react';
import {Stack} from '@mui/material';
import PropTypes from 'prop-types';

const MultipleImageDropzone = (props) => {
  const [imagesForCrop, setImagesForCrop] = useState([]);
  const [openImageCrop, setOpenImageCrop] = useState(false);
  const dropzone = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      setImagesForCrop(acceptedFiles);
      setOpenImageCrop(true);
    },
  });
  const addImages = (croptedImages) => {
    props.setfieldvalue('images', [...croptedImages]);
    let newImages = croptedImages.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      }),
    );
    props.setImages([...newImages, ...props.images]);
  };

  useEffect(() => {
    if (props.images.length > 0) {
      if (props.images.length > 20) {
        props.setMaxImagesValid(false);
      } else {
        props.setMaxImagesValid(true);
        props.setMinImagesValid(true);
      }
    } else {
      props.setMaxImagesValid(true);
      props.setMinImagesValid(false);
    }
  }, [props.images]);

  const onDeleteUploadFile = (file) => {
    props.setDeletedImages((d) => (file?.id ? [file.id, ...d] : d));
    dropzone.acceptedFiles.splice(dropzone.acceptedFiles.indexOf(file), 1);
    props.images.splice(props.images.indexOf(file), 1);
    props.setImages([...props.images]);
    props.setfieldvalue('images', [...dropzone.acceptedFiles]);
  };

  return (
    <section className='container' style={{cursor: 'pointer', width: '100%'}}>
      <UploadModern
        uploadText={<IntlMessages id='common.DropzoneImages' />}
        dropzone={dropzone}
        isMinImagesValid={props.isMinImagesValid}
        isMaxImagesValid={props.isMaxImagesValid}
      />
      <Stack
        direction='row'
        spacing={0}
        sx={{flexWrap: 'wrap', gap: 2, justifyContent: 'center'}}
      >
        {props.images.map((item, index) => (
          <PreviewThumb
            onDeleteUploadFile={onDeleteUploadFile}
            file={item}
            key={index}
          />
        ))}
      </Stack>
      {openImageCrop && (
        <ImageCropModal
          open={openImageCrop}
          toggleOpen={() => setOpenImageCrop((d) => !d)}
          images={imagesForCrop}
          saveImages={addImages}
        />
      )}
    </section>
  );
};

export default MultipleImageDropzone;

MultipleImageDropzone.propTypes = {
  setfieldvalue: PropTypes.func,
  images: PropTypes.array,
  setImages: PropTypes.func,
  isMinImagesValid: PropTypes.bool,
  setMinImagesValid: PropTypes.func,
  isMaxImagesValid: PropTypes.bool,
  setMaxImagesValid: PropTypes.func,
  setDeletedImages: PropTypes.func,
  isEdit: PropTypes.bool,
};
