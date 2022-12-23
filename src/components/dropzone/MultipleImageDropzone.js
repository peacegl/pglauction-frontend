import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import IntlMessages from '@crema/utility/IntlMessages';
import ImageCropModal from './ImageCropModal';
import {useDropzone} from 'react-dropzone';
import UploadModern from './UploadModern';
import PreviewThumb from './PreviewThumb';
import {useEffect, useState} from 'react';
import {Stack} from '@mui/material';
import PropTypes from 'prop-types';

const SortableListItem = SortableElement(
  ({item, index, onDeleteUploadFile}) => {
    return (
      <PreviewThumb
        onDeleteUploadFile={onDeleteUploadFile}
        file={item}
        key={index}
      />
    );
  },
);

const SortableList = SortableContainer(({items, onDeleteUploadFile}) => {
  return (
    <Stack
      direction='row'
      spacing={0}
      sx={{flexWrap: 'wrap', gap: 2, justifyContent: 'center'}}
    >
      {items.map((item, index) => {
        return (
          <SortableListItem
            axis='xy'
            key={index}
            index={index}
            item={item}
            onDeleteUploadFile={onDeleteUploadFile}
          />
        );
      })}
    </Stack>
  );
});

const MultipleImageDropzone = (props) => {
  const [error, setError] = useState(false);
  const [imagesForCrop, setImagesForCrop] = useState([]);
  const [openImageCrop, setOpenImageCrop] = useState(false);
  const dropzone = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      let flag = false;
      acceptedFiles.forEach((acceptedFile) => {
        if (acceptedFile.size > 6291456) {
          flag = true;
          setError(true);
        }
      });
      if (!flag) {
        setError(false);
        setImagesForCrop(acceptedFiles);
        setOpenImageCrop(true);
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
  const addImages = (croptedImages) => {
    props.setfieldvalue(
      'images',
      props.values.images?.length
        ? [
            ...props.values.images,
            ...croptedImages.map((item, index) =>
              Object.assign(item, {
                preview: URL.createObjectURL(item),
              }),
            ),
          ]
        : [
            ...croptedImages.map((item, index) =>
              Object.assign(item, {
                preview: URL.createObjectURL(item),
              }),
            ),
          ],
    );
    let newImages = croptedImages.map((file, index) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      }),
    );
    const images = [...props.images, ...newImages];
    if (images.length > 20) {
      props.setMaxImagesValid(false);
    } else {
      props.setMaxImagesValid(true);
      props.setMinImagesValid(true);
    }
    props.setImages(images);
  };

  const onDeleteUploadFile = (file) => {
    props.setDeletedImages((d) => (file?.id ? [file.id, ...d] : d));
    dropzone.acceptedFiles.splice(dropzone.acceptedFiles.indexOf(file), 1);
    props.images.splice(props.images.indexOf(file), 1);
    props.setImages([...props.images]);
    props.setfieldvalue('images', [...dropzone.acceptedFiles]);
    if (props.images.length == 0) {
      props.setMaxImagesValid(true);
      props.setMinImagesValid(false);
    } else if (props.images.length < 20 && props.images.length > 0) {
      props.setMaxImagesValid(true);
      props.setMinImagesValid(true);
    }
  };
  const array_move = (arr, old_index, new_index) => {
    if (new_index >= arr.length) {
      var k = new_index - arr.length + 1;
      while (k--) {
        arr.push(undefined);
      }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    return arr;
  };
  const onSortEnd = ({oldIndex, newIndex}) => {
    let aranged_arr = array_move(props.images, oldIndex, newIndex);
    props.setImages(aranged_arr);
    props.setImageOrders(
      aranged_arr.map((item, index) => {
        return {
          id: item.id
            ? item.id
            : props.values.images.findIndex(
                (file) => file.preview == item.preview,
              ),
          order: index + 1,
        };
      }),
    );
  };
  return (
    <section className='container' style={{cursor: 'pointer', width: '100%'}}>
      <UploadModern
        uploadText={<IntlMessages id='common.DropzoneImages' />}
        dropzone={dropzone}
        isMinImagesValid={props.isMinImagesValid}
        isMaxImagesValid={props.isMaxImagesValid}
        error={error}
      />
      <SortableList
        axis={'xy'}
        items={props.images}
        onDeleteUploadFile={onDeleteUploadFile}
        onSortEnd={onSortEnd}
        useDragHandle
        // pressDelay={100}
      />
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
  values: PropTypes.object,
  setfieldvalue: PropTypes.func,
  images: PropTypes.array,
  setImages: PropTypes.func,
  isMinImagesValid: PropTypes.bool,
  setMinImagesValid: PropTypes.func,
  isMaxImagesValid: PropTypes.bool,
  setMaxImagesValid: PropTypes.func,
  setDeletedImages: PropTypes.func,
  isEdit: PropTypes.bool,
  imageOrders: PropTypes.array,
  setImageOrders: PropTypes.func,
};
