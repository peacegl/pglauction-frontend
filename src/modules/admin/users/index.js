import MUIDataTable from 'mui-datatables';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {onGetUserList} from 'redux/actions';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import UserConfigs from '../../../configs/pages/users';

export default function UserList() {
  const columns = UserConfigs().columns;

  columns[0]['options'].customBodyRender = (value, tableMeta, updateValue) => (
    <Avatar alt={' profile picture.'} src={value} />
  );

  const [isLoading, setIsLoading] = useState(false);

  const {
    data = [],
    per_page = 20,
    total = 0,
  } = useSelector(({users}) => users.userList);
  const dispatch = useDispatch();
  useEffect(() => {
    setIsLoading(true);
    dispatch(onGetUserList()).then(() => setIsLoading(false));
  }, [dispatch]);

  const options = {
    rowsPerPageOptions: [20, 50, 100, 500],
    count: total,
    rowsPerPage: per_page,
    onTableChange: (action, tableState) => {
      if (action == 'changeRowsPerPage' || action == 'changePage') {
        setIsLoading(true);
        dispatch(
          onGetUserList(tableState.page + 1, tableState.rowsPerPage),
        ).then((res) => {
          setIsLoading(false);
        });
      }
    },
  };

  return (
    <Box>
      <MUIDataTable
        title='User List'
        data={data}
        columns={columns}
        options={options}
      />
    </Box>
  );
}
