import React from 'react';
import AppPage from '@crema/hoc/WebPage';
import jwtAxios from '@crema/services/auth/jwt-auth';
import asyncComponent from '@crema/utility/asyncComponent';

const SingleAuctionItem = asyncComponent(() =>
  import('modules/website/auctions/AuctionItems/SingleAuctionItem'),
);

export default AppPage((props) => (
  <SingleAuctionItem vehicle={props.vehicle} />
));
export async function getServerSideProps(context) {
  let vehicle = {};
  try {
    const res = await jwtAxios.get(`website/auction_items/${context.query.id}`);
    if (res.status === 200 && res.data.result) {
      vehicle = {...res.data.data, ...res.data.data.auction};
    }
  } catch (error) {}
  if (!vehicle.id) {
    return {
      notFound: true,
    };
  }
  return {props: {vehicle}};
}
