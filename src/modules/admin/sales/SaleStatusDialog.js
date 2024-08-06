import React, {useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import {useIntl} from 'react-intl';
import CloseIcon from '@mui/icons-material/Close';

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
import {LoadingButton} from '@mui/lab';

import { Fonts } from 'shared/constants/AppEnums';
import IntlMessages from '@crema/utility/IntlMessages';
import jwtAxios from '@crema/services/auth/jwt-auth';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});
const SaleStatusDialog = ({open, setOpen, selectedIds,setSelected,fetchData}) => {
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState('');
  const {messages} = useIntl();
 
const submit = async () => {
    try {
      setSubmitting(true);
      const res = await jwtAxios.put('/sales/change-status', {sales_ids: selectedIds, status});
      setSubmitting(false);
      setSelected([]);
      fetchData();
      setOpen(false);
    } catch (error) {
      setSubmitting(false);
    }
    };
  return (
    <Dialog TransitionComponent={Transition} open={open} setOpen={() => {}}>
      <DialogTitle sx={{display:'flex',alignItems:'center', justifyContent:'space-between'}} >
        <Typography
          sx={{
            mb: 3,
            fontWeight: Fonts.SEMI_BOLD,
          }}
          id='alert-dialog-title'
        >
          Sale Status
        </Typography>
        <IconButton
                aria-label='close'
                color='inherit'
                size='small'
                onClick={() => {
                  setOpen(false);
                }}
              >
                <CloseIcon fontSize='inherit' />
              </IconButton>
      </DialogTitle>
      <DialogContent
        sx={{color: 'text.secondary', fontSize: 14, padding:5, width: '400px',minHeight:'200px'}}
        id='alert-dialog-description'
      >
        <TextField
          select
          placeholder={messages['common.statusPlaceholder']}
          label={<IntlMessages id='common.status' />}
          variant='outlined'
          size='small'
          value={status}
          sx={{width: '100%',marginTop:5,marginBottom:2}}
          onChange={(e) => {
         setStatus(e.target.value);
          }}
        >
          <MenuItem value='sold'>Sold</MenuItem>
          <MenuItem value='cancelled'>Cancelled</MenuItem>
          <MenuItem value='pending'>Pending</MenuItem>
        </TextField>
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

export default SaleStatusDialog;
