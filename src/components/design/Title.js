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
          fontSize: '30px',
          textAlign: 'center',
          fontWeight: '500',
          textTransform: 'capitalize',
        }}
      >
        {title}
        <Divider
          sx={{
            my: 4,
            mx: 5,
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
