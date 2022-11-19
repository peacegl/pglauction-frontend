import Permissions from '../../../components/permissions/Permissions';
import FormControlLabel from '@mui/material/FormControlLabel';
import {Box, Stack, Typography, Paper} from '@mui/material';
import IntlMessages from '@crema/utility/IntlMessages';
import Checkbox from '@mui/material/Checkbox';
import PropTypes from 'prop-types';

const RoleStepTwo = (props) => {
  console.log('asdf', props.values.permissions?.length, props.totalPermissions);

  const setAllPermissions = () => {
    const permissionIds = [];
    if (props.values.permissions?.length == props.totalPermissions) {
      props.setfieldvalue('permissions', permissionIds);
      return;
    }
    Object.values(props.permissions)?.map((permissions) => {
      permissions.forEach((element) => {
        permissionIds.push(element.id);
      });
    });
    props.setfieldvalue('permissions', permissionIds);
  };

  return (
    <Box>
      <Paper sx={{mt: 5}}>
        <Stack
          mx={5}
          direction='row'
          alignItems='center'
          justifyContent='space-between'
        >
          <Box>
            <FormControlLabel
              control={
                <Checkbox
                  checked={
                    props.totalPermissions == props.values?.permissions?.length
                  }
                  indeterminate={
                    props.totalPermissions >
                      props.values?.permissions?.length &&
                    props.values?.permissions?.length != 0
                  }
                  onChange={setAllPermissions}
                />
              }
              label={
                <Typography variant='h4'>
                  <IntlMessages id='common.all' />
                </Typography>
              }
            />
          </Box>
          <Typography variant='h4'>
            <IntlMessages id='common.permissions' />
          </Typography>
        </Stack>
      </Paper>
      <Permissions {...props} />
    </Box>
  );
};

export default RoleStepTwo;
RoleStepTwo.propTypes = {
  values: PropTypes.object,
  setfieldvalue: PropTypes.func,
  permissionsLoading: PropTypes.bool,
  permissions: PropTypes.object.isRequired,
  totalPermissions: PropTypes.number,
};
