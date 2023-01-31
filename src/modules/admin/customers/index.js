import {filterContent, tableColumns} from '../../../configs/pages/customers';
import {
  onGetCustomerList,
  onDeleteCustomers,
  onGetAllCustomers,
} from 'redux/actions';
import FilterModal from 'components/CustomModal/FilterModal';
import CustomDataTable from 'components/CustomDataTable';
import IntlMessages from '@crema/utility/IntlMessages';
import {useDispatch, useSelector} from 'react-redux';
import CustomerModal from './CustomerModal';
import {useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {
  ADD_CUSTOMER,
  EDIT_CUSTOMER,
  DELETE_CUSTOMER,
} from 'shared/constants/Permissions';
import AccountVerification from './AccountVerificationModal';
import DownloadModal from 'components/CustomModal/downloadModal';

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
  const customerTableRef = useRef();
  const [openDownload, setOpenDownload] = useState(false);
  const [exportType, setExportType] = useState('pdf');
  const [exportDataAmount, setExportDataAmount] = useState('current_page');
  const isExportDataEmpty = (objectName) => {
    return JSON.stringify(objectName) === '{}';
  };

  let data3;
  const exportData = useSelector(({customers}) => {
    data3 = customers.customersExportData.data;
    if (
      isExportDataEmpty(customers.customersExportData) ||
      exportDataAmount == 'current_page'
    ) {
      return [];
    } else {
      return customers.customersExportData.data;
    }
  });

  const fetchExportAllData = async (filteredData = {}) => {
    await dispatch(
      onGetAllCustomers({
        page: page + 1,
        per_page: -1,
        filterData: filteredData,
      }),
    );
  };
  // end of for exporting data

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
        }
        // for exporting data
        ref={customerTableRef}
        exportType={exportType}
        exportData={exportData.length == 0 ? data : exportData}
        onDownloadClick={() => {
          setOpenDownload(true);
        }}
        //end for exporting data
      />

      {/* for exporting data */}
      {openDownload && (
        <DownloadModal
          open={openDownload}
          toggleOpen={() => setOpenDownload((d) => !d)}
          title={<IntlMessages id='customer.download' />}
          onDownload={() => {
            if (openDownload && exportDataAmount == 'all') {
              fetchExportAllData();
            } else if (
              openDownload &&
              exportDataAmount == 'filtered_data' &&
              !isExportDataEmpty(filterData)
            ) {
              fetchExportAllData(filterData);
            }
            if (exportDataAmount == 'current_page') {
            }
          }}
          setExportType={setExportType}
          setExportDataAmount={setExportDataAmount}
          exportType={exportType}
          isLoading={loading}
          tableRef={customerTableRef}
          filterData={filterData}
          fetchExportAllData={fetchExportAllData}
          length={data3}
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
