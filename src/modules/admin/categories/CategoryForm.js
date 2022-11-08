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

const CategoryForm = (props) => {
  const {messages} = useIntl();
  const [categoryLoading, setCategoryLoading] = useState(false);
  const [parentCategories, setParentCategories] = useState([]);
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
  const searchCategories = (content) => {
    fetchData(
      `/category/auto_complete`,
      content,
      setCategoryLoading,
      setParentCategories,
    );
  };
  useEffect(() => {
    if (props.values?.parent_id) {
      fetchData(
        `/category/auto_complete${
          props.values?.parent_id ? '?id=' + props.values?.parent_id : ''
        }`,
        {},
        setCategoryLoading,
        setParentCategories,
      );
    }
  }, [props.values?.parent_id]);

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
            dataLoading={categoryLoading}
            options={parentCategories}
            keyName='name'
            onSearch={searchCategories}
            value={props.values?.parent_id}
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

export default CategoryForm;
CategoryForm.propTypes = {
  values: PropTypes.object,
  setfieldvalue: PropTypes.func,
};
