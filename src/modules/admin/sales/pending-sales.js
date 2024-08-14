import {ADD_SALE, DELETE_SALE, EDIT_SALE} from 'shared/constants/Permissions';
import {
  onGetSaleList,
  onDeleteSales,
  addRealTimeSale,
  updateRealTimeSale,
  addRealTimeSaleCount,
} from 'redux/actions';
import DownloadModal from 'components/CustomModal/downloadModal';
import {filterContent, tableColumns} from 'configs/pages/sales';
import FilterModal from 'components/CustomModal/FilterModal';
import CustomDataTable from 'components/CustomDataTable';
import IntlMessages from '@crema/utility/IntlMessages';
import {useDispatch, useSelector} from 'react-redux';
import {getData, onViewColumnsChange} from 'configs';
import {useEffect, useState} from 'react';
import SaleModal from './SaleModal';
import SingleSaleModal from './SingleSaleModal';
import PropTypes from 'prop-types';
import SaleStatusDialog from './SaleStatusDialog';
import { FETCH_ERROR } from 'shared/constants/ActionTypes';

 

export default function PendingSales({user}) {
  const [showSaleModal, setShowSaleModal] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [recordId, setRecordId] = useState(null);
  const [selected, setSelected] = useState([]);
  const [singleSale, setSingleSale] = useState([]);
  const [showSingleSaleModal, setShowSingleSaleModal] = useState(false);
  const [page, setPage] = useState(0);
  const [per_page, setPerPage] = useState(20);
  const [saleStatus, setSaleStatus] = useState(false);

  const [filterData, setFilterData] = useState({});
  const [orderBy, setOrderBy] = useState({column: 'created_at', order: 'desc'});
  const {data = [], total = 0} = useSelector(({sales}) => sales.saleList);
  const {loading} = useSelector(({common}) => common);
  const dispatch = useDispatch();

  //  export data as pdf and Excel states
  const [exportData, setExportData] = useState([]);
  const [downloadColumns, setDownloadColumns] = useState([]);
  const [openDownload, setOpenDownload] = useState(false);
  const [exportType, setExportType] = useState('pdf');
  const [exportDataAmount, setExportDataAmount] = useState('current_page');
  const fetchExportAllData = async (filteredData = {}) => {
    await getData(
      `/sales`,
      {
        page: 1,
        per_page: -1,
        filterData: filteredData,
        pendingSale:true,
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
    fetchData();
  }, [dispatch, page, per_page, orderBy, filterData]);

  const fetchData = async (search = '', exactMatch = false) => {
    await dispatch(
      onGetSaleList({
        page: page + 1,
        per_page,
        search,
        exactMatch,
        filterData,
        orderBy,
        pendingSale:true,
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

    onColumnSortChange: (column, order) => {
      setOrderBy({column, order});
    },
  };
  const onEdit = () => {
    setRecordId(data[selected[0]].id);
    setShowSaleModal(true);
  };
  const onAdd = () => {
    setRecordId(null);
    setShowSaleModal(true);
  };
  const onDelete = async () => {
    await dispatch(
      onDeleteSales({
        saleIds: selected.map((item) => data[item].id),
        page: page + 1,
        per_page,
        orderBy,
      }),
    );
    setSelected([]);
  };

  const onEnterSearch = (value, exactMatch) => {
    setPage(0);
    fetchData(value, exactMatch);
  };

  useEffect(() => {
     
    window.echo.private(`update.sale`).listen('Updated', (e) => {
      if (user.uid != e.authUser) {
        if (e.action === 'created') {
          newSaleRealTime(e.data);
        }
        if (e.action == 'updated') {
          updateSaleRealTime(e.data);
        }
        if (e.action == 'deleted') {
          fetchData();
        }
      }
    });
    return () => {
      const echoChannel = window.echo.private(`update.sale`);
      echoChannel.stopListening('Updated');
      window.echo.leave(`update.sale`);
    };
  }, []);

  const newSaleRealTime = async (data) => {
    if (page == 0) {
      await dispatch(addRealTimeSale(data));
    } else {
      await dispatch(addRealTimeSaleCount(data));
    }
  };

  const updateSaleRealTime = async (data) => {
    await dispatch(updateRealTimeSale(data));
  };

  const getSingleSale = (id) => {
    setSingleSale(data.filter((sale) => sale.id === id)[0]);
    setShowSingleSaleModal(true);
  };

  return (
    <>
      <CustomDataTable
        title={<IntlMessages id='sale.pendingSaleList' />}
        total={total}
        data={data}
        columns={tableColumns(getSingleSale,data)}
        options={options}
        onFilterClick={() => setOpenFilter(true)}
        onEdit={onEdit}
        onDelete={onDelete}
        deleteTitle={<IntlMessages id='sale.deleteMessage' />}
        isLoading={loading}
        selected={selected}
        onEnterSearch={onEnterSearch}
        onAdd={onAdd}
        showEditButton={user?.permissions?.includes(EDIT_SALE)}
        showDeleteButton={user?.permissions?.includes(DELETE_SALE)}
        selectableRows={
          user?.permissions?.includes(EDIT_SALE) ||
          user?.permissions?.includes(DELETE_SALE)
            ? 'multiple'
            : 'none'
        }
        onDownloadClick={() => {
          setOpenDownload(true);
        }}
        onChangeStatus={()=>{
          if(selected.length==0){
           dispatch({type: FETCH_ERROR, payload:"Please select at least one record"});
          return ;
          }
          setSaleStatus(true);
        }}
        showChangeStatus
      />
      {openFilter && (
        <FilterModal
          open={openFilter}
          toggleOpen={() => setOpenFilter((d) => !d)}
          initialData={filterData}
          updateFilterData={setFilterData}
          title='Sales Filter'
          content={filterContent}
        />
      )}

      {/* for exporting data */}
      {openDownload && (
        <DownloadModal
          open={openDownload}
          toggleOpen={() => setOpenDownload((d) => !d)}
          title={<IntlMessages id='sale.download' />}
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
          exportTitle={<IntlMessages id='sale.pendingSalesList' />}
        />
      )}
      {/*end of for exporting data */}

      {showSaleModal && (
        <SaleModal
          open={showSaleModal}
          toggleOpen={() => setShowSaleModal((d) => !d)}
          recordId={recordId}
          showVehicle
        />
      )}

      {showSingleSaleModal && (
        <SingleSaleModal
          open={showSingleSaleModal}
          toggleOpen={() => setShowSingleSaleModal((d) => !d)}
          singleSale={singleSale}
          width={450}
        />
      )}
      <SaleStatusDialog
      open={saleStatus}
      setOpenDialog={setSaleStatus}
      selectedIds={selected.map((item) => data[item].id)}
      setSelected={setSelected}
      fetchData={fetchData}
      ></SaleStatusDialog>
    </>
  );
}
PendingSales.propTypes = {
  user: PropTypes.any,
};
