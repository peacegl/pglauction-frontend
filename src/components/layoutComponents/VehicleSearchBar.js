import {alpha, styled} from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import {setVehicleSearch} from 'redux/actions';
import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import Box from '@mui/material/Box';
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
  placeholder = 'Search...',
  onEnter,
  onSearch,
  ...rest
}) {
  const [inputValue, setInputValue] = useState('');
  const {search = ''} = useSelector(({webVehicles}) => webVehicles);
  const dispatch = useDispatch();

  useEffect(() => {
    if (search == '') setInputValue('');
  }, [search]);

  // useEffect(() => {
  //   if (inputValue == '') dispatch(setVehicleSearch(''));
  // }, [inputValue]);

  return (
    <Box sx={{display: 'flex'}}>
      <Search
        sx={{
          width: {md: '40vw', lg: '35vw'},
          backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.05),
          borderColor: (theme) => alpha(theme.palette.primary.main, 0.2),
        }}
        {...rest}
      >
        <StyledInputBase
          value={inputValue}
          placeholder={placeholder}
          inputProps={{'aria-label': 'search'}}
          type='search'
          id='site-search'
          onChange={(e) => setInputValue(e.target.value)}
          onKeyUp={(event) => {
            if (event.key === 'Enter') {
              onEnter && onEnter(event.target.value);
            }
          }}
        />
        <SearchIconWrapper>
          <IconButton
            onClick={() => {
              onSearch && onSearch(inputValue);
            }}
          >
            <SearchIcon
              style={{color: (theme) => alpha(theme.palette.primary.main, 0.6)}}
            />
          </IconButton>
        </SearchIconWrapper>
      </Search>
    </Box>
  );
}

VehicleSearchBar.propTypes = {
  placeholder: PropTypes.string,
  onEnter: PropTypes.func,
  onSearch: PropTypes.func,
};
