import React from 'react';
import Head from 'next/head';
import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import AppPage from '@crema/hoc/WebPage';
import jwtAxios from '@crema/services/auth/jwt-auth';
import asyncComponent from '@crema/utility/asyncComponent';
import {GET_WEB_VEHICLE_VIEW} from 'shared/constants/ActionTypes';
import vehicles from 'pages/vehicles';
import AppPageMeta from '@crema/core/AppPageMeta';


// export async function generateMetadata({params, searchParams}, parent) {
//   try {
//     const id = params.id;
    
//     const res = await jwtAxios.get(`website/vehicles/${id}`);
//     console.log('vehicle', params,res);
//     if (res.status === 200 && res.data.result) {
//       const vehicle = res.data.data;
//       console.log('vehicle', vehicle);

//       return {
//         title: `${vehicle.year} ${vehicle?.make} ${vehicle.model}`,
//         openGraph: {
//           title: `${vehicle.year} ${vehicle?.make} ${vehicle.model}`,
//           description: `${vehicle.year} ${vehicle?.make} ${vehicle.model}`,
//           url: 'http://pglautobid.com/',
//           siteName: 'PGL AutoBid',
//           images: vehicles.images.map((image) => image.path),
//         },
//       };
//     }
//   } catch (error) {}
//   // read route params
// }

const VehicleDetail = asyncComponent(() =>
  import('../../modules/website/vehicles/VehicleDetail'),
);
export default AppPage((props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (props.vehicle?.id) {
      dispatch({
        type: GET_WEB_VEHICLE_VIEW,
        payload: props.vehicle,
      });
    }
  }, [dispatch, props.vehicle]);
  return (
    <>
      {/* <Head>
        <meta
          property='og:title'
          content={`${props.vehicle.year} ${props.vehicle?.make} ${props.vehicle.model}`}
        />
        <meta
          property='og:url'
          content={`https://unitedtradingcars.com/all-vehicles/${props.vehicle.id}`}
        />
        <meta property='og:description' content='Your Company Name' />
        <meta
          property='og:image'
          content={props.vehicle?.images ? props.vehicle?.images[0]?.path : ''}
        />
      </Head> */}
      <AppPageMeta 
      title={`${props.vehicle.year} ${props.vehicle?.make} ${props.vehicle.model}`} 
      images={props.vehicle?.images.map((image) => image.path)}
      description={`${props.vehicle.vin} ${props.vehicle?.lot_number} ${props.vehicle?.location?.name}`}
      />
      <VehicleDetail />
    </>
  );
});

export async function getServerSideProps(context) {
  let vehicle = {};
  try {
    const res = await jwtAxios.get(`website/vehicles/${context.query.id}`);
    if (res.status === 200 && res.data.result) {
      vehicle = res.data.data;
    }
  } catch (error) {}
  if (!vehicle.id) {
    return {
      notFound: true,
    };
  }
  return {props: {vehicle}};
}
