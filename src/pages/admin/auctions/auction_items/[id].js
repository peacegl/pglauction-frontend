import React from 'react';
import AppPage from '@crema/hoc/AppPage';
import asyncComponent from '@crema/utility/asyncComponent';
import jwtAxios from '@crema/services/auth/jwt-auth';

const AuctionVehicleInfo = asyncComponent(() =>
  import('../../../../modules/admin/auctions/AuctionVehiclesInfo/index'),
);

export default AppPage((props) => (
  <AuctionVehicleInfo vehicle={props.vehicle} />
));
export async function getServerSideProps(context) {
  let vehicle = {};
  try {
    const res = await jwtAxios.get(`website/auction_items/${context.query.id}`);
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
