import AppTextField from '@crema/core/AppFormComponents/AppTextField';
import AppDateField from '@crema/core/AppFormComponents/AppDateField';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import {MenuItem, Stack, Typography} from '@mui/material';
import {appIntl} from '@crema/utility/helper/Utils';
import {Fonts} from 'shared/constants/AppEnums';
import PropTypes from 'prop-types';
import AppAutocompleteField from '@crema/core/AppFormComponents/AppAutocompleteField';
import {useEffect, useState} from 'react';
import {getData} from 'configs';

const InfoForm = ({values, setFieldValue}) => {
  const {messages} = appIntl('');
  const [timezones, setTimezones] = useState([]);
  const [timezonesLoading, setTimezonesLoading] = useState(false);
  useEffect(() => {
    getData(`/timezones/auto_complete`, {}, setTimezonesLoading, setTimezones);
  }, []);

  const searchTimezones = (content) => {
    getData(
      `/timezones/auto_complete`,
      content,
      setTimezonesLoading,
      setTimezones,
    );
  };

  return (
    <>
      <Typography
        component='h3'
        sx={{
          fontSize: 16,
          fontWeight: Fonts.BOLD,
          mb: {xs: 3, lg: 5},
        }}
      >
        <IntlMessages id='common.information' />
      </Typography>
      <Stack spacing={{xs: 5, md: 8}}>
        <Stack direction={{xs: 'column', md: 'row'}} spacing={5}>
          <AppAutocompleteField
            placeholder={messages['user.timezonePlaceholder']}
            label={<IntlMessages id='user.timezone' />}
            name='timezone'
            variant='outlined'
            size='small'
            sx={{flex: 1}}
            dataLoading={timezonesLoading}
            options={timezones}
            keyName='name'
            idField='name'
            onSearch={searchTimezones}
            value={values?.timezone}
            handleChange={({name, value}) => setFieldValue(name, value)}
          />
        </Stack>
        <Stack direction={{xs: 'column', md: 'row'}} spacing={5}>
          <AppTextField
            select
            placeholder={messages['common.genderPlaceholder']}
            label={<IntlMessages id='common.gender' />}
            name='gender'
            variant='outlined'
            size='small'
            value={values.gender}
            sx={{flex: 1}}
          >
            <MenuItem value='male'>
              <IntlMessages id='common.male' />
            </MenuItem>
            <MenuItem value='female'>
              <IntlMessages id='common.female' />
            </MenuItem>
          </AppTextField>
          <AppDateField
            label={<IntlMessages id='common.birthDate' />}
            value={values.birth_date}
            setFieldValue={(name, value) =>
              setFieldValue(
                name,
                value
                  ? value.getFullYear() +
                      '/' +
                      (value.getMonth() + 1) +
                      '/' +
                      value.getDate()
                  : '',
              )
            }
            name='birth_date'
            size='small'
            sx={{flex: 1}}
          />
        </Stack>
      </Stack>
    </>
  );
};

export default InfoForm;
InfoForm.propTypes = {
  setFieldValue: PropTypes.func,
  values: PropTypes.string,
};
