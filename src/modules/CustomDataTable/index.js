import PropTypes from 'prop-types';
import AddToolTip from './AddToolTip';
import MUIDataTable from 'mui-datatables';
import {Badge, Typography} from '@mui/material';
import AppLoader from '@crema/core/AppLoader';
import Toolbar from './Toolbar';

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
}) => {
  return (
    <>
      <MUIDataTable
        title={
          <>
            <Typography variant='h1' color='primary'>
              {title}
              <Badge
                badgeContent={total}
                max={99999999}
                color='primary'
                sx={{ml: 7}}
              />
            </Typography>
          </>
        }
        data={data}
        columns={columns}
        options={{
          ...options,
          textLabels: {
            body: {
              noMatch: isLoading
                ? 'Data Loading...'
                : 'Sorry, no matching records found',
            },
          },
          tableBodyMaxHeight: options.tableBodyMaxHeight
            ? options.tableBodyMaxHeight
            : '73vh',
          tableBodyHeight: options.tableBodyHeight
            ? options.tableBodyHeight
            : '73vh',
          customToolbar: () => !hideAddButton && <AddToolTip onAdd={onAdd} />,
          customToolbarSelect: options.customToolbarSelect
            ? options.customToolbarSelect
            : () => (
                <Toolbar
                  selected={selected}
                  deleteTitle={deleteTitle}
                  onDelete={onDelete}
                  onEdit={onEdit}
                />
              ),
        }}
      />
      {isLoading && <AppLoader />}
    </>
  );
};

export default CustomDataTable;

CustomDataTable.propTypes = {
  title: PropTypes.string.isRequired,
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
  selected: PropTypes.array,
};
