import AppTextField from '@crema/core/AppFormComponents/AppTextField';
import IntlMessages from '@crema/utility/IntlMessages';
import {Box, Stack} from '@mui/material';
import {useIntl} from 'react-intl';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import AppAutocompleteField from '@crema/core/AppFormComponents/AppAutocompleteField';
import {convertToRaw, convertFromHTML, ContentState} from 'draft-js';
import {stateToHTML} from 'draft-js-export-html';
import React, {useEffect, useState} from 'react';
import jwtAxios from '@crema/services/auth/jwt-auth';
const AppRichTextEditor = dynamic(
  () => import('@crema/core/AppFormComponents/AppRichTextEditor'),
  {ssr: false},
);

const LocationForm = (props) => {
  const {messages} = useIntl();
  const [locationLoading, setLocationLoading] = useState(false);
  const [parentLocations, setParentLocations] = useState([]);
  const fetchData = async (url, content, loading, setData) => {
    try {
      loading(true);
      const res = await jwtAxios.get(url, {params: content});
      if (res.status === 200 && res.data.result) {
        setData(res.data.data);
      } else {
        setData([]);
      }
      loading(false);
    } catch (error) {
      setData([]);
      loading(false);
    }
  };
  const searchLocations = (content) => {
    fetchData(
      `/location/auto_complete`,
      content,
      setLocationLoading,
      setParentLocations,
    );
  };
  useEffect(() => {
    fetchData(
      `/location/auto_complete${
        props.values?.location_id ? '?id=' + props.values?.location_id : ''
      }`,
      '',
      setLocationLoading,
      setParentLocations,
    );
  }, [props.values?.location_id]);

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
          <AppTextField
            placeholder={messages['common.namePlaceholder']}
            label={<IntlMessages id='common.name' />}
            name='name'
            variant='outlined'
            size='small'
            sx={{flex: 1}}
          />
          <AppAutocompleteField
            placeholder={messages['common.parentNamePlaceholder']}
            label={<IntlMessages id='common.parentName' />}
            name='parent_id'
            variant='outlined'
            size='small'
            sx={{flex: 1, width: '100%'}}
            dataLoading={locationLoading}
            options={parentLocations}
            keyName='name'
            onSearch={searchLocations}
            value={props.values?.location_id}
            handleChange={({name, value}) => props.setfieldvalue(name, value)}
          />
        </Stack>
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

export default LocationForm;
LocationForm.propTypes = {
  values: PropTypes.object,
  setfieldvalue: PropTypes.func,
};
