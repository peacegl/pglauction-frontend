import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import IntlMessages from '@crema/utility/IntlMessages';
import LocationConfigs from '../../../configs/pages/locations';
import jwtAxios from '@crema/services/auth/jwt-auth';
import {onInsertUser, onUpdateUser} from 'redux/actions';
import CustomModal from '../../CustomModal';
import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import PropTypes from 'prop-types';
import LocationStepOne from './LocationStepOne';

const insertColumns = LocationConfigs().insertColumns;
const validationSchema = LocationConfigs().validationSchema;

export default function LocationModal({
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
  return (
    <CustomModal
      open={open}
      toggleOpen={toggleOpen}
      width={width}
      onSave={onSave}
      title={<IntlMessages id='location.locationInfo' />}
      validationSchema={validationSchema}
      initialValues={initialValues}
      isLoading={isLoading}
      {...rest}
    >
      <LocationStepOne />
    </CustomModal>
  );
}
LocationModal.propTypes = {
  open: PropTypes.bool.isRequired,
  toggleOpen: PropTypes.func,
  width: PropTypes.number,
  recordId: PropTypes.string,
  edit: PropTypes.bool,
};
