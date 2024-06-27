import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import {setWebVehiclesFilter} from '../../redux/actions';
import IntlMessages from '@crema/utility/IntlMessages';
import {Badge, Box, Button, IconButton} from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import MuiAccordion from '@mui/material/Accordion';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import {styled} from '@mui/material/styles';
import {useDispatch} from 'react-redux';
import filterList from './filterList';
import PropTypes from 'prop-types';
import {useIntl} from 'react-intl';
import {useEffect, useState} from 'react';

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({theme}) => ({
  borderTop: `1px solid ${theme.palette.divider}`,
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => <MuiAccordionSummary {...props} />)(
  ({theme}) => ({
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
      transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginLeft: theme.spacing(1),
    },
  }),
);

const AccordionDetails = styled(MuiAccordionDetails)(({theme}) => ({
  padding: theme.spacing(2),
  borderTop: `1px solid ${theme.palette.divider}`,
}));

export default function FilterComponents(props) {
  const {messages} = useIntl();
  const dispatch = useDispatch();
  const [openAccordians, setOpenAccordians] = useState([]);
  const [reset, setReset] = useState({});

  useEffect(() => {
    if (props.resetAll) {
      let values = {};
      filterItems.forEach((item) => {
        values[item.name] = item.initialValue;
      });

      setReset(values);
      props.setResetAll(false);
    }
  }, [props.resetAll]);

  const filterItems = filterList(
    props.filterData,
    messages,
    reset,
    setReset,
  ).filterItems;

  const toggleAccordian = (key) => {
    if (openAccordians.includes(key)) {
      setOpenAccordians((d) => d.filter((item) => item != key));
    } else {
      setOpenAccordians((d) => [...d, key]);
    }
  };

  const onReset = (e, item) => {
    e.stopPropagation();
    setReset((d) => {
      return {...d, [item.name]: item.initialValue};
    });
    dispatch(
      setWebVehiclesFilter({
        ...props.filterData,
        [item.name]: item.initialValue,
      }),
    );
  };
  return (
    <Box>
      {filterItems.map((item, index) =>{
        const initVal= JSON.stringify(item.initialValue);
        const currentVal= JSON.stringify(item.currentValue);
return item.hideAccordian ? (
  <Box
    key={index}
    sx={{
      borderTop: (theme) => `1px solid ${theme.palette.divider}`,
      mb: 4,
    }}
  >
    
    <Box sx={{mx: 3, mt: 4}}>{item.title}</Box>
    {item.content}
  </Box>
) : (
  <Accordion
    key={index}
    expanded={openAccordians.includes(item.key)}
    onChange={() => toggleAccordian(item.key)}
  >
    <AccordionSummary>
    <Badge color="primary" variant="dot" invisible={initVal === currentVal}>
    <Typography>{item.title}</Typography>
    </Badge>
     
      <Box>
        <Button size='small' onClick={(e) => onReset(e, item)}>
          <IntlMessages id='filter.reset' />
        </Button>
        <IconButton>
          {!openAccordians.includes(item.key) ? (
            <AddIcon sx={{fontSize: '16px'}} />
          ) : (
            <RemoveIcon sx={{fontSize: '16px'}} />
          )}
        </IconButton>
      </Box>
    </AccordionSummary>

    <AccordionDetails>
      {openAccordians.includes(item.key) && item.content}
    </AccordionDetails>
  </Accordion>
)
      }
       
      )}
    </Box>
  );
}
FilterComponents.propTypes = {
  filterData: PropTypes.object,
  resetAll: PropTypes.bool,
  setResetAll: PropTypes.func,
};
