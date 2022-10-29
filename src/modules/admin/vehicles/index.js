import {useEffect, useState} from 'react';
import {onGetVehicleData, onDeleteVehicles} from 'redux/actions';
import CustomDataTable from '../../CustomDataTable';
import {useDispatch, useSelector} from 'react-redux';
import VehicleConfigs from '../../../configs/pages/vehicles';
import VehicleModal from './VehicleModal';
import IntlMessages from '@crema/utility/IntlMessages';

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
    fetchData();
  }, [dispatch, page, per_page]);

  const fetchData = async () => {
    setIsLoading(true);
    await dispatch(
      onGetVehicleData({
        page: page + 1,
        per_page,
      }),
    );
    setIsLoading(false);
  };
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
    onRowSelectionChange: (
      currentRowsSelected,
      allRowsSelected,
      rowsSelected,
    ) => {
      setSelected(rowsSelected);
    },
  };
  const onAdd = () => {
    setOpenModal(true);
  };
  const onEdit = () => {};
  const onDelete = async () => {
    setIsLoading(true);
    await dispatch(onDeleteVehicles(selected.map((item) => data[item].id)));
    await fetchData();
    setSelected([]);
    setIsLoading(false);
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
        onEdit={onEdit}
        onDelete={onDelete}
        deleteTitle={<IntlMessages id='vehicle.deleteMessage' />}
        isLoading={isLoading}
        selected={selected}
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
