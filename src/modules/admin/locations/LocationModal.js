import IntlMessages from '@crema/utility/IntlMessages';
import LocationConfigs from '../../../configs/pages/locations';
import {onInsertLocation, onUpdateLocation} from 'redux/actions';
import CustomModal from '../../CustomModal';
import {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import PropTypes from 'prop-types';
import LocationForm from './LocationForm';
import jwtAxios from '@crema/services/auth/jwt-auth';
const insertColumns = LocationConfigs().insertColumns;
const validationSchema = LocationConfigs().validationSchema;
import {getData} from '../../../configs';

export default function LocationModal({
  open,
  toggleOpen,
  width,
  recordId,
  edit,
  ...rest
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);
  const [parentLocations, setParentLocations] = useState([]);
  const [initialValues, setInitialValues] = useState({
    name: '',
    parent_id: '',
    description: '',
  });

  const searchLocations = (content) => {
    getData(
      `/location/auto_complete`,
      content,
      setLocationLoading,
      setParentLocations,
    );
  };

  useEffect(() => {
    if (!recordId) {
      getData(
        `/location/auto_complete`,
        {},
        setLocationLoading,
        setParentLocations,
      );
    }
  }, []);

  const dispatch = useDispatch();
  useEffect(() => {
    if (recordId) {
      (async function () {
        try {
          setIsLoading(true);
          const res = await jwtAxios.get(`/locations/${recordId}`);
          if (res.status === 200 && res.data.result) {
            let values = {};
            Object.entries(res.data.data).forEach(([key, value]) => {
              if (insertColumns.includes(key)) {
                values[key] = value;
              }
            });
            setInitialValues(values);
            getData(
              `/location/auto_complete${
                values.parent_id ? '?id=' + values.parent_id : ''
              }`,
              {},
              setLocationLoading,
              setParentLocations,
            );
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
      dispatch(onUpdateLocation(recordId, values, toggleOpen));
    } else {
      dispatch(onInsertLocation(values, toggleOpen));
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
      <LocationForm
        locationLoading={locationLoading}
        parentLocations={parentLocations}
        searchLocations={searchLocations}
      />
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
