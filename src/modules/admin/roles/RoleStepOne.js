import AppTextField from '@crema/core/AppFormComponents/AppTextField';
import Permissions from 'components/permissions/Permissions';
import IntlMessages from '@crema/utility/IntlMessages';
import AppLoader from '@crema/core/AppLoader';
import {useIntl} from 'react-intl';
import PropTypes from 'prop-types';
import {
  Box,
  Paper,
  Stack,
  Checkbox,
  Typography,
  FormControlLabel,
} from '@mui/material';

const RoleStepOne = (props) => {
  const {messages} = useIntl();
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
      <Stack spacing={{xs: 5, md: 8}}>
        <AppTextField
          placeholder={messages['common.namePlaceholder']}
          label={<IntlMessages id='common.name' />}
          name='name'
          variant='outlined'
          size='small'
          sx={{flex: 1, mt: 2}}
        />
      </Stack>
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
                    props.permissionsLoading
                      ? false
                      : props.totalPermissions ==
                        props.values?.permissions?.length
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
      {props.permissionsLoading && <AppLoader />}
      <Permissions {...props} />
    </Box>
  );
};

export default RoleStepOne;
RoleStepOne.propTypes = {
  values: PropTypes.object,
  setfieldvalue: PropTypes.func,
  permissionsLoading: PropTypes.bool,
  permissions: PropTypes.any.isRequired,
  totalPermissions: PropTypes.number,
};
