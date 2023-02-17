import FormControlLabel from '@mui/material/FormControlLabel';
import {Stack, Typography, Paper} from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import PropTypes from 'prop-types';
import {useField} from 'formik';

const Permissions = (props) => {
  const [field] = useField('permissions');

  const setCategoryPermissions = (permissions) => {
    const ids = permissions.map((item) => parseInt(item.id));
    if (ids.every((item) => props.values.permissions?.includes(item))) {
      const permissionsIds = props.values.permissions;
      props.setfieldvalue(
        'permissions',
        permissionsIds.filter((item) => !ids.includes(item)),
      );
      return;
    }
    if (ids.some((item) => props.values.permissions?.includes(item))) {
      props.setfieldvalue('permissions', [
        ...new Set([...ids, ...props.values.permissions]),
      ]);
      return;
    }
    const prePermissions = props.values?.permissions
      ? props.values.permissions
      : [];
    props.setfieldvalue('permissions', [
      ...new Set([...ids, ...prePermissions]),
    ]);
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
    <Paper sx={{px: 5, py: 4, mt: 3}}>
      <Stack direction={{xs: 'column'}} sx={{flexWrap: 'wrap'}}>
        {Object.entries(props.permissions)?.map(
          ([name, permissions], index) => (
            <Stack sx={{flex: '50%'}} key={index}>
              <Stack direction='row'>
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
              </Stack>
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
  );
};

export default Permissions;
Permissions.propTypes = {
  values: PropTypes.object,
  setfieldvalue: PropTypes.func,
  permissions: PropTypes.any.isRequired,
};
