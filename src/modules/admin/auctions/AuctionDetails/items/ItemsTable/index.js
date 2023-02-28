import AppTableContainer from '@crema/core/AppTableContainer';
import TableHeading from 'components/design/TableHeading';
import TableBody from '@mui/material/TableBody';
import Table from '@mui/material/Table';
import TableItem from './TableItem';
import PropTypes from 'prop-types';
import {Box} from '@mui/material';

const ItemsTable = ({data}) => {
  return (
    <AppTableContainer sxStyle={{height: '450px'}}>
      <Table>
        <TableHeading />
        <TableBody
          sx={{
            borderBottom: '0 none',
          }}
        >
          {data?.map((row, index) => (
            <TableItem key={row.id} row={row} />
          ))}
        </TableBody>
      </Table>
    </AppTableContainer>
  );
};

export default ItemsTable;

ItemsTable.propTypes = {
  data: PropTypes.array,
};
