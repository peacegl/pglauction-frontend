import CustomDataTable from 'components/CustomDataTable';
import IntlMessages from '@crema/utility/IntlMessages';

const WatchList = () => {
  return (
    <>
      {/* <CustomDataTable
        title={<IntlMessages id='common.myWatchlist' />}
        total={total}
        data={data}
        columns={tableColumns()}
        options={options}
        onAdd={onAdd}
        onEdit={onEdit}
        onDelete={onDelete}
        onFilterClick={() => setOpenFilter(true)}
        deleteTitle={<IntlMessages id='user.deleteMessage' />}
        isLoading={loading}
        selected={selected}
        onEnterSearch={onEnterSearch}
        onExactChange={(value) => setExactMatch(value)}
        showAddButton={false}
        showEditButton={user?.permissions?.includes(EDIT_USER)}
        showDeleteButton={user?.permissions?.includes(DELETE_USER)}
        selectableRows={
          user?.permissions?.includes(EDIT_USER) ||
          user?.permissions?.includes(DELETE_USER)
        }
      /> */}
    </>
  );
};

export default WatchList;
