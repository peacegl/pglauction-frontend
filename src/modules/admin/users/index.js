import MUIDataTable from 'mui-datatables';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {onGetUserList} from 'redux/actions';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import UserConfigs from '../../../configs/pages/users';

export default function userList() {
  const columns = UserConfigs().columns;

  columns[0]['options'].customBodyRender = (value, tableMeta, updateValue) => (
    <Avatar alt={' profile picture.'} src={value} />
  );

  const [selected, setSelected] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [per_page, setPerPage] = useState(20);
  const {data = [], total = 0} = useSelector(({users}) => users.userList);
  const dispatch = useDispatch();
  useEffect(() => {
    setIsLoading(true);
    dispatch(
      onGetUserList({
        page: page + 1,
        per_page,
      }),
    ).then(() => setIsLoading(false));
  }, [dispatch, page, per_page]);

  const options = {
    rowsPerPageOptions: [20, 50, 100, 500],
    count: total,
    rowsPerPage: per_page,
    serverSide: true,
    onTableChange: (action, tableState) => {
      switch (action) {
        case 'changePage':
          setPage(tableState.page);
          break;
        case 'changeRowsPerPage':
          setPerPage(tableState.rowsPerPage);
          break;
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
