import {ADD_SALE, DELETE_SALE, EDIT_SALE} from 'shared/constants/Permissions';
import CustomDataTable from 'components/CustomDataTable';
import IntlMessages from '@crema/utility/IntlMessages';
import {useDispatch, useSelector} from 'react-redux';
import {tableColumns} from 'configs/pages/sales';
import {useEffect, useState} from 'react';
import SaleModal from './SaleModal';
import PropTypes from 'prop-types';
import {
  onGetSaleList,
  onDeleteSales,
  getUserAutocompleteOptions,
} from 'redux/actions';

export default function SaleList({user}) {
  const [showSaleModal, setShowSaleModal] = useState(false);
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
    confirmFilters: true,
    onFilterDialogOpen: () => {
      dispatch(getUserAutocompleteOptions());
    },
    // callback that gets executed when filters are confirmed
    onFilterConfirm: (filterList) => {
      handleFilter(filterList);
    },
    onFilterChange: (column, filterList, type) => {
      if (type === 'chip') {
        handleFilter(filterList);
      }
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

  const handleFilter = (filterList) => {
    const filterData = {};
    filterData['login.salename'] = filterList[2][0]
      ? 'like@@' + filterList[2][0].trim()
      : undefined;
    filterData['sales.firstname'] = filterList[3][0]
      ? 'like@@' + filterList[3][0].trim()
      : undefined;
    filterData['sales.lastname'] = filterList[4][0]
      ? 'like@@' + filterList[4][0].trim()
      : undefined;
    filterData['sales.gender'] = filterList[7][0]
      ? 'exact@@' + filterList[7][0].toLowerCase()
      : undefined;
    filterData['login.status'] = filterList[9][0]
      ? 'exact@@' + filterList[9][0].toLowerCase()
      : undefined;
    filterData['login.type'] = filterList[10][0]
      ? 'exact@@' + filterList[10][0].toLowerCase()
      : undefined;
    filterData['sales.created_by'] = filterList[13].map((item) => item.id);
    filterData['sales.updated_by'] = filterList[15].map((item) => item.id);
    filterData['sales.created_at'] = {
      from: filterList[14][0],
      to: filterList[14][1],
    };
    filterData['sales.updated_at'] = {
      from: filterList[16][0],
      to: filterList[16][1],
    };
    setFilterData(filterData);
  };

  return (
    <>
      <CustomDataTable
        title={<IntlMessages id='sale.saleList' />}
        total={total}
        data={data}
        columns={tableColumns()}
        options={options}
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
      />
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
