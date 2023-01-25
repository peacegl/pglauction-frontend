import {Box, Divider, Typography} from '@mui/material';
import PropTypes from 'prop-types';

const Title = ({title, justifyContent}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: justifyContent ? justifyContent : 'center',
      }}
    >
      <Typography
        component='h2'
        sx={{
          fontSize: {
            xs: '23px',
            sm: '25px',
            lg: '28px',
            xl: '30px',
          },
          textAlign: 'center',
          fontWeight: 'bold',
          textTransform: 'capitalize',
        }}
      >
        {title}
        <Divider
          sx={{
            my: 4,
            mx: 4,
            backgroundColor: (theme) => theme.palette.primary.main,
            borderRadius: 10,
            height: '4px',
          }}
        />
      </Typography>
    </Box>
  );
};

export default Title;
Title.propTypes = {
  title: PropTypes.any,
  justifyContent: PropTypes.any,
};
