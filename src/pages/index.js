import React from 'react';
import Head from 'next/head';
import AppPage from '@crema/hoc/WebPage';
import asyncComponent from '@crema/utility/asyncComponent';

const Vehicles = asyncComponent(() => import('../modules/website/vehicles'));
export default AppPage(() => (
  <>
    <Head>
      <meta property='og:title' content='United Used Cars' />
      <meta property='og:url' content='https://unitedtradingcars.com' />
      <meta property='og:description' content='United Used Cars' />
      <meta
        property='og:image'
        content='https://unitedtradingcars.com/logo.png'
      />
    </Head>
    <Vehicles />
  </>
));
