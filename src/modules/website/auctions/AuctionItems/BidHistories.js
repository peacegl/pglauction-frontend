import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog, {DialogProps} from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {useEffect} from 'react';
import {useRef} from 'react';

import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent, {
  timelineOppositeContentClasses,
} from '@mui/lab/TimelineOppositeContent';
import {Box, CircularProgress, Typography} from '@mui/material';
import jwtAxios from '@crema/services/auth/jwt-auth';
import { FETCH_ERROR } from 'shared/constants/ActionTypes';
import { useState } from 'react';
import { moneyFormater } from 'configs';

export default function ScrollDialog({showHistories, setShowHistories,auction_items_id}) {
  const handleClose = () => {
    setShowHistories(false);
  };

  const descriptionElementRef = useRef(null);
  const [histories, setHistories] = useState([]);
  const [loadingHistories, setLoadingHistories] = useState(false);
  useEffect(() => {
    if (showHistories) {
      fetchHistories()
      const {current: descriptionElement} = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [showHistories]);


const fetchHistories = async () => {
  try {
    setLoadingHistories(true);
    const {data} = await jwtAxios.get(`/website/bid-histories/${auction_items_id}` );
    setHistories(data);
  } catch (error) {
    if (error?.response?.data?.message) {
      dispatch({type: FETCH_ERROR, payload: error.response.data.message});
    } else {
      dispatch({type: FETCH_ERROR, payload: error.message});
    }
  }
  setLoadingHistories(false);
};

 
  return (
    <Dialog
      open={showHistories}
      onClose={handleClose}
      scroll={'paper'}
      aria-labelledby='scroll-dialog-title'
      aria-describedby='scroll-dialog-description'
    >
      <DialogTitle id='scroll-dialog-title' sx={{fontSize: '18px',fontWeight: '600'}}>Bid Histories</DialogTitle>
      <DialogContent
        dividers
        sx={{
          width: '600px',
          minHeight: '400px',
         
        }}
      >
        <DialogContentText
          id='scroll-dialog-description'
          ref={descriptionElementRef}
          tabIndex={-1}
        >
          {
             loadingHistories && ( <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <CircularProgress />
            </Box>)
            
          }
          <Timeline>
            {histories.map((item, index) => (
              <TimelineItem key={index}>
                <TimelineOppositeContent
                  color='textSecondary'
                  sx={{whiteSpace: 'nowrap'}}
                >
                 
                  {item.buyer?.username}
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent sx={{py: '7px', px: 2}}>
                  <Typography variant='h4' component='span' >
                  {moneyFormater(item.amount)}
                  </Typography>
                  <Typography>{item.created_at}</Typography>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
