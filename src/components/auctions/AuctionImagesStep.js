import MultipleImageDropzone from '../dropzone/MultipleImageDropzone';
import SingleImageDropzone from '../dropzone/SingleImageDropzone';
import IntlMessages from '@crema/utility/IntlMessages';
import {Box, Stack} from '@mui/material';
import PropTypes from 'prop-types';

const AuctionImagesStep = (props) => {
  return (
    <Box>
      <Stack spacing={{xs: 5, md: 8}}>
        <Stack
          direction={{xs: 'column', md: 'row'}}
          spacing={5}
          sx={{mx: 'auto'}}
        >
          <SingleImageDropzone
            errorMessage={<IntlMessages id='auction.mainImageRequired' />}
            text={<IntlMessages id='auction.mainImage' />}
            width={{xs: 150, lg: 220}}
            image={props.mainImage}
            name='main_image'
            setfieldvalue={props.setfieldvalue}
            setImage={props.setMainImage}
            setIsImageValid={props.setIsMainImageValid}
            isImageValid={props.isMainImageValid}
            deleteImage={(id) =>
              props.setDeletedImages((d) => (id ? [id, ...d] : d))
            }
          />
        </Stack>
        <Stack direction={{xs: 'column', md: 'row'}} spacing={5}>
          <MultipleImageDropzone
            setfieldvalue={props.setfieldvalue}
            isMinImagesValid={props.isMinImagesValid}
            setMinImagesValid={props.setMinImagesValid}
            setMaxImagesValid={props.setMaxImagesValid}
            isMaxImagesValid={props.isMaxImagesValid}
            images={props.images}
            setImages={props.setImages}
            setDeletedImages={props.setDeletedImages}
            isEdit={props.isEdit}
          />
        </Stack>
      </Stack>
    </Box>
  );
};

export default AuctionImagesStep;

AuctionImagesStep.propTypes = {
  values: PropTypes.object,
  setfieldvalue: PropTypes.func,
  isMinImagesValid: PropTypes.bool,
  setMinImagesValid: PropTypes.func,
  isMaxImagesValid: PropTypes.bool,
  setMaxImagesValid: PropTypes.func,
  images: PropTypes.array,
  setImages: PropTypes.func,
  mainImage: PropTypes.object,
  setMainImage: PropTypes.func,
  setIsMainImageValid: PropTypes.func,
  isMainImageValid: PropTypes.bool,
  setDeletedImages: PropTypes.func,
  isEdit: PropTypes.bool,
};
