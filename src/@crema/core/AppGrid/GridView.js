import {useThemeContext} from '../../utility/AppContextProvider/ThemeContextProvider';
import {useBottomScrollListener} from 'react-bottom-scroll-listener';
import {useWidth} from '../../utility/helper/Utils';
import React, {useEffect, useState} from 'react';
import AppAnimateGroup from '../AppAnimateGroup';
import PropTypes from 'prop-types';
import {Box} from '@mui/material';

const getEmptyContainer = (ListEmptyComponent, displayColumn, itemPadding) => {
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

const GridView = ({
  sx,
  column,
  responsive,
  itemPadding,
  animation,
  renderRow,
  onEndReached,
  data,
  containerStyle,
  border,
  ListFooterComponent,
  ListEmptyComponent,
  perPage,
  loading,
}) => {
  const {theme} = useThemeContext();

  const width = useWidth();
  const borderStyle = {
    border: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.background.paper,
    borderRadius: 4,
    overflow: 'hidden',
  };

  const [displayColumn, setColumn] = useState(column);
  if (!onEndReached) {
    onEndReached = () => {};
  }

  useEffect(() => {
    setColumn(column);
  }, [column]);

  useEffect(() => {
    const getColumnCount = () => {
      if (responsive) {
        if (width === 'xs') {
          return responsive.xs || column;
        } else if (width === 'sm') {
          return responsive.sm || responsive.xs || column;
        } else if (width === 'md') {
          return responsive.md || responsive.sm || responsive.xs || column;
        } else if (width === 'lg') {
          return (
            responsive.lg ||
            responsive.md ||
            responsive.sm ||
            responsive.xs ||
            column
          );
        } else if (width === 'xl') {
          return (
            responsive.xl ||
            responsive.lg ||
            responsive.md ||
            responsive.sm ||
            responsive.xs ||
            column
          );
        }
      } else {
        return column;
      }
    };
    setColumn(getColumnCount());
  }, [width, column, responsive]);

  let style = containerStyle;
  if (border) {
    style = {...style, ...borderStyle};
  }
  useBottomScrollListener(onEndReached, 200);
  return (
    <Box
      sx={{
        width: '100%',
        ...sx,
      }}
    >
      <AppAnimateGroup
        enter={{
          animation,
        }}
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          margin: -itemPadding,
          ...style,
        }}
      >
        <>
          {data.length > 0 &&
            data.map((item, index) => (
              <Box
                style={{
                  flexGrow: 0,
                  maxWidth: `${100 / displayColumn}%`,
                  flexBasis: `${100 / displayColumn}%`,
                  padding: itemPadding,
                  boxSizing: 'border-box',
                }}
                key={'grid-' + index}
              >
                {renderRow(item, index)}
              </Box>
            ))}
          {data.length === 0 && loading
            ? Array.from(new Array(perPage)).map((item, index) => (
                <Box
                  style={{
                    flexGrow: 0,
                    maxWidth: `${100 / displayColumn}%`,
                    flexBasis: `${100 / displayColumn}%`,
                    padding: itemPadding,
                    boxSizing: 'border-box',
                  }}
                  key={'grid-' + index}
                >
                  {renderRow(item, index)}
                </Box>
              ))
            : !loading ??
              getEmptyContainer(ListEmptyComponent, displayColumn, itemPadding)}
        </>
      </AppAnimateGroup>
      {getFooterContainer(ListFooterComponent)}
    </Box>
  );
};

export default GridView;
GridView.propTypes = {
  sx: PropTypes.object,
  theme: PropTypes.object,
  width: PropTypes.string,
  responsive: PropTypes.object,
  itemPadding: PropTypes.number,
  renderRow: PropTypes.func,
  border: PropTypes.bool,
  column: PropTypes.number,
  animation: PropTypes.string,
  containerStyle: PropTypes.object,
  ListEmptyComponent: PropTypes.node,
  ListFooterComponent: PropTypes.node,
  data: PropTypes.array.isRequired,
  onEndReached: PropTypes.func,
  perPage: PropTypes.number,
  loading: PropTypes.bool,
};
GridView.defaultProps = {
  border: false,
  data: [],
  column: 5,
  animation: 'transition.expandIn',
  itemPadding: 12,
  // responsive: {
  //   xs: 1,
  //   sm: 2,
  //   md: 2,
  //   lg: 4,
  //   xl: 4,
  // },
};
