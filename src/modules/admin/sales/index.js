import {ADD_SALE, DELETE_SALE, EDIT_SALE} from 'shared/constants/Permissions';
import {filterContent, tableColumns} from 'configs/pages/sales';
import FilterModal from 'components/CustomModal/FilterModal';
import {onGetSaleList, onDeleteSales, onGetAllSales} from 'redux/actions';
import CustomDataTable from 'components/CustomDataTable';
import IntlMessages from '@crema/utility/IntlMessages';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect, useRef, useState} from 'react';
import SaleModal from './SaleModal';
import PropTypes from 'prop-types';
import DownloadModal from 'components/CustomModal/downloadModal';

export default function SaleList({user}) {
  const [showSaleModal, setShowSaleModal] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [recordId, setRecordId] = useState(null);
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [per_page, setPerPage] = useState(20);
  const [search, setSearch] = useState('');
  const [exactMatch, setExactMatch] = useState(false);
  const [filterData, setFilterData] = useState({});
  const [orderBy, setOrderBy] = useState({column: 'created_at', order: 'desc'});
  const {data = [], total = 0} = useSelector(({sales}) => sales.saleList);
  const {loading} = useSelector(({common}) => common);
  const dispatch = useDispatch();

  //  export data as pdf and Excel states
  const salesTableRef = useRef();
  const [openDownload, setOpenDownload] = useState(false);
  const [exportType, setExportType] = useState('pdf');
  const [exportDataAmount, setExportDataAmount] = useState('current_page');
  const isExportDataEmpty = (objectName) => {
    return JSON.stringify(objectName) === '{}';
  };

  let data3;
  const exportData = useSelector(({sales}) => {
    data3 = sales.salesExportData.data;
    if (
      isExportDataEmpty(sales.salesExportData) ||
      exportDataAmount == 'current_page'
    ) {
      return [];
    } else {
      return sales.salesExportData.data;
    }
  });
  const fetchExportAllData = async (filteredData = {}) => {
    await dispatch(
      onGetAllSales({
        page: page + 1,
        per_page: -1,
        filterData: filteredData,
      }),
    );
  };
  // end of for exporting data

  useEffect(() => {
    fetchData(search);
  }, [dispatch, page, per_page, orderBy, filterData]);

  const fetchData = async (search = '') => {
    await dispatch(
      onGetSaleList({
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

  const onEnterSearch = (value) => {
    setPage(0);
    fetchData(value);
  };

  return (
    <>
      <CustomDataTable
        title={<IntlMessages id='sale.saleList' />}
        total={total}
        data={data}
        columns={tableColumns()}
        options={options}
        onFilterClick={() => setOpenFilter(true)}
        onEdit={onEdit}
        onDelete={onDelete}
        deleteTitle={<IntlMessages id='sale.deleteMessage' />}
        isLoading={loading}
        selected={selected}
        onEnterSearch={onEnterSearch}
        onExactChange={(value) => setExactMatch(value)}
        onAdd={onAdd}
        showAddButton={user?.permissions?.includes(ADD_SALE)}
        showEditButton={user?.permissions?.includes(EDIT_SALE)}
        showDeleteButton={user?.permissions?.includes(DELETE_SALE)}
        selectableRows={
          user?.permissions?.includes(EDIT_SALE) ||
          user?.permissions?.includes(DELETE_SALE)
        }
        // for exporting data
        ref={salesTableRef}
        exportType={exportType}
        exportData={exportData.length == 0 ? data : exportData}
        onDownloadClick={() => {
          setOpenDownload(true);
        }}
        //end for exporting data
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
          tableRef={salesTableRef}
          filterData={filterData}
          fetchExportAllData={fetchExportAllData}
          length={data3}
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
    </>
  );
}
SaleList.propTypes = {
  user: PropTypes.any,
};
