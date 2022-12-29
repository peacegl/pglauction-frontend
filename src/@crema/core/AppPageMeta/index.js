import React from 'react';
import PropTypes from 'prop-types';
import {NextSeo} from 'next-seo';

const SITE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://qa-blog.mastersindia.co';

const defaultTitle = 'UTC Vehicles';
const defaultDescription = 'United Trading Cars';
const defaultImage = 'logo.png';
const defaultTwitter = '@utc';
const defaultSep = ' | ';

const AppPage = ({children, ...rest}) => {
  const {
    title,
    description,
    image,
    category = 'Admin Panel',
    tags = [
      'Live Auction',
      'PGL',
      'Vehicle',
      'Vehicle Auction',
      'UTC',
      'United Trading Cars',
    ],
  } = rest;
  const theTitle = title
    ? title?.length > 48
      ? title
      : title + defaultSep + defaultTitle
    : defaultTitle;
  const theDescription = description
    ? description.substring(0, 155)
    : defaultDescription;
  const theImage = image ? `${SITE_URL}${image}` : defaultImage;

  return (
    <>
      <NextSeo
        title={theTitle}
        description={theDescription}
        canonical='https://www.canonical.ie/'
        openGraph={{
          url: 'https://www.url.ie/a',
          title: theTitle,
          description: theDescription,
          images: [
            {
              url: theImage,
              width: 800,
              height: 600,
              alt: 'United Trading Cars',
              type: 'image/jpeg',
            },
            {
              url: theImage,
              width: 900,
              height: 800,
              alt: 'United Trading Cars',
              type: 'image/jpeg',
            },
          ],
          site_name: 'United Trading Cars',
        }}
        tags={tags}
        category={category}
        twitter={{
          handle: defaultTwitter,
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
