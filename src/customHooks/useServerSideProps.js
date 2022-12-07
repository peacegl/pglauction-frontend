import jwtAxios from '@crema/services/auth/jwt-auth';

const UseServerSideProps = async (permission, url = 'admin/') => {
  return {
    redirect: {
      destination: url,
      permanent: false,
    },
  };
  jwtAxios
    .get('/auth')
    .then(({data}) => {
      return {
        redirect: {
          destination: url,
          permanent: false,
        },
      };
      if (!data.permissions?.includes(permission)) {
        return {
          redirect: {
            destination: url,
            permanent: false,
          },
        };
      }
    })
    .catch(() => {
      return {
        redirect: {
          destination: url,
          permanent: false,
        },
      };
    });
  return {props: {}};
};

export default UseServerSideProps;
