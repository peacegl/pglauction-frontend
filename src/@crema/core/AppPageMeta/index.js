import React from 'react';
import PropTypes from 'prop-types';
import {NextSeo} from 'next-seo';

const SITE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://qa-blog.mastersindia.co';

const AppPage = ({children, ...rest}) => {
  const {
    title='PGL AutoBid',
    description='PGL AutoBid',
    images=[],
    twitter='@utc',
    category = 'Admin Panel',
    tags = [
      'Live Auction',
      'PGL',
      'Vehicle',
      'Vehicle Auction',
      'UTC',
      'United Used Cars',
      'AutoBid',
      "pgl's autobid",
    ],
    site_name = 'PGL AutoBid',
    url = 'https://pglautobid.com',
  } = rest;
  

  return (
    <>
      <NextSeo
        title={title}
        description={description}
        canonical='https://www.canonical.ie/'
        openGraph={{
          url ,
          title: title,
          description: description,
          images,
          site_name ,
        }}
        tags={tags}
        category={category}
        twitter={{
          handle: twitter,
          site: '@utc',
          cardType: 'summary_large_image',
        }}
      />
      {children}
    </>
  );
};

export default AppPage;

AppPage.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  description: PropTypes.string,
};
