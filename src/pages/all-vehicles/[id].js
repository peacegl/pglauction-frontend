import React from 'react';
import Head from 'next/head';
import AppPage from '../../@crema/hoc/WebPage';
import jwtAxios from '@crema/services/auth/jwt-auth';
import asyncComponent from '../../@crema/utility/asyncComponent';

const VehicleDetail = asyncComponent(() =>
  import('../../modules/website/vehicles/VehicleDetail'),
);
export default AppPage((props) => (
  <>
    <Head>
      <meta
        property='og:title'
        content={`${props.vehicle.year} ${props.vehicle?.make} ${props.vehicle.model}`}
      />
      <meta
        property='og:url'
        content={`https://unitedtradingcars.com/all-vehicles/${props.vehicle.id}`}
      />
      <meta property='og:description' content="United Used Car's" />
      <meta
        property='og:image'
        content={props.vehicle?.images ? props.vehicle?.images[0]?.path : ''}
      />
    </Head>
    <VehicleDetail />
  </>
));

export async function getServerSideProps(context) {
  let vehicle = {};
  try {
    const res = await jwtAxios.get(`website/vehicles/${context.query.id}`);
    if (res.status === 200 && res.data.result) {
      vehicle = res.data.data;
    }
  } catch (error) {}
  return {props: {vehicle}};
}
