import {useThemeContext} from '@crema/utility/AppContextProvider/ThemeContextProvider';
import PropTypes from 'prop-types';
import {Box} from '@mui/material';
import {useRouter} from 'next/router';
import { siteSettings } from 'configs/site_settings';

const AppLogo = () => {
  const {theme} = useThemeContext();
  const router = useRouter();

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
        onClick={() => router.push('/')}
        component='img'
        sx={{
          width: '130px',
        }}
        alt='united logo'
        src={siteSettings('logo')}
      />
    </Box>
  );
};

export default AppLogo;
AppLogo.propTypes = {
  color: PropTypes.string,
};
