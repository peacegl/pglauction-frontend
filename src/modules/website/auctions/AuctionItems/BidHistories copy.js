import IntlMessages from '@crema/utility/IntlMessages'
import { Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material'
import React from 'react'
// import { Fonts } from 'shared/constants/AppEnums'
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import HotelIcon from '@mui/icons-material/Hotel';
import RepeatIcon from '@mui/icons-material/Repeat';
import TimelineOppositeContent, {
    timelineOppositeContentClasses,
  } from '@mui/lab/TimelineOppositeContent';


function BidHistories({showHistories,setShowHistories}) {

  return (
    <Dialog
    open={showHistories}
    onClose={() => {}}
    width={800}
  >
    <DialogTitle>
      <Typography
        sx={{
          mb: 3,
        //   fontWeight: Fonts.SEMI_BOLD,
        }}
        id='alert-dialog-title'
      >
       Bid Histories
      </Typography>
    </DialogTitle>
    <DialogContent
      sx={{color: 'text.secondary', fontSize: 14}}
      width={800}
      id='alert-dialog-description'
    >
    <Box style={{padding:2,
    minHeight: 400,
    maxHeight:'70dvh',
    overflowY: 'auto',
    width:'100%',
    }}>
    <Timeline
      sx={{
        [`& .${timelineOppositeContentClasses.root}`]: {
          flex: 0.2,
        },
      }}
    >
     {Array.from(Array(10).keys()).map((item, index) => (
         <TimelineItem key={index}>
         <TimelineOppositeContent color="textSecondary" sx={{whiteSpace:'nowrap'}} >
           09:30 am
         </TimelineOppositeContent>
         <TimelineSeparator>
           <TimelineDot />
           <TimelineConnector />
         </TimelineSeparator>
         <TimelineContent>Eat</TimelineContent>
       </TimelineItem>
      ))}
    </Timeline>
    </Box>
    </DialogContent>
    <DialogActions
      sx={{
        pb: 5,
        px: 6,
      }}
    >
      <Button
        onClick={() => setShowHistories(false)}
      >
        <IntlMessages id='common.close' />
      </Button>
    </DialogActions>
  </Dialog>
  )
}

export default BidHistories