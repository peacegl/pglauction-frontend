import React, {useEffect, useState} from 'react';
import PermissionTable from './role_permissions_table';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import {onGetRolePermissions} from 'redux/actions';
import {AppCard} from '@crema';
import {Box} from '@mui/system';
import {CardActions, Pagination} from '@mui/material';

const PermissionRoles = ({roleId}) => {
  const dispatch = useDispatch();
  const {data = [], total = 0} = useSelector(
    ({roles}) => roles.PermissionRoles,
  );
  const {loading} = useSelector(({common}) => common);
  const [page, setPage] = useState(0);
  const perPage = 10;

  useEffect(() => {
    fetchData(roleId);
  }, [page]);

  const fetchData = async (roleId) => {
    await dispatch(
      onGetRolePermissions(roleId, {
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

export default PermissionRoles;

PermissionRoles.propTypes = {
  roleId: PropTypes.any,
};
