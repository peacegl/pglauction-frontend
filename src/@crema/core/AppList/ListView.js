import {useBottomScrollListener} from 'react-bottom-scroll-listener';
import AppAnimateGroup from '../AppAnimateGroup';
import {Box, useTheme} from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

const getEmptyContainer = (ListEmptyComponent) => {
  if (ListEmptyComponent) {
    return React.isValidElement(ListEmptyComponent) ? (
      ListEmptyComponent
    ) : (
      <ListEmptyComponent />
    );
  }
  return null;
};

const getFooterContainer = (ListFooterComponent) => {
  if (ListFooterComponent) {
    return React.isValidElement(ListFooterComponent) ? (
      ListFooterComponent
    ) : (
      <ListFooterComponent />
    );
  }
  return null;
};
const ListView = ({
  renderRow,
  onEndReached,
  data,
  animation,
  delay = 0,
  duration = 200,
  containerStyle,
  border,
  ListFooterComponent,
  ListEmptyComponent,
  perPage,
  loading,
  ...rest
}) => {
  const theme = useTheme();
  const borderStyle = {
    border: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.background.paper,
    borderRadius: 4,
    overflow: 'hidden',
  };

  if (!onEndReached) {
    onEndReached = () => {};
  }

  let style = containerStyle;
  if (border) {
    style = {...style, ...borderStyle};
  }
  useBottomScrollListener(onEndReached, 200);
  return (
    <AppAnimateGroup
      style={{...style}}
      {...rest}
      enter={{delay, duration, animation}}
    >
      <>
        {data.length > 0
          ? data.map((item, index) => (
              <Box key={index}>{renderRow(item, index)}</Box>
            ))
          : data.length === 0 && loading
          ? Array.from(new Array(perPage)).map((item, index) => (
              <Box key={index}>{renderRow(item, index)}</Box>
            ))
          : data.length === 0 &&
            !loading &&
            getEmptyContainer(ListEmptyComponent)}
        {getFooterContainer(ListFooterComponent)}
      </>
    </AppAnimateGroup>
  );
};

export default ListView;
ListView.propTypes = {
  border: PropTypes.bool,
  renderRow: PropTypes.func,
  delay: PropTypes.number,
  duration: PropTypes.number,
  animation: PropTypes.string,
  containerStyle: PropTypes.object,
  ListEmptyComponent: PropTypes.node,
  ListFooterComponent: PropTypes.node,
  data: PropTypes.array.isRequired,
  onEndReached: PropTypes.func,
  perPage: PropTypes.number,
  loading: PropTypes.bool,
};
ListView.defaultProps = {
  border: false,
  animation: 'transition.slideUpIn',
  data: [],
  onEndReached: () => {},
};
