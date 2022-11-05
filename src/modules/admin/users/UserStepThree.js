import AppAutocompleteField from '@crema/core/AppFormComponents/AppAutocompleteField';
import IntlMessages from '@crema/utility/IntlMessages';
import {Box, Stack, Typography, Paper} from '@mui/material';
import {useIntl} from 'react-intl';
import PropTypes from 'prop-types';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import {useState} from 'react';

const UserStepThree = (props) => {
  const [checked, setChecked] = useState([true, false]);

  const handleChange1 = (event) => {
    setChecked([event.target.checked, event.target.checked]);
  };

  const handleChange2 = (event) => {
    setChecked([event.target.checked, checked[1]]);
  };

  const handleChange3 = (event) => {
    setChecked([checked[0], event.target.checked]);
  };

  const {messages} = useIntl();
  const children = (
    <Box sx={{display: 'flex', flexDirection: 'column', ml: 3}}>
      <FormControlLabel
        label='Child 1'
        control={<Checkbox checked={checked[0]} onChange={handleChange2} />}
      />
      <FormControlLabel
        label='Child 2'
        control={<Checkbox checked={checked[1]} onChange={handleChange3} />}
      />
    </Box>
  );
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
              control={<Checkbox />}
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
      <Stack px={9} mt={3}>
        <Box>
          <FormControlLabel
            label='Parent'
            control={
              <Checkbox
                checked={checked[0] && checked[1]}
                indeterminate={checked[0] !== checked[1]}
                onChange={handleChange1}
              />
            }
          />
          {children}
        </Box>
      </Stack>
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
  permissions: PropTypes.array.isRequired,
  searchRoles: PropTypes.func,
};
