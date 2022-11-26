import {Avatar, Box, Divider, Typography} from '@mui/material';
import PropTypes from 'prop-types';

const SectionWIthIcon = (props) => {
  return (
    <Box sx={{flex: 1}}>
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
      <Typography component='h3' sx={{fontSize: 20, fontWeight: '500'}}>
        {props.title}
      </Typography>
      {props.details && (
        <Box sx={{m: 2, p: 3}}>
          <Typography variant='body1'>{props.details}</Typography>
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
  color: PropTypes.string,
  bgcolor: PropTypes.string,
};
