import {useEffect, useState} from 'react';
import {onGetVehicleData, onDeleteVehicles} from 'redux/actions';
import CustomDataTable from '../../CustomDataTable';
import {useDispatch, useSelector} from 'react-redux';
import VehicleConfigs from '../../../configs/pages/vehicles';
import VehicleModal from './VehicleModal';
import IntlMessages from '@crema/utility/IntlMessages';

const columns = VehicleConfigs().columns;

export default function VehicleList() {
  const [openModal, setOpenModal] = useState(false);
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [per_page, setPerPage] = useState(20);
  const [search, setSearch] = useState('');
  const [recordId, setRecordId] = useState(null);
  const {data = [], total = 0} = useSelector(
    ({vehicles}) => vehicles.vehiclesData,
  );
  const {loading} = useSelector(({common}) => common);
  const dispatch = useDispatch();
  useEffect(() => {
    fetchData(search);
  }, [dispatch, page, per_page]);

  const fetchData = async (search = '', filterData = {}) => {
    await dispatch(
      onGetVehicleData({
        page: page + 1,
        per_page,
        search,
        filterData,
      }),
    );
  };
  const options = {
    rowsPerPageOptions: [20, 50, 100, 500],
    count: total,
    rowsPerPage: per_page,
    page: page,
    serverSide: true,
    rowsSelected: selected,
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
    onSearchChange: (value) => {
      setSearch(value);
    },
  };
  const onAdd = () => {
    setOpenModal(true);
  };
  const onEdit = () => {
    setRecordId(data[selected[0]].id);
    setOpenModal(true);
  };
  const onDelete = async () => {
    await dispatch(
      onDeleteVehicles({
        vehicleIds: selected.map((item) => data[item].id),
        page: page + 1,
        per_page,
      }),
    );
    setSelected([]);
  };
  const onEnterSearch = (value) => {
    setPage(0);
    fetchData(value);
  };

  return (
    <>
      <CustomDataTable
        title='Vehicle List'
        total={total}
        data={data}
        columns={columns}
        options={options}
        onAdd={onAdd}
        onEdit={onEdit}
        onDelete={onDelete}
        deleteTitle={<IntlMessages id='vehicle.deleteMessage' />}
        isLoading={loading}
        selected={selected}
        onEnterSearch={onEnterSearch}
      />
      {openModal && (
        <VehicleModal
          open={openModal}
          toggleOpen={() => setOpenModal((d) => !d)}
          recordId={recordId}
        />
      )}
    </>
  );
}
