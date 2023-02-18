import {filterContent, tableColumns} from 'configs/pages/customers';
import {
  onGetCustomerList,
  onDeleteCustomers,
  addRealTimeCustomer,
  updateRealTimeCustomer,
} from 'redux/actions';
import DownloadModal from 'components/CustomModal/downloadModal';
import FilterModal from 'components/CustomModal/FilterModal';
import AccountVerification from './AccountVerificationModal';
import CustomDataTable from 'components/CustomDataTable';
import IntlMessages from '@crema/utility/IntlMessages';
import {useDispatch, useSelector} from 'react-redux';
import {getData, onViewColumnsChange} from 'configs';
import CustomerModal from './CustomerModal';
import {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {
  ADD_CUSTOMER,
  EDIT_CUSTOMER,
  DELETE_CUSTOMER,
} from 'shared/constants/Permissions';
import EchoConfig from 'plugins/echo';

export default function CustomerList({user}) {
  const [openModal, setOpenModal] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [recordId, setRecordId] = useState(null);
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [per_page, setPerPage] = useState(20);
  const [search, setSearch] = useState('');
  const [exactMatch, setExactMatch] = useState(false);
  const [filterData, setFilterData] = useState({});
  const [openVerifyModal, setOpenVerifyModal] = useState(false);
  const [orderBy, setOrderBy] = useState({column: 'created_at', order: 'desc'});
  const {data = [], total = 0} = useSelector(
    ({customers}) => customers.customerData,
  );
  const {loading} = useSelector(({common}) => common);
  const dispatch = useDispatch();
  useEffect(() => {
    fetchData(search);
  }, [dispatch, page, per_page, orderBy, filterData]);

  const fetchData = async (search = '') => {
    await dispatch(
      onGetCustomerList({
        page: page + 1,
        per_page,
        search,
        exactMatch,
        filterData,
        orderBy,
      }),
    );
  };

  const options = {
    count: total,
    rowsPerPage: per_page,
    onViewColumnsChange: (changedColumn, action) => {
      onViewColumnsChange(
        changedColumn,
        action,
        setDownloadColumns,
        downloadColumns,
        tableColumns(),
      );
    },
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
    onColumnSortChange: (column, order) => {
      setOrderBy({column, order});
    },
  };
  const onAdd = () => {
    setRecordId(null);
    setOpenModal(true);
  };
  const onEdit = () => {
    setRecordId(data[selected[0]].id);
    setOpenModal(true);
  };
  const onDelete = async () => {
    await dispatch(
      onDeleteCustomers({
        customerIds: selected.map((item) => data[item].id),
        page: page + 1,
        per_page,
        orderBy,
      }),
    );
    setSelected([]);
  };

  const onEnterSearch = (value) => {
    setPage(0);
    fetchData(value);
  };

  //  export data as pdf and Excel states
  const [exportData, setExportData] = useState([]);
  const [downloadColumns, setDownloadColumns] = useState([]);
  const [openDownload, setOpenDownload] = useState(false);
  const [exportType, setExportType] = useState('pdf');
  const [exportDataAmount, setExportDataAmount] = useState('current_page');
  const fetchExportAllData = async (filteredData = {}) => {
    await getData(
      `/customers`,
      {
        page: 1,
        per_page: -1,
        filterData: filteredData,
      },
      () => {},
      setExportData,
    );
  };
  useEffect(() => {
    setDownloadColumns(tableColumns());
  }, []);
  // end of for exporting data

  useEffect(() => {
    EchoConfig();
    window.Echo.private(`update.customer`).listen('Updated', (e) => {
      if (user.uid != e.authUser) {
        if (e.action === 'created') {
          newCustomerAddRealTime(e.data);
        }
        if (e.action == 'updated') {
          updateCustomerRealTime(e.data);
        }
        if (e.action == 'deleted') {
          fetchData();
        }
      }
    });
    return () => {
      const echoChannel = window.Echo.private(`update.customer`);
      echoChannel.stopListening('Updated');
      Echo.leave(`update.customer`);
      console.log('clean up...');
    };
  }, []);

  const newCustomerAddRealTime = async (data) => {
    await dispatch(addRealTimeCustomer(data));
  };

  const updateCustomerRealTime = async (data) => {
    await dispatch(updateRealTimeCustomer(data));
  };

  return (
    <>
      <CustomDataTable
        title={<IntlMessages id='customer.customerList' />}
        total={total}
        data={data}
        columns={tableColumns(setRecordId, setOpenVerifyModal)}
        options={options}
        onAdd={onAdd}
        onEdit={onEdit}
        onDelete={onDelete}
        onFilterClick={() => setOpenFilter(true)}
        deleteTitle={<IntlMessages id='user.deleteMessage' />}
        isLoading={loading}
        onExactChange={(value) => setExactMatch(value)}
        selected={selected}
        onEnterSearch={onEnterSearch}
        showAddButton={user?.permissions?.includes(ADD_CUSTOMER)}
        showEditButton={user?.permissions?.includes(EDIT_CUSTOMER)}
        showDeleteButton={user?.permissions?.includes(DELETE_CUSTOMER)}
        selectableRows={
          user?.permissions?.includes(EDIT_CUSTOMER) ||
          user?.permissions?.includes(DELETE_CUSTOMER)
            ? 'multiple'
            : 'none'
        }
        onDownloadClick={() => {
          setOpenDownload(true);
        }}
      />

      {/* for exporting data */}
      {openDownload && (
        <DownloadModal
          open={openDownload}
          toggleOpen={() => setOpenDownload((d) => !d)}
          title={<IntlMessages id='customer.download' />}
          onDownloadData={async () => {
            if (exportDataAmount == 'all') {
              await fetchExportAllData();
            } else if (exportDataAmount == 'filtered_data') {
              await fetchExportAllData(filterData);
            }
          }}
          setExportType={setExportType}
          setExportDataAmount={setExportDataAmount}
          exportType={exportType}
          filterData={filterData}
          columns={downloadColumns}
          exportData={exportDataAmount == 'current_page' ? data : exportData}
          exportTitle={<IntlMessages id='customer.customerList' />}
        />
      )}
      {/*end of for exporting data */}

      {openFilter && (
        <FilterModal
          open={openFilter}
          toggleOpen={() => setOpenFilter((d) => !d)}
          initialData={filterData}
          updateFilterData={setFilterData}
          title='Customers Filter'
          content={filterContent}
        />
      )}
      {openModal && (
        <CustomerModal
          open={openModal}
          toggleOpen={() => setOpenModal((d) => !d)}
          recordId={recordId}
          edit={recordId ? true : false}
        />
      )}
      {openVerifyModal && (
        <AccountVerification
          open={openVerifyModal}
          toggleOpen={() => setOpenVerifyModal((d) => !d)}
          recordId={recordId}
        />
      )}
    </>
  );
}
CustomerList.propTypes = {
  user: PropTypes.any,
};
