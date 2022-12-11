import React, {useLayoutEffect, useState} from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import FilterListRoundedIcon from '@mui/icons-material/FilterListRounded';
import IntlMessages from '@crema/utility/IntlMessages';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function FilterModal({
  open = false,
  toggleOpen,
  width,
  ...rest
}) {
  const [value, setValue] = React.useState([null, null]);
  return (
    <Modal {...rest} open={open} sx={{mx: 2}}>
      <Fade in={open} timeout={500}>
        <Card
          sx={{
            mt: {xs: 5, sm: 15},
            borderRadius: 2,
            mx: 'auto',
            maxWidth: '950px',
            bgcolor: 'background.paper',
            boxShadow: 24,
            position: 'relative',
          }}
        >
          <IconButton
            aria-label='close'
            onClick={toggleOpen}
            sx={{float: 'right', mt: 3}}
          >
            <CloseIcon sx={{fontSize: 18}} />
          </IconButton>
          <CardHeader
            title={
              <Box display='flex' columnGap={3}>
                <FilterListRoundedIcon />
                <Typography variant='h2'>Title</Typography>
              </Box>
            }
          />
          <Divider />
          <CardContent
            sx={{
              maxHeight: {xs: '80vh', md: '70vh'},
              overflowY: 'auto',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                columnGap: '10px',
                justifyContent: 'space-between',
                flexDirection: {xs: 'column', sm: 'row'},
              }}
            >
              <Box>
                <Typography variant='h4'>ID Filtering</Typography>
              </Box>
              <Box>
                <Typography variant='h4'>Data</Typography>
              </Box>
              <Box>
                <Typography variant='h4'>Date Range</Typography>
              </Box>
            </Box>
          </CardContent>
          <Divider />
          <CardActions sx={{justifyContent: 'end'}}>
            <Button size='small'>
              <IntlMessages id='common.reset' />
            </Button>
            <Button size='small' color='primary'>
              Reset
            </Button>
            <Button size='small' color='primary'>
              Reset
            </Button>
          </CardActions>
        </Card>
      </Fade>
    </Modal>
  );
}

FilterModal.propTypes = {
  open: PropTypes.bool.isRequired,
  width: PropTypes.number,
  toggleOpen: PropTypes.func.isRequired,
};
