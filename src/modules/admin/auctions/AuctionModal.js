import AuctionImagesStep from '../../../components/auctions/AuctionImagesStep';
import AuctionStep from '../../../components/auctions/AuctionStep';
import CollectionsIcon from '@mui/icons-material/Collections';
import AuctionConfigs from '../../../configs/pages/auctions';
import IntlMessages from '@crema/utility/IntlMessages';
import jwtAxios from '@crema/services/auth/jwt-auth';
import {useEffect, useState, useRef} from 'react';
import SellIcon from '@mui/icons-material/Sell';
import {onUpdateAuction} from 'redux/actions';
import CustomModal from '../../CustomModal';
import {useDispatch} from 'react-redux';
import Helper from 'helpers/helpers';
import PropTypes from 'prop-types';

const validationSchema = AuctionConfigs().validationSchema;

export default function AuctionModal({
  open,
  toggleOpen,
  width,
  recordId,
  edit,
  ...rest
}) {
  const [images, setImages] = useState([]);
  const [deletedImages, setDeletedImages] = useState([]);
  const [mainImage, setMainImage] = useState({});
  const [locationLoading, setLocationLoading] = useState(false);
  const [categoryLoading, setCategoryLoading] = useState(false);
  const [sellersLoading, setSellersLoading] = useState(false);
  const [isMainImageValid, setIsMainImageValid] = useState(true);
  const [isMinImagesValid, setMinImagesValid] = useState(true);
  const [isMaxImagesValid, setMaxImagesValid] = useState(true);
  const [locations, setLocations] = useState([]);
  const [categories, setCategories] = useState([]);
  const [sellers, setSellers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [initialValues, setInitialValues] = useState({
    seller_id: '',
    location_id: '',
    category_id: '',
    title: '',
    subtitle: '',
    start_date: '',
    end_date: '',
    minimum_bid: '',
    buy_now_price: '',
    description: '',
    youtube_url: '',
    note: '',
    main_image: '',
    images: [],
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
  const searchLocations = (content, location_id = null) => {
    fetchData(
      `/location/auto_complete${location_id ? '?id=' + location_id : ''}`,
      content,
      setLocationLoading,
      setLocations,
    );
  };
  const searchCategories = (content, category_id = null) => {
    fetchData(
      `/category/auto_complete${category_id ? '?id=' + category_id : ''}`,
      content,
      setCategoryLoading,
      setCategories,
    );
  };
  const searchSellers = (content, seller_id = null) => {
    fetchData(
      `/sellers/auto_complete${seller_id ? '?id=' + seller_id : ''}`,
      content,
      setSellersLoading,
      setSellers,
    );
  };

  useEffect(() => {
    if (!recordId) {
      searchLocations({});
      searchCategories({});
      searchSellers({});
    }
  }, []);

  useEffect(() => {
    if (recordId) {
      (async function () {
        try {
          setIsLoading(true);
          const res = await jwtAxios.get(`/auctions/${recordId}`);
          if (res.status === 200 && res.data.result) {
            let values = {};
            let oldImages = [];
            Object.entries(res.data.data).forEach(([key, value]) => {
              if (Object.keys(initialValues).includes(key)) {
                if (key == 'images') {
                  value?.forEach((item) => {
                    if (item.type == 'sub_image') {
                      oldImages.push({preview: item.path, id: item.id});
                    } else if (item.type == 'main_image') {
                      setMainImage({preview: item.path, id: item.id});
                    }
                  });
                } else {
                  values[key] = value;
                }
              }
            });
            setImages(oldImages);
            setInitialValues(values);
            searchLocations({}, values.location_id);
            searchCategories({}, values.category_id);
            searchSellers({}, values.seller_id);
          }
          setIsLoading(false);
        } catch (error) {
          setIsLoading(false);
        }
      })();
    }
  }, [recordId]);

  const stepTwoValidation = (values, actions) => {
    if (!mainImage.preview) {
      setIsMainImageValid(false);
      return false;
    }
    if (images?.length >= 1) {
      if (images?.length > 20) {
        setMaxImagesValid(false);
        return false;
      }
      setMinImagesValid(true);
      return true;
    }
    setMinImagesValid(false);
    return false;
  };

  const customValidation = async (values, actions, activeStep) => {
    if (activeStep == 2) {
      return await stepTwoValidation(values, actions);
    }
    return true;
  };

  const onSave = (values) => {
    values.deleted_images = deletedImages;
    const auctionFormData = Helper.getFormData(values);
    if (recordId) {
      dispatch(onUpdateAuction(recordId, auctionFormData, toggleOpen));
    }
  };
  const steps = [
    {
      key: 1,
      icon: <SellIcon />,
      label: <IntlMessages id='auction.auctionDetails' />,
      children: (
        <AuctionStep
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
        />
      ),
    },
    {
      key: 2,
      icon: <CollectionsIcon />,
      label: <IntlMessages id='auction.auctionImages' />,
      children: (
        <AuctionImagesStep
          mainImage={mainImage}
          setMainImage={setMainImage}
          images={images}
          setImages={setImages}
          isMinImagesValid={isMinImagesValid}
          isMaxImagesValid={isMaxImagesValid}
          setMinImagesValid={setMinImagesValid}
          setMaxImagesValid={setMaxImagesValid}
          setIsMainImageValid={setIsMainImageValid}
          isMainImageValid={isMainImageValid}
          setDeletedImages={setDeletedImages}
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
      customValidation={customValidation}
      {...rest}
    />
  );
}
AuctionModal.propTypes = {
  open: PropTypes.bool.isRequired,
  toggleOpen: PropTypes.func,
  width: PropTypes.number,
  recordId: PropTypes.string,
  edit: PropTypes.bool,
};
