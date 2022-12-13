import {onInsertModel, onUpdateModel} from 'redux/actions';
import IntlMessages from '@crema/utility/IntlMessages';
import jwtAxios from '@crema/services/auth/jwt-auth';
import CustomModal from 'components/CustomModal';
import ModelConfigs from 'configs/pages/models';
import {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import PropTypes from 'prop-types';
import ModelForm from './ModelForm';
import {getData} from 'configs';

const insertColumns = ModelConfigs().insertColumns;
const validationSchema = ModelConfigs().validationSchema;
export default function ModelModal({
  open,
  toggleOpen,
  width,
  recordId,
  edit,
  ...rest
}) {
  const [makes, setMakes] = useState([]);
  const [makesLoading, setMakesLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [initialValues, setInitialValues] = useState({
    name: '',
    make_id: '',
  });
  const searchMakes = (content, make_id = null) => {
    getData(
      `/make/auto_complete${make_id ? '?id=' + make_id : ''}`,
      content,
      setMakesLoading,
      setMakes,
    );
  };
  useEffect(() => {
    if (!recordId) {
      searchMakes({});
    }
  }, []);
  const dispatch = useDispatch();
  useEffect(() => {
    if (recordId) {
      (async function () {
        try {
          setIsLoading(true);
          const res = await jwtAxios.get(`/models/${recordId}`);
          if (res.status === 200 && res.data.result) {
            let values = {};
            Object.entries(res.data.data).forEach(([key, value]) => {
              if (insertColumns.includes(key)) {
                values[key] = value;
              }
            });
            setInitialValues(values);
            searchMakes({}, values.make_id);
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
      dispatch(onUpdateModel(recordId, values, toggleOpen));
    } else {
      dispatch(onInsertModel(values, toggleOpen));
    }
  };
  return (
    <CustomModal
      open={open}
      toggleOpen={toggleOpen}
      width={width}
      onSave={onSave}
      title={<IntlMessages id='model.modelInfo' />}
      validationSchema={validationSchema}
      initialValues={initialValues}
      isLoading={isLoading}
      height='auto'
      {...rest}
    >
      <ModelForm makes={makes} makesLoading={makesLoading} />
    </CustomModal>
  );
}
ModelModal.propTypes = {
  open: PropTypes.bool.isRequired,
  toggleOpen: PropTypes.func,
  width: PropTypes.number,
  recordId: PropTypes.string,
  edit: PropTypes.bool,
};
