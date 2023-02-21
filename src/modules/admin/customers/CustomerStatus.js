import React from 'react';
import {Chip} from '@mui/material';
import {GoUnverified} from 'react-icons/go';
import {MdVerified} from 'react-icons/md';
import {BsPatchExclamationFill} from 'react-icons/bs';
import PropTypes from 'prop-types';

const CustomerStatus = ({value, id, setRecordId, setOpenVerifyModal}) => {
  return (
    <Chip
      label={value}
      onClick={(e) => {
        e.preventDefault();
        if (value == 'pending verification') {
          setRecordId(id);
          setOpenVerifyModal(true);
        }
      }}
      color={
        value == 'verified'
          ? 'success'
          : value == 'pending verification'
          ? 'primary'
          : 'default'
      }
      variant='outlined'
      size='small'
      icon={
        value == 'verified' ? (
          <MdVerified style={{fontSize: '14px'}} />
        ) : value == 'pending verification' ? (
          <BsPatchExclamationFill style={{fontSize: '14px'}} />
        ) : (
          <GoUnverified style={{fontSize: '14px'}} />
        )
      }
    />
  );
};

export default CustomerStatus;

CustomerStatus.propTypes = {
  value: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  setRecordId: PropTypes.func.isRequired,
  setOpenVerifyModal: PropTypes.func.isRequired,
};
