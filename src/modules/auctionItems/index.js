import React from 'react';
import ProductListing from './ProductListing';
import Container from '@mui/material/Container';
import ProductsSidebar from './ProductsSidebar';
import AppsContainer from '../../@crema/core/AppsContainer';

const Products = () => {
  return (
    <Container maxWidth='xl' sx={{mt: 4}}>
      <AppsContainer sidebarContent={<ProductsSidebar />}>
        <ProductListing />
      </AppsContainer>
    </Container>
  );
};

export default Products;
