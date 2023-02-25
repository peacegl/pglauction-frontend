import React, {useEffect} from 'react';
import TicketSupportTable from './user_roles_tables';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import {onGetUserRoles} from 'redux/actions';
import {AppCard} from '@crema';
import {Box} from '@mui/system';

const UserRoles = ({roleId}) => {
  const dispatch = useDispatch();
  const {data = [], total = 0} = useSelector(({roles}) => roles.userRoles);
  const {loading} = useSelector(({common}) => common);

  useEffect(() => {
    console.log(roleId);
    fetchData(roleId);
  }, []);

  const fetchData = async (roleId) => {
    await dispatch(
      onGetUserRoles({
        role_id: roleId,
      }),
    );
  };

  return (
    <AppCard contentStyle={{px: 0}}>
      {!loading ? (
        <TicketSupportTable ticketSupportData={data[0]?.users} />
      ) : (
        <Box></Box>
      )}
    </AppCard>
  );
};

export default UserRoles;

UserRoles.propTypes = {
  roleId: PropTypes.any,
};
