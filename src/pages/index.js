// import React from 'react';
// import AppPage from '../@crema/hoc/WebPage';
// import asyncComponent from '../@crema/utility/asyncComponent';

// const Home = asyncComponent(() => import('../modules/website/home/index'));
// export default AppPage(() => <Home />);

import React from 'react';
import AppPage from '../@crema/hoc/WebPage';
import asyncComponent from '../@crema/utility/asyncComponent';

const Home = asyncComponent(() => import('../modules/auctionItems'));
export default AppPage(() => <Home />);
