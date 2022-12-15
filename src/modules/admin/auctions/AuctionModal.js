import {onInsertAuction, onUpdateAuction} from 'redux/actions';
import CustomModal from '../../../components/CustomModal';
import IntlMessages from '@crema/utility/IntlMessages';
import jwtAxios from '@crema/services/auth/jwt-auth';
import {useState, useEffect} from 'react';
import {getData} from '../../../configs';
import AuctionForm from './AuctionForm';
import {useDispatch} from 'react-redux';
import PropTypes from 'prop-types';

export default function AuctionModal({
  open,
  toggleOpen,
  width,
  recordId,
  edit,
  ...rest
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [auctionItemsLoading, setAuctionItemLoading] = useState(false);
  const [auctionItems, setAuctionItems] = useState([]);
  const [initialValues, setInitialValues] = useState({
    name: '',
    start_date: '',
    end_date: '',
    status: '',
  });
  const searchItems = (content) => {
    getData(
      `/auction_items/auto_complete`,
      content,
      setAuctionItemLoading,
      setAuctionItems,
    );
  };

  useEffect(() => {
    getData(
      `/auction_items/auto_complete`,
      {},
      setAuctionItemLoading,
      setAuctionItems,
    );
  }, []);
  const dispatch = useDispatch();
  useEffect(() => {
    if (recordId) {
      (async function () {
        try {
          setIsLoading(true);
          const res = await jwtAxios.get(`/auctions/${recordId}`);
          if (res.status === 200 && res.data.result) {
            let values = {};
            Object.entries(res.data.data).forEach(([key, value]) => {
              if (insertColumns.includes(key)) {
                values[key] = value ? value : initialValues[key];
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
      dispatch(onUpdateAuction(recordId, values, toggleOpen));
    } else {
      dispatch(onInsertAuction(values, toggleOpen));
    }
  };
  return (
    <CustomModal
      open={open}
      toggleOpen={toggleOpen}
      width={width}
      onSave={onSave}
      title={<IntlMessages id='auction.auctionInfo' />}
      validationSchema={validationSchema}
      initialValues={initialValues}
      isLoading={isLoading}
      {...rest}
    >
      <AuctionForm
        auctionItems={auctionItems}
        auctionItemsLoading={auctionItemsLoading}
        searchItems={searchItems}
      />
    </CustomModal>
  );
}
AuctionModal.propTypes = {
  open: PropTypes.bool.isRequired,
  toggleOpen: PropTypes.func,
  width: PropTypes.number,
  recordId: PropTypes.string,
  edit: PropTypes.bool,
};
