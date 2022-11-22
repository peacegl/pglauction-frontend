import {convertToRaw, convertFromHTML, ContentState} from 'draft-js';
import IntlMessages from '@crema/utility/IntlMessages';
import {stateToHTML} from 'draft-js-export-html';
import {Box, Stack} from '@mui/material';
import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';
const AppRichTextEditor = dynamic(
  () => import('@crema/core/AppFormComponents/AppRichTextEditor'),
  {ssr: false},
);

const VehicleStepThree = (props) => {
  const convertToDraftJS = (htmlContent) => {
    // 1. Convert the HTML
    const contentHTML = convertFromHTML(htmlContent ?? '');
    // 2. Create the ContentState object
    const state = ContentState.createFromBlockArray(
      contentHTML.contentBlocks,
      contentHTML.entityMap,
    );
    // 3. Stringify `state` object from a Draft.Model.Encoding.RawDraftContentState object
    return JSON.stringify(convertToRaw(state));
  };
  const onEditorChange = (event) => {
    const rteContent = stateToHTML(event.getCurrentContent()); // for rte content with text formating
    props.values.description = rteContent; // store your rteContent to state
    // stateToHTML
  };
  return (
    <Box>
      <Stack spacing={{xs: 5, md: 8}}>
        <Stack direction={{xs: 'column', md: 'row'}} spacing={5}>
          <div className='editorContainer' style={{paddingLeft: 15}}>
            <AppRichTextEditor
              onChange={onEditorChange}
              defaultValue={convertToDraftJS(props.values?.description)}
              label={<IntlMessages id={'common.descriptionPlaceholder'} />}
            />
          </div>
        </Stack>
      </Stack>
    </Box>
  );
};

export default VehicleStepThree;

VehicleStepThree.propTypes = {
  values: PropTypes.object,
  setfieldvalue: PropTypes.func,
};
