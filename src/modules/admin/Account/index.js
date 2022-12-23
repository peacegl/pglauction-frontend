import {IoMdInformationCircleOutline} from 'react-icons/io';
import IntlMessages from '@crema/utility/IntlMessages';
import AccountTabsWrapper from './AccountTabsWrapper';
import ChangePasswordForm from './ChangePasswordForm';
import jwtAxios from '@crema/services/auth/jwt-auth';
import {useEffect, useRef, useState} from 'react';
import AppPageMeta from '@crema/core/AppPageMeta';
import PersonalInfoForm from './PersonalInfoForm';
import {Fonts} from 'shared/constants/AppEnums';
import {AiOutlineLock} from 'react-icons/ai';
import {AppAnimate, AppLoader} from '@crema';
import {BiUser} from 'react-icons/bi';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
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
    id: '',
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
  const profileUrl = useRef();
  const [values, setValues] = useState({});
  const [value, setValue] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [userInitialValues, setUserInitialValues] = useState({
    profile: '',
    fullname: '',
    phone: '',
    whatsapp: '',
    email: '',
    username: '',
  });
  const [infoInitialValues, setInfoInitialValues] = useState({
    timezone: '',
    gender: '',
    birth_date: '',
  });
  const passwordInitialValues = {
    current_password: '',
    new_password: '',
    password_confirmation: '',
  };

  useEffect(() => {
    if (value == 0) {
      let initValues = userInitialValues;
      Object.entries(values).forEach(([key, v]) => {
        if (Object.keys(userInitialValues)?.includes(key)) {
          initValues[key] = v ? v : userInitialValues[key];
        }
      });
      console.log('initValues', initValues);
      setUserInitialValues(initValues);
    } else if (value == 2) {
      let initValues = infoInitialValues;
      Object.entries(values).forEach(([key, v]) => {
        if (Object.keys(infoInitialValues)?.includes(key)) {
          initValues[key] = v ? v : infoInitialValues[key];
        }
      });
      setInfoInitialValues(initValues);
    }
  }, [values, value]);

  useEffect(() => {
    (async function () {
      try {
        setIsLoading(true);
        const res = await jwtAxios.get(`/auth`);
        if (res.status === 200) {
          let values = {};
          Object.entries(res.data).forEach(([key, value]) => {
            if (Object.keys(userValues).includes(key)) {
              if (key == 'profile') {
                profileUrl.current = value;
              } else {
                values[key] = value ? value : '';
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

              {value === 0 && (
                <PersonalInfoForm
                  initialValues={userInitialValues}
                  profileUrl={profileUrl}
                />
              )}
              {value === 1 && (
                <ChangePasswordForm initialValues={passwordInitialValues} />
              )}
              {value === 2 && <InfoForm initialValues={infoInitialValues} />}
            </Box>
          </Box>
        </AccountTabsWrapper>
      </AppAnimate>
    </>
  );
};

export default Account;
