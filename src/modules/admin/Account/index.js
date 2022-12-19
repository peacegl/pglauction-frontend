import {IoMdInformationCircleOutline} from 'react-icons/io';
import MyAccountConfigs from 'configs/pages/my-account';
import IntlMessages from '@crema/utility/IntlMessages';
import AccountTabsWrapper from './AccountTabsWrapper';
import ChangePasswordForm from './ChangePasswordForm';
import jwtAxios from '@crema/services/auth/jwt-auth';
import {appIntl} from '@crema/utility/helper/Utils';
import {useEffect, useRef, useState} from 'react';
import AppPageMeta from '@crema/core/AppPageMeta';
import PersonalInfoForm from './PersonalInfoForm';
import {Fonts} from 'shared/constants/AppEnums';
import SaveIcon from '@mui/icons-material/Save';
import {AiOutlineLock} from 'react-icons/ai';
import {AppAnimate, AppLoader} from '@crema';
import {LoadingButton} from '@mui/lab';
import {BiUser} from 'react-icons/bi';
import Tabs from '@mui/material/Tabs';
import {Button} from '@mui/material';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import {Form, Formik} from 'formik';
import InfoForm from './InfoForm';

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const tabs = [
  {id: 1, icon: <BiUser />, name: <IntlMessages id='common.personalInfo' />},
  {
    id: 2,
    icon: <AiOutlineLock />,
    name: <IntlMessages id='common.changePassword' />,
  },
  {
    id: 3,
    icon: <IoMdInformationCircleOutline />,
    name: <IntlMessages id='common.information' />,
  },
];

const Account = () => {
  const userValues = {
    profile: '',
    fullname: '',
    phone: '',
    whatsapp: '',
    email: '',
    username: '',
    timezone: '',
    gender: '',
    birth_date: '',
  };
  const {messages} = appIntl('');
  const profileUrl = useRef();
  const [values, setValues] = useState({});
  const [value, setValue] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [initialValues, setInitialValues] = useState(
    MyAccountConfigs().initialValues[0],
  );
  const [validationSchema, setValidationSchema] = useState(
    MyAccountConfigs(
      messages['validation.invalidPhone'],
      messages['validation.invalidWhatsapp'],
      messages['validation.passwordMisMatch'],
    ).validationSchema[0],
  );

  useEffect(() => {
    setValidationSchema(
      MyAccountConfigs(
        messages['validation.invalidPhone'],
        messages['validation.invalidWhatsapp'],
        messages['validation.passwordMisMatch'],
      ).validationSchema[value],
    );
  }, [value]);
  useEffect(() => {
    let initValues = {};
    Object.entries(values).forEach(([key, v]) => {
      if (Object.keys(MyAccountConfigs().initialValues[value])?.includes(key)) {
        if (key == 'gender') {
          console.log(v);
        }
        initValues[key] = v ? v : '';
      }
    });
    console.log(initValues);
    setInitialValues(initValues);
  }, [values, value]);

  useEffect(() => {
    (async function () {
      try {
        setIsLoading(true);
        const res = await jwtAxios.get(`/auth/`);
        if (res.status === 200) {
          let values = {};
          Object.entries(res.data).forEach(([key, value]) => {
            if (Object.keys(userValues).includes(key)) {
              if (key == 'profile') {
                profileUrl.current = value;
              } else {
                values[key] = value ? value : userValues[key];
              }
            }
          });
          setValues(values);
        }
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    })();
  }, []);

  const onTabsChange = (event, newValue) => {
    setValue(newValue);
  };
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  return (
    <>
      <AppPageMeta />
      <Box
        component='h2'
        variant='h2'
        sx={{
          fontSize: 16,
          color: 'text.primary',
          fontWeight: Fonts.SEMI_BOLD,
          mb: {
            xs: 2,
            lg: 4,
          },
        }}
      >
        My Account
      </Box>
      <AppAnimate animation='transition.slideUpIn' delay={200}>
        <AccountTabsWrapper>
          <Tabs
            className='account-tabs'
            value={value}
            onChange={onTabsChange}
            aria-label='basic tabs example'
            orientation='vertical'
          >
            {tabs.map((tab, index) => (
              <Tab
                className='account-tab'
                label={tab.name}
                icon={tab.icon}
                key={index}
                {...a11yProps(index)}
              />
            ))}
          </Tabs>
          <Box className='account-tabs-content'>
            <Box
              sx={{
                position: 'relative',
                maxWidth: 600,
              }}
            >
              {isLoading && <AppLoader />}
              <Formik
                validateOnBlur={true}
                initialValues={initialValues}
                enableReinitialize
                validationSchema={validationSchema}
                onSubmit={async (values, actions) => {
                  actions.setSubmitting(true);
                  await delay(0);
                  await handleSubmit(values, actions);
                  actions.setSubmitting(false);
                }}
              >
                {({
                  values,
                  setFieldValue,
                  isSubmitting,
                  setFieldError,
                  ...rest
                }) => {
                  return (
                    <Form>
                      {value === 0 && (
                        <PersonalInfoForm
                          values={values}
                          setFieldValue={setFieldValue}
                          profileUrl={profileUrl}
                        />
                      )}
                      {value === 1 && (
                        <ChangePasswordForm
                          values={values}
                          setFieldValue={setFieldValue}
                        />
                      )}
                      {value === 2 && (
                        <InfoForm
                          values={values}
                          setFieldValue={setFieldValue}
                        />
                      )}
                      <Box
                        sx={{
                          mt: 5,
                        }}
                      >
                        <LoadingButton
                          loading={isSubmitting}
                          loadingPosition='start'
                          startIcon={<SaveIcon />}
                          variant='contained'
                          type='submit'
                          sx={{
                            position: 'relative',
                            minWidth: 100,
                          }}
                        >
                          <IntlMessages id='common.saveChanges' />
                        </LoadingButton>
                        <Button
                          sx={{
                            position: 'relative',
                            minWidth: 100,
                            ml: 2.5,
                          }}
                          color='primary'
                          variant='outlined'
                          type='cancel'
                        >
                          <IntlMessages id='common.cancel' />
                        </Button>
                      </Box>
                    </Form>
                  );
                }}
              </Formik>
            </Box>
          </Box>
        </AccountTabsWrapper>
      </AppAnimate>
    </>
  );
};

export default Account;
