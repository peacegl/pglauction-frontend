import IntlMessages from '@crema/utility/IntlMessages';
import MakeConfigs from '../../../configs/pages/makes';
import {onInsertMake, onUpdateMake} from 'redux/actions';
import CustomModal from '../../CustomModal';
import {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import PropTypes from 'prop-types';
import MakeForm from './MakeForm';
import jwtAxios from '@crema/services/auth/jwt-auth';
import {getData} from '../../../configs';

const insertColumns = MakeConfigs().insertColumns;
const validationSchema = MakeConfigs().validationSchema;
export default function MakeModal({
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
  });

  const dispatch = useDispatch();
  useEffect(() => {
    if (recordId) {
      (async function () {
        try {
          setIsLoading(true);
          const res = await jwtAxios.get(`/makes/${recordId}`);
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
      dispatch(onUpdateMake(recordId, values, toggleOpen));
    } else {
      dispatch(onInsertMake(values, toggleOpen));
    }
  };
  return (
    <CustomModal
      open={open}
      toggleOpen={toggleOpen}
      width={width}
      onSave={onSave}
      title={<IntlMessages id='make.makeInfo' />}
      validationSchema={validationSchema}
      initialValues={initialValues}
      isLoading={isLoading}
      height='auto'
      {...rest}
    >
      <MakeForm />
    </CustomModal>
  );
}
MakeModal.propTypes = {
  open: PropTypes.bool.isRequired,
  toggleOpen: PropTypes.func,
  width: PropTypes.number,
  recordId: PropTypes.string,
  edit: PropTypes.bool,
};
