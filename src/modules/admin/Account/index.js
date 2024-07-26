import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {IoMdInformationCircleOutline} from 'react-icons/io';
import {useEffect, useMemo, useRef, useState} from 'react';
import AccountVerification from './AccountVerification';
import IntlMessages from '@crema/utility/IntlMessages';
import AccountTabsWrapper from './AccountTabsWrapper';
import ChangePasswordForm from './ChangePasswordForm';
import {useAuthUser} from '@crema/utility/AuthHooks';
import jwtAxios from '@crema/services/auth/jwt-auth';
import PersonalInfoForm from './PersonalInfoForm';
import {Fonts} from 'shared/constants/AppEnums';
import {AiOutlineLock} from 'react-icons/ai';
import {AppAnimate, AppLoader} from '@crema';
import {BiUser} from 'react-icons/bi';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import InfoForm from './InfoForm';
import {getData} from 'configs';

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

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
    address_line_1: '',
    address_line_2: '',
    company: '',
    country_id: '',
    state_id: '',
    city: '',
    zip_code: '',
    is_business: 0,
    identification_proof: '',
    customer_status: '',
  };
  const {user} = useAuthUser();
  const profileUrl = useRef();
  const [values, setValues] = useState({});
  const [value, setValue] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [timezones, setTimezones] = useState([]);
  const [timezonesLoading, setTimezonesLoading] = useState(false);
  const [countries, setCountries] = useState([]);
  const [countriesLoading, setCountriesLoading] = useState(false);
  const [states, setStates] = useState([]);
  const [statesLoading, setStatesLoading] = useState(false);
  const [pendingVerification, setPendingVerification] = useState(false);
  const [identificationProof, setIdentificationProof] = useState({});
  const [isEmailVerified, setIsEmailVerified] = useState(true);
  const [showSendAgain, setShowSendAgain] = useState(false);
  const [userInitialValues, setUserInitialValues] = useState({
    profile: '',
    fullname: '',
    phone: '',
    whatsapp: '',
    email: '',
    username: '',
    address_line_1: '',
    address_line_2: '',
  });
  const [infoInitialValues, setInfoInitialValues] = useState({
    timezone: '',
    gender: '',
    birth_date: '',
    country_id: '',
    state_id: '',
    city: '',
    zip_code: '',
  });
  const passwordInitialValues = {
    current_password: '',
    new_password: '',
    password_confirmation: '',
  };
  const [verifyData, setVerifyData] = useState({
    is_business: 0,
    company: '',
    identification_proof: '',
    customer_status: '',
  });
  const tabs = useMemo(() => {
    const sets = [
      {
        id: 1,
        icon: <BiUser />,
        name: <IntlMessages id='common.personalInfo' />,
      },
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
    if (user?.type == 'Customer') {
      sets.push({
        id: 4,
        icon: <AccountCircleIcon />,
        name: <IntlMessages id='common.accountVerification' />,
      });
    }
    return sets;
  }, [user?.type]);

  useEffect(() => {
    if (value == 0) {
      let initValues = userInitialValues;
      Object.entries(values).forEach(([key, v]) => {
        if (Object.keys(userInitialValues)?.includes(key)) {
          initValues[key] = v ? v : '';
        }
      });
      delete initValues.profile;
      setUserInitialValues(initValues);
    } else if (value == 2) {
      let initValues = infoInitialValues;
      Object.entries(values).forEach(([key, v]) => {
        if (Object.keys(infoInitialValues)?.includes(key)) {
          initValues[key] = v ? v : '';
        }
      });
      setInfoInitialValues(initValues);
    } else if (value == 3) {
      let initValues = verifyData;
      Object.entries(values).forEach(([key, v]) => {
        if (Object.keys(verifyData)?.includes(key)) {
          initValues[key] = v ? v : values[key];
        }
      });
      setVerifyData(initValues);
    }
  }, [values, value]);

  const searchTimezones = (content, name = null) => {
    getData(
      `/timezones/auto_complete${name ? '?name=' + name : ''}`,
      content,
      setTimezonesLoading,
      setTimezones,
    );
  };

  const searchCountries = (content, country_id = null) => {
    getData(
      `/countries/auto_complete${country_id ? '?id=' + country_id : ''}`,
      content,
      setCountriesLoading,
      setCountries,
    );
  };

  const searchStates = (content, state_id) => {
    getData(
      `/states/auto_complete${state_id ? '?id=' + state_id : ''}`,
      content,
      setStatesLoading,
      setStates,
    );
  };

  useEffect(() => {
    (async function () {
      try {
        setIsLoading(true);
        const res = await jwtAxios.get(`/auth2`);
        if (res.status === 200) {
          let values = {};
          setIsEmailVerified(res.data?.email_verified_at ? true : false);
          Object.entries(res.data).forEach(([key, value]) => {
            if (Object.keys(userValues).includes(key)) {
              if (key == 'profile') {
                profileUrl.current = value;
              } else {
                values[key] = value ? value : userValues[key];
              }
            }
            if (typeof value === 'object' && value != null) {
              Object.entries(value).forEach(([ikey, ivalue]) => {
                if (Object.keys(userValues).includes(ikey)) {
                  if (ikey == 'profile') {
                    profileUrl.current = ivalue;
                  } else if (ikey == 'identification_proof') {
                    setIdentificationProof({
                      name: value.identification_proof_name,
                      url: value.identification_proof,
                      size: value.identification_proof_size,
                    });
                  } else {
                    values[ikey] = ivalue ? ivalue : userValues[ikey];
                  }
                }
              });
            }
          });
          setValues(values);
          let initValues = userInitialValues;
          Object.entries(values).forEach(([key, v]) => {
            if (Object.keys(userInitialValues)?.includes(key)) {
              initValues[key] = v ? v : userInitialValues[key];
            }
          });
          delete initValues.profile;
          setUserInitialValues(initValues);
          searchTimezones({}, values.timezone);
          searchCountries({state_id: values.state_id}, values.country_id);
          searchStates({country_id: values.country_id}, values.state_id);
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

  useEffect(() => {
    setIsEmailVerified(user?.email_verified_at ? true : false);
  }, [user?.email_verified_at]);

  return (
    <>
      <Box sx={{mt: 8}}>
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
              <Box sx={{position: 'relative', maxWidth: '95%', mx: 'auto'}}>
                {isLoading && <AppLoader />}

                {value === 0 && (
                  <PersonalInfoForm
                    initialValues={userInitialValues}
                    profileUrl={profileUrl}
                    setValues={setValues}
                    isEmailVerified={isEmailVerified}
                    setIsEmailVerified={setIsEmailVerified}
                    showSendAgain={showSendAgain}
                    setShowSendAgain={setShowSendAgain}
                  />
                )}
                {value === 1 && (
                  <ChangePasswordForm initialValues={passwordInitialValues} />
                )}
                {value === 2 && (
                  <InfoForm
                    initialValues={infoInitialValues}
                    countries={countries}
                    countriesLoading={countriesLoading}
                    searchCountries={searchCountries}
                    states={states}
                    statesLoading={statesLoading}
                    searchStates={searchStates}
                    timezones={timezones}
                    timezonesLoading={timezonesLoading}
                    searchTimezones={searchTimezones}
                    setValues={setValues}
                  />
                )}
                {value === 3 && (
                  <AccountVerification
                    initialValues={verifyData}
                    setValues={setValues}
                    identificationProof={identificationProof}
                    setIdentificationProof={setIdentificationProof}
                    setPendingVerification={setPendingVerification}
                    pendingVerification={pendingVerification}
                  />
                )}
              </Box>
            </Box>
          </AccountTabsWrapper>
        </AppAnimate>
      </Box>
    </>
  );
};

export default Account;
