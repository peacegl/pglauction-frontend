import MultipleContentSection from 'components/design/MultipleContentSection';
import IntlMessages from '@crema/utility/IntlMessages';
import Container from '@mui/material/Container';
import {Box, Paper} from '@mui/material';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import HighQualityIcon from '@mui/icons-material/HighQuality';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import {green, deepOrange, blue} from '@mui/material/colors';

const contents = [
  {
    icon: <EmojiEventsIcon sx={{fontSize: 35}} />,
    title: <IntlMessages id='website.moreThan500Vehicle' />,
    color: deepOrange[500],
    bgcolor: deepOrange[100],
    details: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.`,
  },
  {
    icon: <AdminPanelSettingsIcon sx={{fontSize: 35}} />,
    title: <IntlMessages id='website.simple_fast_secure' />,
    color: (theme) => theme.palette.success.main,
    bgcolor: green[100],
    details: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.`,
  },
  {
    icon: <HighQualityIcon sx={{fontSize: 35}} />,
    title: <IntlMessages id='website.quality' />,
    color: (theme) => theme.palette.info.main,
    bgcolor: blue[100],
    details: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's`,
  },
  {
    icon: <AdminPanelSettingsIcon sx={{fontSize: 35}} />,
    title: <IntlMessages id='website.simple_fast_secure' />,
    color: (theme) => theme.palette.success.main,
    bgcolor: green[100],
    details: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.`,
  },
  {
    icon: <HighQualityIcon sx={{fontSize: 35}} />,
    title: <IntlMessages id='website.quality' />,
    color: (theme) => theme.palette.info.main,
    bgcolor: blue[100],
    details: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's`,
  },
  {
    icon: <EmojiEventsIcon sx={{fontSize: 35}} />,
    title: <IntlMessages id='website.moreThan500Vehicle' />,
    color: deepOrange[500],
    bgcolor: deepOrange[100],
    details: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.`,
  },
];

const index = () => {
  return (
    <Container maxWidth='xl'>
      <Paper sx={{my: 14, py: 1}}>
        <MultipleContentSection
          title={<IntlMessages id='website.services' />}
          contents={contents}
        />
      </Paper>
    </Container>
  );
};

export default index;
