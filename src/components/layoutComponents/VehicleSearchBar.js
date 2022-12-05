import React, {useState} from 'react';
import {alpha, styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import {useTheme} from '@mui/material';
import PropTypes from 'prop-types';

const Search = styled('div')(({theme}) => ({
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  borderRadius: 30,
  border: '1px',
  borderStyle: 'solid',
  borderColor: 'primary',
  // marginLeft: 10,
  flexGrow: 1,
  width: 'auto',
  '& :first-of-type': {
    flexGrow: 1,
  },
  '.MuiInputBase-root': {
    width: '100%',
  },
}));

const SearchIconWrapper = styled('div')(({theme}) => ({
  padding: theme.spacing(0, 1),
  height: '100%',
  // position: 'absolute',
  // pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  // backgroundColor: 'black',
  // width: "100%"
}));

const StyledInputBase = styled(InputBase)(({theme}) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(0)})`,
    paddingRight: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
  },
}));

export default function VehicleSearchBar({
  searchQuery,
  placeholder = 'Search...',
  onChange,
  onEnter,
  onSearch,
  ...rest
}) {
  const theme = useTheme();
  const [search, setSearch] = useState('');
  return (
    <Box sx={{display: 'flex'}}>
      <Search
        sx={{
          width: {md: '40vw', lg: '35vw'},
          backgroundColor: alpha(theme.palette.primary.main, 0.05),
          borderColor: alpha(theme.palette.primary.main, 0.2),
        }}
        {...rest}
      >
        <StyledInputBase
          defaultValue={searchQuery}
          placeholder={placeholder}
          inputProps={{'aria-label': 'search'}}
          type='search'
          name='s'
          id='site-search'
          onChange={onChange}
          onKeyUp={(event) => {
            setSearch(event.target.value);
            if (event.keyCode === 13) {
              onEnter && onEnter(event.target.value);
            }
          }}
        />
        <SearchIconWrapper>
          <IconButton
            onClick={() => {
              onSearch && onSearch(search);
            }}
          >
            <SearchIcon
              style={{color: alpha(theme.palette.primary.main, 0.6)}}
            />
          </IconButton>
        </SearchIconWrapper>
      </Search>
    </Box>
  );
}

VehicleSearchBar.propTypes = {
  searchQuery: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  onEnter: PropTypes.func,
  onSearch: PropTypes.func,
};
