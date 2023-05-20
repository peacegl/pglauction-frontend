import React from 'react';
import Grow from '@mui/material/Grow';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import ClearIcon from '@mui/icons-material/Clear';
import {withStyles} from 'tss-react/mui';
import {Checkbox, FormControlLabel} from '@mui/material';
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

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      exact: false,
    };
  }
  componentDidMount() {
    document.addEventListener('keydown', this.onKeyDown, false);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeyDown, false);
  }
  onKeyDown(event) {
    if (event.keyCode == 27) {
      this.props.onHide();
    }
  }

  onExactChange(exactMatch) {
    this.setState({exact: exactMatch});
  }

  render() {
    const {
      classes,
      options,
      onHide,
      searchText,
      onEnter,
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
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                onEnter(event.target.value, this.state.exact);
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
              onEnter('', this.state.exact);
            }}
          >
            <ClearIcon />
          </IconButton>
          <FormControlLabel
            control={
              <Checkbox
                size='small'
                color='primary'
                onChange={(event) => this.onExactChange(event.target.checked)}
              />
            }
            label='Exact Match'
          />
          <Badge
            showZero
            badgeContent={total}
            max={99999999}
            color='primary'
            sx={{ml: 2}}
          />
        </div>
      </Grow>
    );
  }
}

Search.propTypes = {
  classes: PropTypes.object,
  options: PropTypes.object,
  onHide: PropTypes.func,
  onEnter: PropTypes.func,
  onSearch: PropTypes.func,
  searchText: PropTypes.string,
  total: PropTypes.number,
  onExactChange: PropTypes.func,
};
export default withStyles(Search, defaultStyles, {
  name: 'MUIDataTableSearch',
});
