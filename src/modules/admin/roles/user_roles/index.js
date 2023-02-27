import React, {useEffect, useState} from 'react';
import TicketSupportTable from './user_roles_tables';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import {onGetUserRoles} from 'redux/actions';
import {AppCard} from '@crema';
import {Box} from '@mui/system';
import {CardActions, Pagination} from '@mui/material';

const UserRoles = ({roleId}) => {
  const dispatch = useDispatch();
  const {data = [], total = 0} = useSelector(({roles}) => roles.userRoles);
  const {loading} = useSelector(({common}) => common);
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(10);

  useEffect(() => {
    fetchData(roleId);
  }, []);

  const fetchData = async (roleId) => {
    await dispatch(
      onGetUserRoles(roleId, {
        per_page: perPage,
        page: page + 1,
      }),
    );
  };

  const onPageChange2 = (event, value) => {
    setPage(value - 1);
  };

  return (
    <AppCard
      contentStyle={{
        px: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {!loading ? (
        <TicketSupportTable ticketSupportData={data} />
      ) : (
        <Box sx={{height: '500px'}}></Box>
      )}
      <CardActions>
        <Pagination
          count={Math.ceil(total / perPage)}
          page={page + 1}
          onChange={onPageChange2}
          color='primary'
        />
      </CardActions>
    </AppCard>
  );
};

export default UserRoles;

UserRoles.propTypes = {
  roleId: PropTypes.any,
};
