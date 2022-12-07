import PropTypes from 'prop-types';
import AddTooltip from './AddTooltip';
import MUIDataTable from 'mui-datatables';
import {Badge, Box, Button, Typography} from '@mui/material';
import AppLoader from '@crema/core/AppLoader';
import Toolbar from './Toolbar';
import Search from './Search';

const CustomDataTable = ({
  title,
  total,
  data,
  columns,
  options,
  hideAddButton,
  onAdd,
  onEdit,
  onDelete,
  deleteTitle,
  isLoading,
  selected,
  onEnterSearch,
  onExactChange,
  onSell,
  showSell = false,
  selectedItems = [],
}) => {
  return (
    <>
      <MUIDataTable
        title={
          <Box sx={{display: 'flex', alignItems: 'center'}}>
            <Typography variant='h1' color='primary'>
              {title}
            </Typography>
            <Badge
              badgeContent={total}
              max={99999999}
              color='primary'
              sx={{ml: 7}}
            />
          </Box>
        }
        data={data}
        columns={columns}
        options={{
          ...options,
          rowsPerPageOptions: options.rowsPerPageOptions
            ? options.rowsPerPageOptions
            : [20, 50, 100, 500],
          serverSide: options.serverSide ? options.serverSide : true,
          rowsSelected: selected,
          textLabels: {
            body: {
              noMatch: isLoading
                ? 'Data Loading...'
                : 'Sorry, no matching records found',
            },
          },
          fixedHeader: true,
          rowHover: true,
          tableBodyMaxHeight: options.tableBodyMaxHeight
            ? options.tableBodyMaxHeight
            : '73vh',
          tableBodyHeight: options.tableBodyHeight
            ? options.tableBodyHeight
            : '73vh',

          // Calling the applyNewFilters parameter applies the selected filters to the table
          customFilterDialogFooter: (currentFilterList, applyNewFilters) => {
            return (
              <div style={{marginTop: '40px'}}>
                <Button variant='contained' onClick={() => applyNewFilters()}>
                  Apply Filters
                </Button>
              </div>
            );
          },
          customToolbar: () => !hideAddButton && <AddTooltip onAdd={onAdd} />,
          customToolbarSelect: options.customToolbarSelect
            ? options.customToolbarSelect
            : () => (
                <Toolbar
                  selected={selected}
                  deleteTitle={deleteTitle}
                  onDelete={onDelete}
                  onEdit={onEdit}
                  onSell={onSell}
                  showSell={showSell}
                  selectedItems={selectedItems}
                />
              ),
          customSearchRender: options.customSearchRender
            ? options.customSearchRender
            : (searchText, handleSearch, hideSearch, options) => {
                return (
                  <Search
                    searchText={searchText}
                    onSearch={handleSearch}
                    onHide={hideSearch}
                    onEnter={onEnterSearch ? onEnterSearch : () => {}}
                    options={options}
                    total={total}
                    onExactChange={onExactChange ? onExactChange : () => {}}
                  />
                );
              },
        }}
      />
      {isLoading && <AppLoader />}
    </>
  );
};

export default CustomDataTable;

CustomDataTable.propTypes = {
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.node,
  ]).isRequired,
  total: PropTypes.number,
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  options: PropTypes.object.isRequired,
  hideAddButton: PropTypes.bool,
  onAdd: PropTypes.func,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  deleteTitle: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  isLoading: PropTypes.bool,
  onExactChange: PropTypes.func,
  selected: PropTypes.array,
  onEnterSearch: PropTypes.func,
  onSell: PropTypes.func,
  showSell: PropTypes.bool,
  selectedItems: PropTypes.array,
};
