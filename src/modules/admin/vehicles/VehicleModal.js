import AuctionDescriptionStep from 'components/auctions/AuctionDescriptionStep';
import AuctionImagesStep from '../../../components/auctions/AuctionImagesStep';
import AuctionStep from '../../../components/auctions/AuctionStep';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import {onInsertVehicle, onUpdateVehicle} from 'redux/actions';
import CollectionsIcon from '@mui/icons-material/Collections';
import VehicleConfigs from '../../../configs/pages/vehicles';
import IntlMessages from '@crema/utility/IntlMessages';
import jwtAxios from '@crema/services/auth/jwt-auth';
import {appIntl} from '@crema/utility/helper/Utils';
import SellIcon from '@mui/icons-material/Sell';
import InfoIcon from '@mui/icons-material/Info';
import VehicleStepOne from './VehicleStepOne';
import CustomModal from '../../CustomModal';
import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import Helper from 'helpers/helpers';
import PropTypes from 'prop-types';
import {getData} from '../../../configs';

export default function VehicleModal({
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
  const [isMainImageValid, setIsMainImageValid] = useState(true);
  const [isMinImagesValid, setMinImagesValid] = useState(true);
  const [isMaxImagesValid, setMaxImagesValid] = useState(true);
  const [locationLoading, setLocationLoading] = useState(false);
  const [categoryLoading, setCategoryLoading] = useState(false);
  const [locations, setLocations] = useState([]);
  const [categories, setCategories] = useState([]);
  const [sellersLoading, setSellersLoading] = useState(false);
  const [sellers, setSellers] = useState([]);
  const [makesLoading, setMakesLoading] = useState(false);
  const [makes, setMakes] = useState([]);
  const [modelsLoading, setModelsLoading] = useState(false);
  const [models, setModels] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [initialValues, setInitialValues] = useState({
    vin: '',
    lot_number: '',
    year: '',
    model: '',
    color: '',
    engine_type: '',
    cylinders: '',
    vehicle_type: '',
    seller_id: '',
    location_id: '',
    category_id: '',
    title: '',
    subtitle: '',
    // start_date: '',
    // end_date: '',
    minimum_bid: '',
    buy_now_price: '',
    description: '',
    youtube_url: '',
    note: '',
    main_image: '',
    images: [],
  });
  const {messages} = appIntl('');
  const validationSchema = VehicleConfigs(
    messages['validation.invalidYoutube'],
  ).validationSchema;
  const dispatch = useDispatch();

  const searchLocations = (content, location_id = null) => {
    getData(
      `/location/auto_complete${location_id ? '?id=' + location_id : ''}`,
      content,
      setLocationLoading,
      setLocations,
    );
  };
  const searchCategories = (content, category_id = null) => {
    getData(
      `/category/auto_complete${category_id ? '?id=' + category_id : ''}`,
      content,
      setCategoryLoading,
      setCategories,
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

  const searchMakes = (content, make_id = null) => {
    getData(
      `/make/auto_complete${make_id ? '?id=' + make_id : ''}`,
      content,
      setMakesLoading,
      setMakes,
    );
  };
  const searchModels = (content, model_id = null) => {
    getData(
      `/model/auto_complete${model_id ? '?id=' + model_id : ''}`,
      content,
      setModelsLoading,
      setModels,
    );
  };

  useEffect(() => {
    if (!recordId) {
      searchLocations({});
      searchCategories({});
      searchSellers({});
      searchModels({});
      searchMakes({});
    }
  }, [recordId]);

  useEffect(() => {
    if (recordId) {
      (async function () {
        try {
          setIsLoading(true);
          const res = await jwtAxios.get(`/vehicles/${recordId}`);
          if (res.status === 200 && res.data.result) {
            let values = {};
            let oldImages = [];
            Object.entries(res.data.data).forEach(([key, value]) => {
              if (Object.keys(initialValues).includes(key)) {
                values[key] = value ? value : initialValues[key];
              }
              if (typeof value === 'object' && value != null)
                Object.entries(value).forEach(([ikey, ivalue]) => {
                  if (Object.keys(initialValues).includes(ikey)) {
                    if (ikey == 'images') {
                      ivalue?.forEach((item) => {
                        if (item.type == 'sub_image') {
                          oldImages.push({preview: item.path, id: item.id});
                        } else if (item.type == 'main_image') {
                          setMainImage({preview: item.path, id: item.id});
                        }
                      });
                    } else {
                      values[ikey] = ivalue ? ivalue : initialValues[ikey];
                    }
                  }
                });
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

  const stepFourValidation = (values, actions) => {
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
    if (activeStep == 4) {
      return await stepFourValidation(values, actions);
    }
    return true;
  };

  const onSave = (values) => {
    values.deleted_images = deletedImages;
    const vehicleFormData = Helper.getFormData(values);
    if (recordId) {
      dispatch(onUpdateVehicle(recordId, vehicleFormData, toggleOpen));
    } else {
      dispatch(onInsertVehicle(vehicleFormData, toggleOpen));
    }
  };
  const steps = [
    {
      key: 1,
      icon: <DirectionsCarIcon />,
      label: <IntlMessages id='vehicle.vehicleProperties' />,
      children: (
        <VehicleStepOne
          makes={makes}
          makesLoading={makesLoading}
          models={models}
          modelsLoading={modelsLoading}
        />
      ),
    },
    {
      key: 2,
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
          searchCategories={searchCategories}
          searchLocations={searchLocations}
          searchSellers={searchSellers}
          setIsLoading={setIsLoading}
        />
      ),
    },
    {
      key: 3,
      icon: <InfoIcon />,
      label: <IntlMessages id='auction.auctionItemDescription' />,
      children: <AuctionDescriptionStep />,
    },
    {
      key: 4,
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
          isEdit={edit}
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
VehicleModal.propTypes = {
  open: PropTypes.bool.isRequired,
  toggleOpen: PropTypes.func,
  width: PropTypes.number,
  recordId: PropTypes.string,
  edit: PropTypes.bool,
};
