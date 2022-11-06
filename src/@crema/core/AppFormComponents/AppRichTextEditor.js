import React from 'react';
import MUIRichTextEditor from 'mui-rte';
import PropTypes from 'prop-types';

const AppRichTextEditor = (props) => {
  const {showSave = false} = props;
  const controls = props.controls
    ? props.controls
    : [
        'title',
        'bold',
        'italic',
        'underline',
        'strikethrough',
        'highlight',
        'undo',
        'redo',
        'link',
        'media',
        'numberList',
        'bulletList',
        'quote',
        'code',
        'clear',
        showSave && 'save',
      ];
  return (
    <MUIRichTextEditor {...props} controls={controls} inlineToolbar={true} />
  );
};

export default AppRichTextEditor;

AppRichTextEditor.propTypes = {
  controls: PropTypes.array,
  showSave: PropTypes.bool,
};
