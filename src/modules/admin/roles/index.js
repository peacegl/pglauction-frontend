import {ADD_ROLE, DELETE_ROLE, EDIT_ROLE} from 'shared/constants/Permissions';
import DownloadModal from 'components/CustomModal/downloadModal';
import {onGetRoleList, onDeleteRoles} from 'redux/actions';
import CustomDataTable from 'components/CustomDataTable';
import IntlMessages from '@crema/utility/IntlMessages';
import {useDispatch, useSelector} from 'react-redux';
import {getData, onViewColumnsChange} from 'configs';
import {tableColumns} from 'configs/pages/roles';
import {useEffect, useState} from 'react';
import RoleModal from './RoleModal';
import SingleRoleModal from './SingleRoleModal';
import PropTypes from 'prop-types';
import UserRolesModal from './UserRoles';
import RolePermissionModal from './RolePermission';

export default function RoleList({user}) {
  const [openModal, setOpenModal] = useState(false);
  const [recordId, setRecordId] = useState(null);
  const [selected, setSelected] = useState([]);
  const [singleRole, setSingleRole] = useState([]);
  const [showSingleRoleModal, setShowSingleRoleModal] = useState(false);
  const [showUserRoleModal, setShowUserRoleModal] = useState(false);
  const [showRolePermissionModal, setShowRolePermissionModal] = useState(false);

  const [roleId, setRoleId] = useState('');
  const [page, setPage] = useState(0);
  const [per_page, setPerPage] = useState(20);
  const [orderBy, setOrderBy] = useState({column: 'created_at', order: 'desc'});
  const {data = [], total = 0} = useSelector(({roles}) => roles.roleList);
  const filterData = useSelector(({roles}) => roles.filterData);
  const {loading} = useSelector(({common}) => common);
  const dispatch = useDispatch();
  useEffect(() => {
    fetchData();
  }, [dispatch, page, per_page, orderBy]);

  const fetchData = async (search = '', exactMatch = false) => {
    await dispatch(
      onGetRoleList({
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
      onDeleteRoles({
        roleIds: selected.map((item) => data[item].id),
        page: page + 1,
        per_page,
      }),
    );
    setSelected([]);
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
  const [exportDataAmount, setExportDataAmount] = useState('current_page');
  const fetchExportAllData = async (filteredData = {}) => {
    await getData(
      `/roles`,
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

  const getSingleRole = (id) => {
    setSingleRole(data.filter((sale) => sale.id === id)[0]);
    setShowSingleRoleModal(true);
  };

  const roleUsers = (id) => {
    setRoleId(id);
    setShowUserRoleModal(true);
  };

  const rolePermission = (id) => {
    setRoleId(id);
    setShowRolePermissionModal(true);
  };

  return (
    <>
      <CustomDataTable
        title={<IntlMessages id='role.roleList' />}
        total={total}
        data={data}
        columns={tableColumns(getSingleRole, roleUsers, rolePermission)}
        options={options}
        onAdd={onAdd}
        onEdit={onEdit}
        onDelete={onDelete}
        deleteTitle={<IntlMessages id='role.deleteMessage' />}
        isLoading={loading}
        selected={selected}
        onEnterSearch={onEnterSearch}
        showAddButton={user?.permissions?.includes(ADD_ROLE)}
        showEditButton={user?.permissions?.includes(EDIT_ROLE)}
        showDeleteButton={user?.permissions?.includes(DELETE_ROLE)}
        selectableRows={
          user?.permissions?.includes(EDIT_ROLE) ||
          user?.permissions?.includes(DELETE_ROLE)
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
          title={<IntlMessages id='role.roleDownload' />}
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
          exportTitle={<IntlMessages id='role.roleList' />}
        />
      )}
      {/*end of for exporting data */}
      {openModal && (
        <RoleModal
          open={openModal}
          toggleOpen={() => setOpenModal((d) => !d)}
          recordId={recordId}
          edit={recordId ? true : false}
        />
      )}

      {showSingleRoleModal && (
        <SingleRoleModal
          open={showSingleRoleModal}
          toggleOpen={() => setShowSingleRoleModal((d) => !d)}
          singleRole={singleRole}
          width={500}
        />
      )}

      {showUserRoleModal && (
        <UserRolesModal
          open={showUserRoleModal}
          toggleOpen={() => setShowUserRoleModal((d) => !d)}
          roleId={roleId}
        />
      )}

      {showRolePermissionModal && (
        <RolePermissionModal
          open={showRolePermissionModal}
          toggleOpen={() => setShowRolePermissionModal((d) => !d)}
          roleId={roleId}
        />
      )}
    </>
  );
}
RoleList.propTypes = {
  user: PropTypes.any,
};
