import AppAutocompleteField from '@crema/core/AppFormComponents/AppAutocompleteField';
import FormControlLabel from '@mui/material/FormControlLabel';
import {Box, Stack, Typography, Paper} from '@mui/material';
import IntlMessages from '@crema/utility/IntlMessages';
import Checkbox from '@mui/material/Checkbox';
import {useIntl} from 'react-intl';
import PropTypes from 'prop-types';
import {useField} from 'formik';

const UserStepThree = (props) => {
  const {messages} = useIntl();
  const [field] = useField('permissions');

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

  const setCategoryPermissions = (permissions) => {
    if (
      permissions
        .map((item) => item.id)
        .every((item) => props.values.permissions?.includes(item))
    ) {
      props.setfieldvalue('permissions', []);
      return;
    }
    if (
      permissions
        .map((item) => item.id)
        .some((item) => props.values.permissions?.includes(item))
    ) {
      props.setfieldvalue('permissions', [
        ...new Set([
          ...permissions.map((item) => parseInt(item.id)),
          ...props.values.permissions,
        ]),
      ]);
      return;
    }
    props.setfieldvalue(
      'permissions',
      permissions.map((item) => parseInt(item.id)),
    );
  };

  const handleChange = (e) => {
    if (props.values?.permissions) {
      if (props.values?.permissions.includes(parseInt(e.target.value))) {
        let permissions = props.values?.permissions;
        props.setfieldvalue(
          'permissions',
          permissions.filter((item) => item != e.target.value),
        );
        return;
      }
      props.setfieldvalue('permissions', [
        ...new Set([parseInt(e.target.value), ...props.values.permissions]),
      ]);
      return;
    }
    props.setfieldvalue('permissions', [parseInt(e.target.value)]);
  };

  return (
    <Box>
      <Stack spacing={{xs: 5, md: 8}}>
        <Stack direction={{xs: 'column', md: 'row'}} spacing={5}>
          <AppAutocompleteField
            multiple
            placeholder={messages['user.rolePlaceholder']}
            label={<IntlMessages id='user.role' />}
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
            onSearch={props.searchRoles}
            value={props.values?.roles}
            handleChange={({name, value}) => props.setfieldvalue(name, value)}
          />
        </Stack>
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
            <IntlMessages id='user.permissions' />
          </Typography>
        </Stack>
      </Paper>
      <Paper sx={{px: 5, py: 4, mt: 3}}>
        <Stack direction={{xs: 'column'}} sx={{flexWrap: 'wrap'}}>
          {Object.entries(props.permissions)?.map(
            ([name, permissions], index) => (
              <Stack sx={{flex: '50%'}} key={index}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={
                        props.values?.permissions
                          ? permissions
                              .map((item) => item.id)
                              .every((item) =>
                                props.values.permissions?.includes(item),
                              )
                          : false
                      }
                      indeterminate={
                        props.values?.permissions
                          ? !permissions
                              .map((item) => item.id)
                              .every((item) =>
                                props.values.permissions?.includes(item),
                              )
                            ? permissions
                                .map((item) => item.id)
                                .some((item) =>
                                  props.values.permissions?.includes(item),
                                )
                            : false
                          : false
                      }
                      onChange={() => setCategoryPermissions(permissions)}
                    />
                  }
                  label={
                    <Typography sx={{fontWeight: 'bold'}}>
                      {name
                        .replaceAll('_', ' ')
                        .replace(/^(.)|\s+(.)/g, (c) => c.toUpperCase())}
                    </Typography>
                  }
                />
                <Paper
                  variant='outlined'
                  square
                  sx={{
                    display: 'flex',
                    flexDirection: {xs: 'column', md: 'row'},
                    pl: 5,
                    flexWrap: 'wrap',
                    my: 1,
                  }}
                >
                  {permissions.map((permission) => (
                    <FormControlLabel
                      key={permission.id}
                      sx={{
                        flex: '1 0 21%',
                        // width: {xs: 'auto', md: '24%'},
                      }}
                      label={permission.name
                        .replaceAll('_', ' ')
                        .replace(/^(.)|\s+(.)/g, (c) => c.toUpperCase())}
                      control={
                        <Checkbox
                          size='small'
                          {...field}
                          name='permissions'
                          value={parseInt(permission.id)}
                          checked={
                            props.values?.permissions?.includes(
                              parseInt(permission.id),
                            )
                              ? true
                              : false
                          }
                          onChange={handleChange}
                        />
                      }
                    />
                  ))}
                </Paper>
              </Stack>
            ),
          )}
        </Stack>
      </Paper>
    </Box>
  );
};

export default UserStepThree;
UserStepThree.propTypes = {
  values: PropTypes.object,
  setfieldvalue: PropTypes.func,
  rolesLoading: PropTypes.bool,
  roles: PropTypes.array.isRequired,
  permissionsLoading: PropTypes.bool,
  permissions: PropTypes.object.isRequired,
  searchRoles: PropTypes.func,
  totalPermissions: PropTypes.number,
};
