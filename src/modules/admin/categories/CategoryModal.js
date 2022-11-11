import IntlMessages from '@crema/utility/IntlMessages';
import CategoryConfigs from '../../../configs/pages/categories';
import {onInsertCategory, onUpdateCategory} from 'redux/actions';
import CustomModal from '../../CustomModal';
import {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import PropTypes from 'prop-types';
import CategoryForm from './CategoryForm';
import jwtAxios from '@crema/services/auth/jwt-auth';

const insertColumns = CategoryConfigs().insertColumns;
const validationSchema = CategoryConfigs().validationSchema;
export default function CategoryModal({
  open,
  toggleOpen,
  width,
  recordId,
  edit,
  ...rest
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [categoryLoading, setCategoryLoading] = useState(false);
  const [parentCategories, setParentCategories] = useState([]);
  const [initialValues, setInitialValues] = useState({
    name: '',
    parent_id: '',
    description: '',
  });
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

  const searchCategories = (content) => {
    fetchData(
      `/category/auto_complete`,
      content,
      setCategoryLoading,
      setParentCategories,
    );
  };

  useEffect(() => {
    if (!recordId) {
      fetchData(
        `/category/auto_complete`,
        {},
        setCategoryLoading,
        setParentCategories,
      );
    }
  }, []);
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
            fetchData(
              `/category/auto_complete${
                values.parent_id ? '?id=' + values.parent_id : ''
              }`,
              {},
              setCategoryLoading,
              setParentCategories,
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
      <CategoryForm
        parentCategories={parentCategories}
        categoryLoading={categoryLoading}
        searchCategories={searchCategories}
      />
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
