import AvatarViewWrapper from '../main/AvatarViewWrapper';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import {useDropzone} from 'react-dropzone';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import {alpha, Typography} from '@mui/material';
import PropTypes from 'prop-types';
import {useEffect, useState} from 'react';
import IntlMessages from '@crema/utility/IntlMessages';

const Profile = ({width, profileUrl, name, setfieldvalue}) => {
  const [error, setError] = useState(false);
  const {getRootProps, getInputProps} = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      if (acceptedFiles[0].size > 6291456) {
        setError(true);
      } else {
        profileUrl.current = URL.createObjectURL(acceptedFiles[0]);
        setfieldvalue(name, acceptedFiles[0]);
        setError(false);
      }
    },
  });

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box sx={{position: 'relative'}}>
        <AvatarViewWrapper {...getRootProps({className: 'dropzone'})}>
          <input {...getInputProps()} />
          <label htmlFor='icon-button-file'>
            <Avatar
              sx={{
                width: width ? width : {xs: 50, lg: 64},
                height: width ? width : {xs: 50, lg: 64},
                cursor: 'pointer',
              }}
              src={profileUrl.current}
            />
            <Box className='edit-icon'>
              <EditIcon />
            </Box>
          </label>
        </AvatarViewWrapper>
        {profileUrl.current && (
          <Box
            onClick={() => {
              setError(false);
              profileUrl.current = '';
              setfieldvalue(name, '');
            }}
            sx={{
              position: 'absolute',
              top: 0,
              right: 0,
              zIndex: 1,
              border: (theme) => `solid 2px ${theme.palette.background.paper}`,
              backgroundColor: (theme) => alpha(theme.palette.error.main, 0.7),
              color: (theme) => theme.palette.primary.contrastText,
              borderRadius: '50%',
              width: 22,
              height: 22,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.4s ease',
              cursor: 'pointer',
              '& .MuiSvgIcon-root': {
                fontSize: 16,
              },
            }}
          >
            <CloseIcon />
          </Box>
        )}
      </Box>
      {error && (
        <Typography sx={{mt: 1, color: (theme) => theme.palette.error.main}}>
          <IntlMessages id='common.maxFileSize' />
        </Typography>
      )}
    </Box>
  );
};

export default Profile;
Profile.propTypes = {
  setfieldvalue: PropTypes.func,
  name: PropTypes.string,
  width: PropTypes.object,
  profileUrl: PropTypes.any,
};
