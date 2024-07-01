import {filterContent, tableColumns} from 'configs/pages/vehicle-owners';
import DownloadModal from 'components/CustomModal/downloadModal';
import FilterModal from 'components/CustomModal/FilterModal';
import CustomDataTable from 'components/CustomDataTable';
import IntlMessages from '@crema/utility/IntlMessages';
import {useDispatch, useSelector} from 'react-redux';
import {getData, onViewColumnsChange} from 'configs';
import {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import jwtAxios from '@crema/services/auth/jwt-auth';


import {
  ADD_CUSTOMER,
  EDIT_CUSTOMER,
  DELETE_CUSTOMER,
} from 'shared/constants/Permissions';
import VehicleOwner from './VehicleOwnerModel';
import VehicleOwnerModel from './VehicleOwnerModel';
import { FETCH_ERROR, FETCH_START, SHOW_MESSAGE } from 'shared/constants/ActionTypes';
 

export default function VehicleOwnerList({user}) {
  const [openFilter, setOpenFilter] = useState(false);
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [per_page, setPerPage] = useState(20);
  const [filterData, setFilterData] = useState({}); 
  const [orderBy, setOrderBy] = useState({column: 'created_at', order: 'desc'});
  const [tableRecords, setTableRecords] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    fetchData();
  }, [ page, per_page, orderBy, filterData]);

  const fetchData = async (search = '', exactMatch = false) => {
    try {
      setLoading(true);
      const {data} = await jwtAxios.get('/owners', {
        params: {
          page: page + 1,
          per_page,
          search,
          exactMatch,
          filterData,
          orderBy,
        },
      });
      setTotal(data.total);
      setTableRecords(data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
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
    onColumnSortChange: (column, order) => {
      setOrderBy({column, order});
    },
  };
  const onAdd = () => {
    setRecordId(null);
    setOpenModal(true);
  };
  const onEdit = () => {
    
    setRecordId(tableRecords[selected[0]].id);
    setOpenModal(true);
  };
  const onDelete = async () => {
    console.log('onDeleteCustomers', selected);
    dispatch({type: FETCH_START});
    try {
    const ids=    selected.map((item) => tableRecords[item].id).join(',');
      const res = await jwtAxios.delete(`/owners/${ids}` );
        dispatch({
          type: SHOW_MESSAGE,
          payload: 'Owners Deleted successfully',
        });
        setSelected([]);
        fetchData();
    } catch (error) {
      dispatch({type: FETCH_ERROR, payload: error?.message});
    }
  };

  const onEnterSearch = (value, exactMatch) => {
    setPage(0);
    fetchData(value, exactMatch);
  };

  //  export data as pdf and Excel states
  const [exportData, setExportData] = useState([]);
  const [downloadColumns, setDownloadColumns] = useState([]);
  const [openDownload, setOpenDownload] = useState(false);
  const [exportType, setExportType] = useState('pdf');
  const [recordId, setRecordId] = useState(null);

  const [exportDataAmount, setExportDataAmount] = useState('current_page');
  const fetchExportAllData = async (filteredData = {}) => {
    await getData(
      `/owners`,
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
   

  return (
    <>
      <CustomDataTable
        title={<IntlMessages id='owner.ownerList' />}
        total={total}
        data={tableRecords}
        columns={tableColumns( )}
        options={options}
        onAdd={onAdd}
        onEdit={onEdit}
        onDelete={onDelete}
        onFilterClick={() => setOpenFilter(true)}
        deleteTitle={<IntlMessages id='user.deleteMessage' />}
        isLoading={loading}
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
          title={<IntlMessages id='owner.download' />}
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
          exportTitle={<IntlMessages id='owner.ownerList' />}
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
        <VehicleOwnerModel
          open={openModal}
          toggleOpen={() => setOpenModal((d) => !d)}
          recordId={recordId}
          tableRecords={tableRecords}
          setTableRecords={setTableRecords}
          edit={recordId ? true : false}
        />
      )}


      

      
    </>
  );
}

VehicleOwnerList.propTypes = {
  user: PropTypes.any,
};
