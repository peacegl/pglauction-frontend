import React, {useEffect, useState} from 'react';
import PermissionUsersTable from './permission_uesrs_table';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import {onGetPermissionUsers} from 'redux/actions';
import {AppCard} from '@crema';
import {Box} from '@mui/system';
import {CardActions, Pagination} from '@mui/material';

const PermissionUsers = ({id}) => {
  const dispatch = useDispatch();
  const {data = [], total = 0} = useSelector(
    ({permissions}) => permissions.permissionUsers,
  );
  const {loading} = useSelector(({common}) => common);
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(10);

  useEffect(() => {
    fetchData(id);
  }, []);

  const fetchData = async (id) => {
    await dispatch(
      onGetPermissionUsers(id, {
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
        <PermissionUsersTable ticketSupportData={data} />
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

export default PermissionUsers;

PermissionUsers.propTypes = {
  id: PropTypes.any,
};
