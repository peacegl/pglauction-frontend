import PropTypes from 'prop-types';
import AddToolTip from './AddToolTip';
import MUIDataTable from 'mui-datatables';
import {Badge, Typography} from '@mui/material';
import AppLoader from '@crema/core/AppLoader';

const CustomDataTable = ({
  title,
  total,
  data,
  columns,
  options,
  hideAddButton,
  onAdd,
  isLoading,
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
  isLoading: PropTypes.bool,
};
