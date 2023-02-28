import React, {useEffect, useState} from 'react';
import PermissionTable from './PermissionRolesTable';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import {onGetPermissionRoles} from 'redux/actions';
import {AppCard} from '@crema';
import {Box} from '@mui/system';
import {CardActions, Pagination} from '@mui/material';

const RolePermissions = ({id}) => {
  const dispatch = useDispatch();
  const {data = [], total = 0} = useSelector(
    ({permissions}) => permissions.permissionRoles,
  );
  const {loading} = useSelector(({common}) => common);
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(10);

  useEffect(() => {
    fetchData(id);
  }, [page]);

  const fetchData = async (id) => {
    await dispatch(
      onGetPermissionRoles(id, {
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
        <PermissionTable ticketSupportData={data} />
      ) : (
        <Box sx={{height: '350px'}}></Box>
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

export default RolePermissions;

RolePermissions.propTypes = {
  id: PropTypes.any,
};
