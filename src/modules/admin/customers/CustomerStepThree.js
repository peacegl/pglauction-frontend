import AppAutocompleteField from '@crema/core/AppFormComponents/AppAutocompleteField';
import Permissions from '../../../components/permissions/Permissions';
import FormControlLabel from '@mui/material/FormControlLabel';
import {Box, Stack, Typography, Paper} from '@mui/material';
import IntlMessages from '@crema/utility/IntlMessages';
import Checkbox from '@mui/material/Checkbox';
import {useIntl} from 'react-intl';
import PropTypes from 'prop-types';

const CustomerStepThree = (props) => {
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
        <Stack direction={{xs: 'column', md: 'row'}} spacing={5}>
          <AppAutocompleteField
            multiple
            placeholder={messages['common.rolePlaceholder']}
            label={<IntlMessages id='common.role' />}
            name='roles'
            variant='outlined'
            size='small'
            sx={{flex: 1, width: '100%'}}
            dataLoading={props.rolesLoading}
            options={props.roles.map((item) => {
              item.name = item.name.replaceAll('_', ' ');
              item.name = item.name.replace(/^(.)|\s+(.)/g, (c) =>
                c.toUpperCase(),
              );
              return item;
            })}
            keyName='name'
            value={props.values?.roles}
            handleChange={({name, value}) => props.setfieldvalue(name, value)}
          />
        </Stack>
      </Stack>
      {/* <Paper sx={{mt: 5}}>
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
      <Permissions {...props} /> */}
    </Box>
  );
};

export default CustomerStepThree;
CustomerStepThree.propTypes = {
  values: PropTypes.object,
  setfieldvalue: PropTypes.func,
  rolesLoading: PropTypes.bool,
  roles: PropTypes.array.isRequired,
  permissionsLoading: PropTypes.bool,
  permissions: PropTypes.object.isRequired,
  totalPermissions: PropTypes.number,
};
