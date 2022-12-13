import AuctionDescriptionStep from 'components/auctions/AuctionDescriptionStep';
import AuctionImagesStep from 'components/auctions/AuctionImagesStep';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import {onInsertVehicle, onUpdateVehicle} from 'redux/actions';
import CollectionsIcon from '@mui/icons-material/Collections';
import AuctionStep from 'components/auctions/AuctionStep';
import IntlMessages from '@crema/utility/IntlMessages';
import jwtAxios from '@crema/services/auth/jwt-auth';
import {appIntl} from '@crema/utility/helper/Utils';
import VehicleConfigs from 'configs/pages/vehicles';
import VehicleStepThree from './VehicleStepThree';
import CustomModal from 'components/CustomModal';
import SellIcon from '@mui/icons-material/Sell';
import InfoIcon from '@mui/icons-material/Info';
import VehicleStepTwo from './VehicleStepTwo';
import VehicleStepOne from './VehicleStepOne';
import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import Helper from 'helpers/helpers';
import PropTypes from 'prop-types';
import {getData} from 'configs';

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
  const [locations, setLocations] = useState([]);
  const [sellerLoading, setSellerLoading] = useState(false);
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
    make: '',
    model: '',
    exterior_color: '',
    interior_color: '',
    engine_type: '',
    cylinder: '',
    transmission: '',
    status: '',
    location_id: '',
    seller_id: '',
    price: '',
    document_type: '',
    primary_damage: '',
    odometer: '',
    fuel: '',
    body_style: '',
    drive_type: '',
    keys: 0,
    test_drive: 0,
    is_featured: 0,
    is_best_selling: 0,
    description: '',
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
  const searchSellers = (content, seller_id = null) => {
    getData(
      `/sellers/auto_complete${seller_id ? '?id=' + seller_id : ''}`,
      content,
      setSellerLoading,
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
      searchSellers({});
      // searchModels({});
      // searchMakes({});
    }
  }, []);

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
              if (typeof value === 'object' && value != null)
                Object.entries(value).forEach(([ikey, ivalue]) => {
                  if (Object.keys(initialValues).includes(ikey)) {
                    values[ikey] = ivalue ? ivalue : initialValues[ikey];
                  }
                });
            });
            setImages(oldImages);
            setInitialValues(values);
            searchLocations({}, values.location_id);
            searchSellers({}, values.seller_id);
            // searchMakes({}, values.make_id);
            // searchModels({make_id: values.make_id}, values.model_id);
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
        // makes={makes}
        // makesLoading={makesLoading}
        // models={models}
        // modelsLoading={modelsLoading}
        // searchModels={searchModels}
        // searchMakes={searchMakes}
        />
      ),
    },
    {
      key: 2,
      icon: <SellIcon />,
      label: <IntlMessages id='vehicle.vehicleDetails' />,
      children: (
        <VehicleStepTwo
          locations={locations}
          locationLoading={locationLoading}
          searchLocations={searchLocations}
          sellers={sellers}
          sellerLoading={sellerLoading}
          searchSellers={searchSellers}
          setIsLoading={setIsLoading}
        />
      ),
    },
    {
      key: 3,
      icon: <InfoIcon />,
      label: <IntlMessages id='vehicle.vehicleDescription' />,
      children: <VehicleStepThree />,
    },
    {
      key: 4,
      icon: <CollectionsIcon />,
      label: <IntlMessages id='vehicle.images' />,
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
