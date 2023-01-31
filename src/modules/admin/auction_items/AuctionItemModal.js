import AuctionDescriptionStep from 'components/auctions/AuctionDescriptionStep';
import AuctionImagesStep from 'components/auctions/AuctionImagesStep';
import CollectionsIcon from '@mui/icons-material/Collections';
import AuctionItemConfigs from 'configs/pages/auctionItems';
import AuctionStep from 'components/auctions/AuctionStep';
import IntlMessages from '@crema/utility/IntlMessages';
import jwtAxios from '@crema/services/auth/jwt-auth';
import {appIntl} from '@crema/utility/helper/Utils';
import {onUpdateAuctionItem} from 'redux/actions';
import CustomModal from 'components/CustomModal';
import SellIcon from '@mui/icons-material/Sell';
import InfoIcon from '@mui/icons-material/Info';
import {useEffect, useState} from 'react';
import {getData} from 'configs';
import {useDispatch} from 'react-redux';
import Helper from 'helpers/helpers';
import PropTypes from 'prop-types';

export default function AuctionItemModal({
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
  const [categoryLoading, setCategoryLoading] = useState(false);
  const [sellersLoading, setSellersLoading] = useState(false);
  const [isMainImageValid, setIsMainImageValid] = useState(true);
  const [isMinImagesValid, setMinImagesValid] = useState(true);
  const [isMaxImagesValid, setMaxImagesValid] = useState(true);
  const [locationLoading, setLocationLoading] = useState(false);
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
  const {messages} = appIntl('');
  const dispatch = useDispatch();

  const validationSchema = AuctionItemConfigs(
    messages['validation.invalidYoutube'],
  ).validationSchema;

  const searchLocations = (content, location_id = null) => {
    getData(
      `/location/auto_complete${location_id ? '?id=' + location_id : ''}`,
      content,
      setLocationLoading,
      setLocations,
    );
  };
  const searchSellers = (content, seller_id = null) => {
    getData(
      `/sellers/auto_complete${seller_id ? '?id=' + seller_id : ''}`,
      content,
      setSellersLoading,
      setSellers,
    );
  };

  useEffect(() => {
    if (!recordId) {
      searchLocations({});
      searchSellers({});
    }
  }, []);

  useEffect(() => {
    if (recordId) {
      (async function () {
        try {
          setIsLoading(true);
          const res = await jwtAxios.get(`/auction_items/${recordId}`);
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
                  values[key] = value ? value : initialValues[key];
                }
              }
            });
            setImages(oldImages);
            setInitialValues(values);
            searchLocations({}, values.location_id);
            searchSellers({}, values.seller_id);
          }
          setIsLoading(false);
        } catch (error) {
          setIsLoading(false);
        }
      })();
    }
  }, [recordId]);

  const stepThreeValidation = (values, actions) => {
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
    if (activeStep == 3) {
      return await stepThreeValidation(values, actions);
    }
    return true;
  };

  const onSave = (values) => {
    values.deleted_images = deletedImages;
    const auctionFormData = Helper.getFormData(values);
    if (recordId) {
      dispatch(onUpdateAuctionItem(recordId, auctionFormData, toggleOpen));
    }
  };
  const steps = [
    {
      key: 1,
      icon: <SellIcon />,
      label: <IntlMessages id='auction.auctionItemDetails' />,
      children: (
        <AuctionStep
          locations={locations}
          locationLoading={locationLoading}
          categories={categories}
          categoryLoading={categoryLoading}
          sellersLoading={sellersLoading}
          sellers={sellers}
          searchLocations={searchLocations}
          searchSellers={searchSellers}
          setIsLoading={setIsLoading}
        />
      ),
    },
    {
      key: 2,
      icon: <InfoIcon />,
      label: <IntlMessages id='auction.auctionItemDescription' />,
      children: <AuctionDescriptionStep />,
    },
    {
      key: 3,
      icon: <CollectionsIcon />,
      label: <IntlMessages id='auction.auctionItemImages' />,
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
          edit={edit}
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
AuctionItemModal.propTypes = {
  open: PropTypes.bool.isRequired,
  toggleOpen: PropTypes.func,
  width: PropTypes.number,
  recordId: PropTypes.string,
  edit: PropTypes.bool,
};
