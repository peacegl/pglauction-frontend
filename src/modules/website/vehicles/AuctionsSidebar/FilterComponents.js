import Configs from '../../../../configs/website_pages/all_vehicles';
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

// newly_added: {},
//     odometer: [],
//     year: [],
//     make: [],
//     model: [],
//     engine_type: [],
//     transmission: [],
//     fuel: [],
//     cylinders: [],
//     price: [],
//     interior_color: [],
//     exterior_color: [],
//     document_type: [],
//     body_style: [],
//     drive_type: [],
//     status: [],
//     keys: 'both',
//     test_drive: 'both',
//     is_featured: 'both',
//     is_best_selling: 'both',
//     location: [],
//     category: [],

export default function FilterComponents(props) {
  const [openAccordians, setOpenAccordians] = useState([]);
  const filterItems = Configs(props.filterData).filterItems;

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
                Reset
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
