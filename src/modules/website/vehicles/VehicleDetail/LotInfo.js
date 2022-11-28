import React, {useState} from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';
import {alpha, Card, CardHeader, Typography, useTheme} from '@mui/material';
import {useSelector} from 'react-redux';
import {PropTypes} from 'prop-types';

// export default function SaleInfo() {
//   const theme = useTheme();
//   const {vehicle = {}} = useSelector(({webVehicles}) => webVehicles);

//   const ListItem = () => {
//     return (
//       <ListItem
//         key={value}
//         secondaryAction={
//           <IconButton edge='end' aria-label='comments'>
//             <CommentIcon />
//           </IconButton>
//         }
//         disablePadding
//       >
//         Heed
//       </ListItem>
//     );
//   };

//   return (
//     <Card sx={{borderRadius: 1, boxShadow: 1, m: 0}}>
//       <CardHeader
//         sx={{
//           backgroundColor: alpha(theme.palette.primary.main, 0.9),
//           color: 'white',
//           p: 2.5,
//         }}
//         title={
//           <Typography
//             component='div'
//             fontSize='16px'
//             fontWeight='bold'
//             overflow='hidden'
//           >
//             Sale Information
//           </Typography>
//         }
//       />
//       <List sx={{width: '100%', bgcolor: 'background.paper'}}></List>
//     </Card>
//   );
// }

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TabPanel from '@mui/lab/TabPanel';
import {TabContext, TabList} from '@mui/lab';
import {indexof} from 'stylis';
import {checkPropTypes} from 'prop-types';

export default function SaleInfo() {
  const [value, setValue] = useState('lot_info');
  const theme = useTheme();
  const {vehicle = {}} = useSelector(({webVehicles}) => webVehicles);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const Item = ({label, value}) => {
    return (
      <ListItem
        key={value}
        sx={{bb: 1}}
        secondaryAction={<Typography>{value}</Typography>}
        disablePadding
      >
        {label}
      </ListItem>
    );
  };

  Item.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
  };

  const SingleTab = (index, label) => {
    return (
      <Tab
        label={
          <Typography
            component='div'
            fontSize='16px'
            fontWeight='bold'
            overflow='hidden'
            sx={{
              textTransform: 'capitalize',
              color:
                value == index
                  ? theme.palette.primary.contrastText
                  : theme.palette.primary.main,
            }}
          >
            {label}
          </Typography>
        }
        value={index}
        sx={{
          backgroundColor:
            value == index
              ? theme.palette.primary.main
              : theme.palette.primary.contrastText,
        }}
      />
    );
  };

  return (
    <Card sx={{borderRadius: 1, boxShadow: 1, m: 0}}>
      <TabContext value={value} width='100%'>
        <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
          <TabList
            onChange={handleChange}
            aria-label='lab API tabs example'
            variant='fullWidth'
          >
            {SingleTab('lot_info', 'Lot#')}
            {SingleTab('more_info', 'More Information')}
          </TabList>
        </Box>
        <TabPanel value='lot_info'>
          <List sx={{width: '100%', bgcolor: 'background.paper'}}>
            <Item label='Lot#' value='898909080' />
            <Item label='Lot#' value='898909080' />
          </List>
        </TabPanel>
        <TabPanel value='more_info'>Item Two</TabPanel>
      </TabContext>
    </Card>
  );
}
