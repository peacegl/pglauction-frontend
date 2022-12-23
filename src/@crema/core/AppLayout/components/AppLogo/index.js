import {useThemeContext} from '@crema/utility/AppContextProvider/ThemeContextProvider';
import logoImage from 'assets/united_logo.png';
import PropTypes from 'prop-types';
import {Box} from '@mui/material';

const AppLogo = () => {
  const {theme} = useThemeContext();

  return (
    <Box
      sx={{
        height: {xs: 56, sm: 70},
        padding: 2.5,
        display: 'flex',
        flexDirection: 'row',
        cursor: 'pointer',
        alignItems: 'center',
        justifyContent: 'center',
        '& svg': {
          height: {xs: 30, sm: 40},
        },
      }}
      className='app-logo'
    >
      <Box
        component='img'
        sx={{
          width: '130px',
        }}
        alt='united logo'
        src={logoImage.src}
      />
    </Box>
  );
};

export default AppLogo;
AppLogo.propTypes = {
  color: PropTypes.string,
};
