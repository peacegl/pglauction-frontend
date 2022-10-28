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
  const [isLoading, setIsLoading] = useState(false);
  const {data = [], total = 0} = useSelector(
    ({vehicles}) => vehicles.vehiclesList,
  );

  const dispatch = useDispatch();
  useEffect(() => {
    setIsLoading(true);
    dispatch(
      onGetVehicleData({
        page: page + 1,
        per_page,
      }),
    ).then(() => {
      setIsLoading(false);
    });
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
        isLoading={isLoading}
      />
      {openModal && (
        <VehicleModal
          open={openModal}
          toggleOpen={() => setOpenModal((d) => !d)}
        />
      )}
    </>
  );
}
