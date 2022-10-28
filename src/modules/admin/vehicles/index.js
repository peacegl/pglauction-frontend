import {useEffect, useState} from 'react';
import {onGetVehicleData} from 'redux/actions';
import CustomDataTable from '../../CustomDataTable';
import {useDispatch, useSelector} from 'react-redux';
import VehicleConfigs from '../../../configs/pages/vehicles';
import VehicleModal from './VehicleModal';
const columns = VehicleConfigs().columns;

export default function UserList() {
  const [openModal, setOpenModal] = useState(false);
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
    onChangeRowsPerPage: (numberOfRows) => {
      setPerPage(numberOfRows);
      setPage(0);
    },
    onChangePage: (page) => setPage(page),
  };
  const onAdd = () => {
    setOpenModal(true);
  };
  return (
    <>
      <CustomDataTable
        title='Vehicles List'
        total={total}
        data={data}
        columns={columns}
        options={options}
        onAdd={onAdd}
      />
      {openModal && (
        <VehicleModal
          open={openModal}
          toggleOpen={() => setOpenModal((d) => !d)}
          // hideBackdrop
        />
      )}
    </>
  );
}
