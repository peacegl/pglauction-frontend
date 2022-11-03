import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import IntlMessages from '@crema/utility/IntlMessages';
import UserConfigs from '../../../configs/pages/users';
import jwtAxios from '@crema/services/auth/jwt-auth';
import {onInsertUser, onUpdateUser} from 'redux/actions';
import UserStepOne from './UserStepOne';
import UserStepTwo from './UserStepTwo';
import CustomModal from '../../CustomModal';
import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import PropTypes from 'prop-types';

const insertColumns = UserConfigs().insertColumns;
const validationSchema = UserConfigs().validationSchema;

export default function UserModal({
  open,
  toggleOpen,
  width,
  recordId,
  edit,
  ...rest
}) {
  const [locationLoading, setLocationLoading] = useState(false);
  const [categoryLoading, setCategoryLoading] = useState(false);
  const [sellersLoading, setSellersLoading] = useState(false);
  const [locations, setLocations] = useState([]);
  const [categories, setCategories] = useState([]);
  const [sellers, setSellers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [initialValues, setInitialValues] = useState({
    firstname: '',
    lastname: '',
    phone: '',
    whatsapp: '',
    gender: '',
    birth_date: '',
    email: '',
    username: '',
    password: '',
    second_email: '',
    status: '',
    type: '',
  });
  const dispatch = useDispatch();
  const fetchData = async (url, content, loading, setData) => {
    try {
      loading(true);
      const res = await jwtAxios.get(url, {params: content});
      if (res.status === 200 && res.data.result) {
        setData(res.data.data);
      } else {
        setData([]);
      }
      loading(false);
    } catch (error) {
      setData([]);
      loading(false);
    }
  };
  const searchLocations = (content) => {
    fetchData(
      `/location/auto_complete`,
      content,
      setLocationLoading,
      setLocations,
    );
  };
  const searchCategories = (content) => {
    fetchData(
      `/category/auto_complete`,
      content,
      setCategoryLoading,
      setCategories,
    );
  };
  const searchSellers = (content) => {
    fetchData(`/sellers/auto_complete`, content, setSellersLoading, setSellers);
  };

  useEffect(() => {
    fetchData(`/location/auto_complete`, {}, setLocationLoading, setLocations);
    fetchData(`/category/auto_complete`, {}, setCategoryLoading, setCategories);
    fetchData(`/sellers/auto_complete`, {}, setSellersLoading, setSellers);
  }, []);

  useEffect(() => {
    if (recordId) {
      (async function () {
        try {
          setIsLoading(true);
          const res = await jwtAxios.get(`/users/${recordId}`);
          if (res.status === 200 && res.data.result) {
            let values = {};
            Object.entries(res.data.data).forEach(([key, value]) => {
              if (insertColumns.includes(key)) {
                values[key] = value;
              }
              if (typeof value === 'object' && value != null)
                Object.entries(value).forEach(([ikey, ivalue]) => {
                  if (insertColumns.includes(ikey)) {
                    values[ikey] = ivalue;
                  }
                });
            });
            setInitialValues(values);
          }
          setIsLoading(false);
        } catch (error) {
          setIsLoading(false);
        }
      })();
    }
  }, [recordId]);
  const onSave = (values) => {
    if (recordId) {
      dispatch(onUpdateUser(recordId, values, toggleOpen));
    } else {
      dispatch(onInsertUser(values, toggleOpen));
    }
  };
  const steps = [
    {
      key: 1,
      icon: <DirectionsCarIcon />,
      label: <IntlMessages id='user.userInfo' />,
      children: <UserStepOne />,
    },
    {
      key: 2,
      icon: <ShoppingBagIcon />,
      label: <IntlMessages id='user.accountInfo' />,
      children: (
        <UserStepTwo
          locations={locations}
          locationLoading={locationLoading}
          categories={categories}
          categoryLoading={categoryLoading}
          sellersLoading={sellersLoading}
          sellers={sellers}
          searchCategories={searchCategories}
          searchLocations={searchLocations}
          searchSellers={searchSellers}
          setIsLoading={setIsLoading}
          fetchData={(url, type) => {
            if (type == 'location') {
              fetchData(url, {}, setLocationLoading, setLocations);
            } else if (type == 'category') {
              fetchData(url, {}, setCategoryLoading, setCategories);
            } else if (type == 'seller') {
              fetchData(url, {}, setSellersLoading, setSellers);
            }
          }}
        />
      ),
    },
  ];
  return (
    <CustomModal
      open={open}
      toggleOpen={toggleOpen}
      width={width}
      steps={steps}
      onSave={onSave}
      validationSchema={validationSchema}
      initialValues={initialValues}
      isLoading={isLoading}
      {...rest}
    />
  );
}
UserModal.propTypes = {
  open: PropTypes.bool.isRequired,
  toggleOpen: PropTypes.func,
  width: PropTypes.number,
  recordId: PropTypes.string,
  edit: PropTypes.bool,
};
