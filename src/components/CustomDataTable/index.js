import FilterListRoundedIcon from '@mui/icons-material/FilterListRounded';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import IntlMessages from '@crema/utility/IntlMessages';
import {Badge, Box, Typography} from '@mui/material';
import AppLoader from '@crema/core/AppLoader';
import BasicTooltip from './BasicTooltip';
import MUIDataTable from 'mui-datatables';
import PropTypes from 'prop-types';
import Toolbar from './Toolbar';
import Search from './Search';
import ExcelExportComponent from 'components/exports/exportExcel';
import ExportPdf from 'components/exports/exportPdf';
import {useRef} from 'react';
import {useIntl} from 'react-intl';

const CustomDataTable = ({
  title,
  total,
  data,
  columns,
  options,
  onAdd,
  onFilterClick,
  onEdit,
  onDelete,
  showAddButton,
  showDeleteButton,
  showEditButton,
  deleteTitle,
  isLoading,
  selected,
  onEnterSearch,
  onExactChange,
  onSell,
  showSell,
  selectedItems = [],
  selectableRows,
}) => {
  const childRef = useRef();
  const childRefPdf = useRef();
  const {messages} = useIntl();

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
          onViewColumnsChange: (changedColumn, action) => {
            console.log(changedColumn);
            console.log(action);
          },

          onDownload: () => {
            // exportPDF();
            // childRef.current.exportExcel();
            childRefPdf.current.exportPDF();
            return false;
          },

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
          filter: false,
          enableNestedDataAccess: '.',
          selectableRows: selectableRows,
          tableBodyMaxHeight: options.tableBodyMaxHeight
            ? options.tableBodyMaxHeight
            : '73vh',
          tableBodyHeight: options.tableBodyHeight
            ? options.tableBodyHeight
            : '73vh',
          // Calling the applyNewFilters parameter applies the selected filters to the table
          // customFilterDialogFooter: (currentFilterList, applyNewFilters) => {
          //   return (
          //     <div style={{marginTop: '40px'}}>
          //       <Button variant='contained' onClick={() => applyNewFilters()}>
          //         Apply Filters
          //       </Button>
          //     </div>
          //   );
          // },
          customToolbar: () => (
            <>
              {onFilterClick && (
                <BasicTooltip
                  onClick={onFilterClick}
                  title={<IntlMessages id='common.filter' />}
                  icon={<FilterListRoundedIcon />}
                />
              )}
              {showAddButton && (
                <BasicTooltip
                  onClick={onAdd}
                  title={<IntlMessages id='common.add' />}
                  icon={<AddCircleIcon />}
                />
              )}
            </>
          ),
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
                  showEditButton={showEditButton}
                  showDeleteButton={showDeleteButton}
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

      <ExcelExportComponent
        ref={childRef}
        data={data}
        columns={columns}
        title={messages[title.props.id]}
      />
      <ExportPdf
        ref={childRefPdf}
        data={data}
        columns={columns}
        titlePdf={messages[title?.props?.id] ?? 'no_name'}
      />
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
  showAddButton: PropTypes.bool,
  showDeleteButton: PropTypes.bool,
  showEditButton: PropTypes.bool,
  onAdd: PropTypes.func,
  onFilterClick: PropTypes.func,
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
  selectableRows: PropTypes.bool,
};
