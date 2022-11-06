import IntlMessages from '@crema/utility/IntlMessages';
import LocationConfigs from '../../../configs/pages/locations';
import {onInsertCategory, onUpdateCategory} from 'redux/actions';
import CustomModal from '../../CustomModal';
import {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import PropTypes from 'prop-types';
import CategoryForm from './CategoryForm';
import jwtAxios from '@crema/services/auth/jwt-auth';
// import RichTextEditor from 'react-rte';
const insertColumns = LocationConfigs().insertColumns;
const validationSchema = LocationConfigs().validationSchema;

export default function CategoryModal({
  open,
  toggleOpen,
  width,
  recordId,
  edit,
  ...rest
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [initialValues, setInitialValues] = useState({
    name: '',
    parent_id: '',
    description: '',
  });
  const dispatch = useDispatch();
  useEffect(() => {
    if (recordId) {
      (async function () {
        try {
          setIsLoading(true);
          const res = await jwtAxios.get(`/categories/${recordId}`);
          if (res.status === 200 && res.data.result) {
            let values = {};
            Object.entries(res.data.data).forEach(([key, value]) => {
              if (insertColumns.includes(key)) {
                values[key] = value;
              }
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
      dispatch(onUpdateCategory(recordId, values, toggleOpen));
    } else {
      dispatch(onInsertCategory(values, toggleOpen));
    }
  };
  return (
    <CustomModal
      open={open}
      toggleOpen={toggleOpen}
      width={width}
      onSave={onSave}
      title={<IntlMessages id='category.categoryInfo' />}
      validationSchema={validationSchema}
      initialValues={initialValues}
      isLoading={isLoading}
      {...rest}
    >
      <CategoryForm />
    </CustomModal>
  );
}
CategoryModal.propTypes = {
  open: PropTypes.bool.isRequired,
  toggleOpen: PropTypes.func,
  width: PropTypes.number,
  recordId: PropTypes.string,
  edit: PropTypes.bool,
};
