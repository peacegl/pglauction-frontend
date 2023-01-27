import React, {useState} from 'react';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  Radio,
  RadioGroup,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SimCardDownloadIcon from '@mui/icons-material/SimCardDownload';

import IntlMessages from '@crema/utility/IntlMessages';
import PropTypes from 'prop-types';

const SectionItem = ({title, children, ...reset}) => {
  return (
    <Card
      variant='outlined'
      sx={{
        borderRadius: 1,
        width: '100%',
        maxWidth: '400px',
        height: {sm: '450px'},
        overflow: 'auto',
      }}
      flex={1}
    >
      <CardHeader
        title={
          <Typography sx={{textAlign: 'center'}} variant='h4'>
            {title}
          </Typography>
        }
      />
      <CardContent {...reset}>{children}</CardContent>
    </Card>
  );
};

SectionItem.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  children: PropTypes.node,
};

export default function DownloadModal({
  open = false,
  toggleOpen,
  title,
  onDownload,
  setExportType,

  ...rest
}) {
  return (
    <Modal {...rest} open={open} sx={{mx: 2}}>
      <Fade in={open} timeout={50}>
        <Card
          sx={{
            mt: {xs: 2, sm: 8, md: 15},
            borderRadius: 2,
            mx: 'auto',
            maxWidth: {
              xs: '400px',
              sm: '350px',
            },
            bgcolor: 'background.paper',
            boxShadow: 24,
            position: 'relative',
          }}
        >
          <IconButton
            aria-label='close'
            onClick={toggleOpen}
            sx={{float: 'right', mt: 1}}
          >
            <CloseIcon sx={{fontSize: 18}} />
          </IconButton>
          <CardHeader
            title={
              <Box display='flex' columnGap={3}>
                <SimCardDownloadIcon />
                <Typography variant='h1'>{title}</Typography>
              </Box>
            }
          />
          <Divider />
          <CardContent>
            <FormControl component='fieldset'>
              <FormLabel component='legend'>Type of report</FormLabel>
              <RadioGroup
                aria-label='gender'
                defaultValue='pdf'
                name='radio-buttons-group'
              >
                <FormControlLabel
                  value='pdf'
                  control={<Radio />}
                  label='PDF'
                  onClick={() => {
                    setExportType('pdf');
                  }}
                />
                <FormControlLabel
                  value='excel'
                  control={<Radio />}
                  label='EXCEL'
                  onClick={() => {
                    setExportType('excel');
                  }}
                />
              </RadioGroup>
            </FormControl>
          </CardContent>
          <Divider />
          <CardActions sx={{justifyContent: 'end', mx: 2}}>
            <Button
              size='small'
              variant='outlined'
              color='primary'
              onClick={toggleOpen}
            >
              <IntlMessages id='common.cancel' />
            </Button>

            <Button
              size='small'
              variant='contained'
              onClick={() => {
                onDownload();
                setExportType('pdf');
                toggleOpen();
              }}
            >
              <IntlMessages id='common.download' />
            </Button>
          </CardActions>
        </Card>
      </Fade>
    </Modal>
  );
}

DownloadModal.propTypes = {
  open: PropTypes.bool.isRequired,
  toggleOpen: PropTypes.func.isRequired,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  onDownload: PropTypes.func,
  setExportType: PropTypes.func,
};
