import React, {useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import {useIntl} from 'react-intl';
import CloseIcon from '@mui/icons-material/Close';
import {DateTimePicker} from '@mui/x-date-pickers/DateTimePicker';

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  Slide,
  TextField,
  Typography,
} from '@mui/material';
import {  LoadingButton} from '@mui/lab';

import {Fonts} from 'shared/constants/AppEnums';
import IntlMessages from '@crema/utility/IntlMessages';
import jwtAxios from '@crema/services/auth/jwt-auth';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});
const AuctionRecyleDialog = ({open, setOpenModal, fetchData, auctionData}) => {
  const [submitting, setSubmitting] = useState(false);
  const [auctionPayload, setAuctionPayload] = useState({
    auction_id: 'null',
    start_date: 'null',
    end_date: 'null',
    status: 'null',
  });
  const {messages} = useIntl();


  useEffect(() => {
    setAuctionPayload({
      auction_id: auctionData.id,
      start_date: auctionData.start_date,
      end_date: auctionData.end_date,
      status: auctionData.status,
    });
  }, [open]);
  const submit = async () => {
    try {
      setSubmitting(true);
      const res = await jwtAxios.put('/auctions/recycle',auctionPayload);
      setSubmitting(false);
      fetchData();
      setOpenModal(false);
    } catch (error) {
      setSubmitting(false);
    }
  };
  return (
    <Dialog TransitionComponent={Transition} open={open} setOpen={() => {}}>
      <DialogTitle
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography
          sx={{
            mb: 3,
            fontWeight: Fonts.SEMI_BOLD,
          }}
          id='alert-dialog-title'
        >
          Recycle Auction
        </Typography>
        <IconButton
          aria-label='close'
          color='inherit'
          size='small'
          onClick={() => {
            setOpenModal(false);
          }}
        >
          <CloseIcon fontSize='inherit' />
        </IconButton>
      </DialogTitle>
      <DialogContent
        sx={{
          color: 'text.secondary',
          fontSize: 14,
          padding: 5,
          width: '500px',
          minHeight: '300px',
        }}
        id='alert-dialog-description'
      >
        <TextField
          select
          placeholder={messages['common.statusPlaceholder']}
          label={<IntlMessages id='common.status' />}
          variant='outlined'
          size='small'
          value={auctionPayload.status}
          sx={{width: '100%', marginTop: 5, marginBottom: 2}}
          onChange={(e) => {
            setAuctionPayload({...auctionPayload, status: e.target.value});
          }}
        >
          <MenuItem value='active'>Active</MenuItem>
          <MenuItem value='pending'>Pending</MenuItem>
        </TextField>

        <DateTimePicker
          onChange={(value) =>
            setAuctionPayload({...auctionPayload, start_date: value})
          }
          value={auctionPayload.start_date}
          renderInput={(params) => {
            return <TextField {...params} label='Start Date'
                variant='outlined'
                size='small'
                sx={{width: '100%', marginTop: 5, marginBottom: 2}}
            />;
          }}
        />
          <DateTimePicker
          onChange={(value) =>
            setAuctionPayload({...auctionPayload, end_date: value})
          }
          value={auctionPayload.end_date}
          renderInput={(params) => {
            return <TextField {...params} label='End Date'
                variant='outlined'
                size='small'
                sx={{width: '100%', marginTop: 5, marginBottom: 2}}
            />;
          }}
        />
      </DialogContent>
      <DialogActions
        sx={{
          pb: 5,
          px: 6,
        }}
      >
        <LoadingButton
          loading={submitting}
          variant='contained'
          sx={{
            fontWeight: Fonts.MEDIUM,
          }}
          onClick={submit}
          color='primary'
          autoFocus
        >
          Submit
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default AuctionRecyleDialog;
