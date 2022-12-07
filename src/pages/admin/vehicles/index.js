import React from 'react';
import AppPage from '../../../@crema/hoc/AppPage';
import asyncComponent from '../../../@crema/utility/asyncComponent';

const Vehicles = asyncComponent(() =>
  import('../../../modules/admin/vehicles'),
);
export default AppPage(() => <Vehicles />);

// import {UseServerSideProps} from '../../../customHooks';
// import jwtAxios from '@crema/services/auth/jwt-auth';
// export async function getServerSideProps(context) {
//   // try {
//   const res = await jwtAxios.get(`/auth`);
//   console.log('dsfasdfd', res.data);
//   if (res.status === 200) {
//     if (data.permissions?.includes('view_vehicles')) {
//       return {props: {}};
//     }
//   }
//   return {
//     redirect: {
//       destination: '/admin',
//       permanent: false,
//     },
//   };

//   // } catch (error) {
//   //   return {
//   //     redirect: {
//   //       destination: '/admin',
//   //       permanent: false,
//   //     },
//   //   };
//   // }
//   jwtAxios
//     .get('/auth')
//     .then(({data}) => {
//       console.log('dsfasdfd', data);
//       if (data.permissions?.includes('view_vehicles')) {
//         return {props: {}};
//       }
//       return {
//         redirect: {
//           destination: '/admin',
//           permanent: false,
//         },
//       };
//     })
//     .catch(() => {
//       return {
//         redirect: {
//           destination: '/admin',
//           permanent: false,
//         },
//       };
//     });
//   return {
//     redirect: {
//       destination: '/admin',
//       permanent: false,
//     },
//   };
//   // return UseServerSideProps('view_vehicles');
// }
