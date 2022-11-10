import React from 'react';
import PropTypes from 'prop-types';
import {styled} from '@mui/material/styles';
import SimpleBarReact from 'simplebar-react';

const AppsContentContainer = styled(SimpleBarReact)(() => {
  return {
    width: '100%',
    paddingTop: 8,
    paddingBottom: 8,
    display: 'flex',
    flexDirection: 'column',
    '& .simplebar-content': {
      height: '100%',
    },
  };
});

const AppsContent = ({isDetailView, fullView, children, ...rest}) => {
  return <AppsContentContainer {...rest}>{children}</AppsContentContainer>;
};

export default AppsContent;

AppsContent.propTypes = {
  children: PropTypes.node,
  fullView: PropTypes.bool,
  isDetailView: PropTypes.bool,
};

AppsContent.defaultProps = {isDetailView: false};
