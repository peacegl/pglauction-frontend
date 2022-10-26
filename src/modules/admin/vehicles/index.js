import MUIDataTable from 'mui-datatables';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {onGetVehicleData} from 'redux/actions';
import Box from '@mui/material/Box';
import VehicleConfigs from '../../../configs/pages/vehicles';

export default function UserList() {
  const columns = VehicleConfigs().columns;

  // columns[0]['options'].customBodyRender = (value, tableMeta, updateValue) => (
  //   <Avatar alt={' profile picture.'} src={value} />
  // );
  console.log(columns);

  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [per_page, setPerPage] = useState(20);
  const vehiclesList = useSelector(({vehicles}) => vehicles.vehiclesList);
  const {data = [], total = 0} = vehiclesList;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      onGetVehicleData({
        page: page + 1,
        per_page,
      }),
    );
  }, [dispatch, page, per_page]);

  const options = {
    rowsPerPageOptions: [20, 50, 100, 500],
    count: total,
    rowsPerPage: per_page,
    page: page,
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
        title='Vehicle List'
        data={data}
        columns={columns}
        options={options}
      />
    </Box>
  );
}
