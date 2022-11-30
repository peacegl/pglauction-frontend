import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import IntlMessages from '@crema/utility/IntlMessages';
import {Box, Button, IconButton} from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import MuiAccordion from '@mui/material/Accordion';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import {styled} from '@mui/material/styles';
import {useState} from 'react';
import PropTypes from 'prop-types';
import filterList from './filterList';
import {useIntl} from 'react-intl';

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
  const [openAccordians, setOpenAccordians] = useState([]);
  const filterItems = filterList(props.filterData, messages).filterItems;

  const toggleAccordian = (key) => {
    if (openAccordians.includes(key)) {
      setOpenAccordians((d) => d.filter((item) => item != key));
    } else {
      setOpenAccordians((d) => [...d, key]);
    }
  };
  return (
    <Box>
      {filterItems.map((item) => (
        <Accordion
          key={item.key}
          expanded={openAccordians.includes(item.key)}
          onChange={() => toggleAccordian(item.key)}
        >
          <AccordionSummary>
            <Typography>{item.title}</Typography>
            <Box>
              <Button
                size='small'
                onClick={(e) => {
                  e.stopPropagation();
                  console.log('sdf');
                }}
              >
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
          <AccordionDetails>{item.content}</AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
}
FilterComponents.propTypes = {
  filterData: PropTypes.object,
};
