import {Avatar, Box, Divider, Typography} from '@mui/material';
import PropTypes from 'prop-types';

const SectionWIthIcon = (props) => {
  return (
    <Box sx={{width: {xs: '100%', sm: '50%', md: '30%'}, mt: 7}}>
      {!props.hideIcon && (
        <Avatar
          sx={{
            mx: 'auto',
            color: props.color,
            bgcolor: props.bgcolor,
            width: 90,
            height: 90,
            mb: 8,
          }}
        >
          {props.icon}
        </Avatar>
      )}
      <Typography
        component='h3'
        sx={{
          fontSize: {
            xs: '18px',
            md: '20px',
          },
          fontWeight: '500',
        }}
      >
        {props.title}
      </Typography>
      {props.details && (
        <Box sx={{m: 2, p: 3}}>
          <Typography variant='p'>{props.details}</Typography>
        </Box>
      )}
    </Box>
  );
};

export default SectionWIthIcon;
SectionWIthIcon.propTypes = {
  icon: PropTypes.any,
  title: PropTypes.any,
  details: PropTypes.any,
  color: PropTypes.any,
  bgcolor: PropTypes.any,
  hideIcon: PropTypes.bool,
};
