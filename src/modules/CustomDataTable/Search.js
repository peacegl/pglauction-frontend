import React from 'react';
import Grow from '@mui/material/Grow';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import ClearIcon from '@mui/icons-material/Clear';
import {withStyles} from 'tss-react/mui';
import PropTypes from 'prop-types';

const defaultStyles = (theme) => ({
  main: {
    display: 'flex',
    flex: '1 0 auto',
    alignItems: 'center',
  },
  searchIcon: {
    color: theme.palette.text.secondary,
    marginRight: '8px',
  },
  searchText: {
    flex: '0.8 0',
  },
  clearIcon: {
    '&:hover': {
      color: theme.palette.error.main,
    },
  },
});

class _Search extends React.Component {
  componentDidMount() {
    document.addEventListener('keyup', this.onKeyUp, false);
  }
  componentWillUnmount() {
    document.removeEventListener('keyup', this.onKeyUp, false);
  }
  onKeyUp(event) {
    if (event.keyCode === 27) {
      this.props.onHide();
    }
  }

  render() {
    const {
      classes,
      options,
      onHide,
      searchText,
      onEnter,
      onSearch,
      total = 0,
    } = this.props;

    const clearIconVisibility = options.searchAlwaysOpen ? 'hidden' : 'visible';
    return (
      <Grow appear in={true} timeout={0}>
        <div className={classes.main}>
          <SearchIcon className={classes.searchIcon} />
          <TextField
            variant={'standard'}
            className={classes.searchText}
            autoFocus={true}
            InputProps={{
              'data-test-id': options.textLabels.toolbar.search,
              'aria-label': options.textLabels.toolbar.search,
            }}
            defaultValue={searchText}
            onChange={(event) => {
              onSearch(event.target.value);
            }}
            onKeyUp={(event) => {
              if (event.keyCode === 13) {
                onEnter(event.target.value);
              }
            }}
            fullWidth={true}
            inputRef={(el) => (this.searchField = el)}
            placeholder={options.searchPlaceholder}
            {...(options.searchProps ? options.searchProps : {})}
          />
          <IconButton
            className={classes.clearIcon}
            style={{visibility: clearIconVisibility}}
            onClick={() => {
              onHide();
              onEnter('');
            }}
          >
            <ClearIcon />
          </IconButton>
          <Badge
            badgeContent={total}
            max={99999999}
            color='primary'
            sx={{ml: 7}}
          />
        </div>
      </Grow>
    );
  }
}
_Search.propTypes = {
  classes: PropTypes.object,
  options: PropTypes.object,
  onHide: PropTypes.func,
  onEnter: PropTypes.func,
  onSearch: PropTypes.func,
  searchText: PropTypes.string,
  total: PropTypes.integer,
};
export default withStyles(_Search, defaultStyles, {name: 'MUIDataTableSearch'});
