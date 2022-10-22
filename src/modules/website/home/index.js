import * as React from 'react';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import CategoryList from '../../../components/categories/CategoryList';

export default function Home() {
  return (
    <Container maxWidth='xl' sx={{mt: 3}}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Typography variant='h5' sx={{mb: 2}}>
            Categories
          </Typography>
          <Divider />
          <CategoryList />
        </Grid>
        <Grid item xs={8}>
          <Paper>xs=8</Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
